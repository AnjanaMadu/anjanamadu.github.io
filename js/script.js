document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupContactForm();
});

/**
 * Initialize particle effects
 */
function initParticles() {
    const particleContainer = document.getElementById('particles');
    const particleCount = 30; // Reduced count for better performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
    }
}

/**
 * Setup contact form submission handler with API integration
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm?.querySelector('button[type="submit"]');
    
    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmission(contactForm, submitButton);
        });
    }
}

/**
 * Handle form submission with API integration
 */
async function handleFormSubmission(form, submitButton) {
    const formData = new FormData(form);
    const data = {
        name: formData.get('name')?.trim(),
        email: formData.get('email')?.trim(),
        message: formData.get('message')?.trim()
    };

    // Client-side validation
    const validationResult = validateFormData(data);
    if (!validationResult.isValid) {
        showTerminalMessage(validationResult.message, 'error');
        return;
    }

    // Update UI for loading state
    setFormLoadingState(submitButton, true);
    
    try {
        const response = await submitToAPI(data);
        
        if (response.success) {
            showTerminalMessage(
                `✅ MESSAGE_SENT successfully!\n` +
                `📧 Your message has been delivered.\n` +
                `🤖 I'll get back to you soon.\n` +
                `📝 Submission ID: ${response.submissionId || 'N/A'}`, 
                'success'
            );
            form.reset();
        } else {
            throw new Error(response.error || 'Unknown error occurred');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        handleSubmissionError(error);
    } finally {
        setFormLoadingState(submitButton, false);
    }
}

/**
 * Submit form data to API
 */
async function submitToAPI(data) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT);
    
    try {
        const response = await fetch(API_CONFIG.CONTACT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const result = await response.json();
        
        if (!response.ok) {
            // Handle specific HTTP error codes
            if (response.status === 429) {
                const retryAfter = result.retryAfter || 60;
                throw new Error(`RATE_LIMIT_EXCEEDED: Please wait ${retryAfter} seconds before trying again.`);
            }
            throw new Error(result.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        
        return result;
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('REQUEST_TIMEOUT: The request took too long to complete.');
        }
        throw error;
    }
}

/**
 * Validate form data on client side
 */
function validateFormData(data) {
    if (!data.name || data.name.length < 2) {
        return { 
            isValid: false, 
            message: '❌ ERROR: Name must be at least 2 characters long.' 
        };
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        return { 
            isValid: false, 
            message: '❌ ERROR: Please enter a valid email address.' 
        };
    }
    
    if (!data.message || data.message.length < 10) {
        return { 
            isValid: false, 
            message: '❌ ERROR: Message must be at least 10 characters long.' 
        };
    }
    
    if (data.message.length > 1000) {
        return { 
            isValid: false, 
            message: '❌ ERROR: Message must be less than 1000 characters.' 
        };
    }
    
    return { isValid: true };
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Handle submission errors with user-friendly messages
 */
function handleSubmissionError(error) {
    let message = '❌ SUBMISSION_FAILED\n';
    
    if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
        message += '⏱️  Rate limit exceeded.\n' + error.message.split(': ')[1];
    } else if (error.message.includes('REQUEST_TIMEOUT')) {
        message += '⏰ Request timed out.\n🔄 Please check your connection and try again.';
    } else if (error.message.includes('Failed to fetch')) {
        message += '🌐 Network error.\n🔄 Please check your internet connection.';
    } else {
        message += `💥 ${error.message}\n🔄 Please try again later.`;
    }
    
    showTerminalMessage(message, 'error');
}

/**
 * Show terminal-style messages
 */
function showTerminalMessage(message, type = 'info') {
    // Remove any existing message
    const existingMessage = document.getElementById('terminal-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'terminal-message';
    messageDiv.className = `command-output mt-4 mb-4 glass-section rounded-xl p-4 border-2 ${getMessageClasses(type)}`;
    
    // Format message with terminal styling
    const formattedMessage = message.split('\n').map(line => 
        `<div class="mb-1">${escapeHtml(line)}</div>`
    ).join('');
    
    messageDiv.innerHTML = `
        <div class="prompt-line mb-2">
            <span class="terminal-blue glow-text font-semibold">system@contact</span>
            <span class="text-white">:</span>
            <span class="terminal-yellow glow-text">~</span>
            <span class="text-white">$ </span>
            <span class="terminal-purple">${type}_notification</span>
        </div>
        <div class="terminal-output">${formattedMessage}</div>
    `;
    
    // Insert after the contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    
    // Auto-remove success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 10000);
    }
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Get CSS classes for different message types
 */
function getMessageClasses(type) {
    switch (type) {
        case 'success':
            return 'border-green-500/50 bg-green-500/10 text-green-300';
        case 'error':
            return 'border-red-500/50 bg-red-500/10 text-red-300';
        case 'warning':
            return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300';
        default:
            return 'border-blue-500/50 bg-blue-500/10 text-blue-300';
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Set form loading state
 */
function setFormLoadingState(submitButton, isLoading) {
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="inline-block animate-spin mr-2">⚡</span>
            SENDING_MESSAGE...
        `;
        submitButton.classList.add('opacity-75');
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = 'SEND_MESSAGE';
        submitButton.classList.remove('opacity-75');
    }
}

/**
 * Show/hide content sections and maintain scrolling
 */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('section-hidden');
    });
    
    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('section-hidden');
        
        // Re-trigger fade-in animation
        targetSection.classList.remove('fade-in');
        void targetSection.offsetWidth; // Force reflow
        targetSection.classList.add('fade-in');
        
        // Scroll to section
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    // Ensure body scrolling works
    document.body.style.overflow = 'auto';
}