## The code I used for contact form
```js
// Cloudflare Worker Contact Form API with Rate Limiting and Telegram Integration

export default {
  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests for form submissions
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );
    }

    try {
      // Get client IP
      const clientIP = request.headers.get('CF-Connecting-IP') || 
                      request.headers.get('X-Forwarded-For') || 
                      'unknown';

      // Rate limiting check
      const rateLimitKey = `rate_limit:${clientIP}`;
      const currentTime = Date.now();
      const timeWindow = 60 * 1000; // 1 minute
      const maxRequests = 5; // 5 requests per minute

      // Get current rate limit data
      const rateLimitData = await env.RATE_LIMIT_KV.get(rateLimitKey);
      let requests = rateLimitData ? JSON.parse(rateLimitData) : [];

      // Filter out old requests (outside time window)
      requests = requests.filter(timestamp => currentTime - timestamp < timeWindow);

      // Check if rate limit exceeded
      if (requests.length >= maxRequests) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again later.',
            retryAfter: Math.ceil((requests[0] + timeWindow - currentTime) / 1000)
          }),
          { 
            status: 429, 
            headers: { 
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((requests[0] + timeWindow - currentTime) / 1000).toString(),
              ...corsHeaders 
            } 
          }
        );
      }

      // Add current request to rate limit tracking
      requests.push(currentTime);
      await env.RATE_LIMIT_KV.put(rateLimitKey, JSON.stringify(requests), { expirationTtl: 300 });

      // Parse form data
      const formData = await request.json();
      
      // Validate required fields
      const requiredFields = ['name', 'email', 'message'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        return new Response(
          JSON.stringify({ 
            error: 'Missing required fields', 
            missingFields 
          }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            } 
          }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email format' }),
          { 
            status: 400, 
            headers: { 
              'Content-Type': 'application/json',
              ...corsHeaders 
            } 
          }
        );
      }

      // Get client information
      const country = request.cf?.country || 'Unknown';
      const city = request.cf?.city || 'Unknown';
      const timezone = request.cf?.timezone || 'Unknown';
      const userAgent = request.headers.get('User-Agent') || 'Unknown';
      const referer = request.headers.get('Referer') || 'Direct';

      // Get IP geolocation info (optional, using Cloudflare's built-in data)
      const ipInfo = {
        ip: clientIP,
        country: country,
        city: city,
        timezone: timezone,
        asn: request.cf?.asOrganization || 'Unknown',
        colo: request.cf?.colo || 'Unknown'
      };

      // Prepare Telegram message using HTML format (more reliable than Markdown)
      const telegramMessage = `
🆕 <b>New Contact Form Submission</b>

👤 <b>Contact Details:</b>
• Name: ${escapeHtml(formData.name)}
• Email: ${escapeHtml(formData.email)}
• Phone: ${formData.phone ? escapeHtml(formData.phone) : 'Not provided'}

💬 <b>Message:</b>
${escapeHtml(formData.message)}

🌍 <b>Client Information:</b>
• IP Address: <code>${ipInfo.ip}</code>
• Location: ${escapeHtml(ipInfo.city)}, ${escapeHtml(ipInfo.country)}
• Timezone: ${escapeHtml(ipInfo.timezone)}
• ISP/ASN: ${escapeHtml(ipInfo.asn.toString())}
• Cloudflare Colo: ${escapeHtml(ipInfo.colo)}
• User Agent: <code>${escapeHtml(userAgent.substring(0, 100))}${userAgent.length > 100 ? '...' : ''}</code>
• Referer: ${escapeHtml(referer)}

📅 <b>Timestamp:</b> ${new Date().toISOString()}
      `.trim();

      // Send to Telegram with HTML parse mode
      const telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        }),
      });

      if (!telegramResponse.ok) {
        const telegramError = await telegramResponse.text();
        console.error('Failed to send Telegram message:', telegramError);
        
        // Try sending a fallback plain text message
        const fallbackMessage = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}

Client Info:
IP: ${ipInfo.ip}
Location: ${ipInfo.city}, ${ipInfo.country}
Timestamp: ${new Date().toISOString()}
        `.trim();

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: fallbackMessage,
            disable_web_page_preview: true
          }),
        });
      }

      // Store submission in KV for backup (optional)
      const submissionId = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const submissionData = {
        id: submissionId,
        timestamp: new Date().toISOString(),
        formData,
        clientInfo: {
          ...ipInfo,
          userAgent,
          referer
        }
      };

      await env.SUBMISSIONS_KV.put(submissionId, JSON.stringify(submissionData));

      // Return success response
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Form submitted successfully',
          submissionId 
        }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );

    } catch (error) {
      console.error('Error processing form submission:', error);
      
      return new Response(
        JSON.stringify({ 
          error: 'Internal server error', 
          message: 'Please try again later' 
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      );
    }
  },
};

// Helper function to escape HTML special characters
function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
```

### ps: you can host this on cloudflare workers and you need to setup some kv namespaces and env variables in cloudflare. 
