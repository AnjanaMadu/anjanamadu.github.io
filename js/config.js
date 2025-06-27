// API Configuration
const API_CONFIG = {
    // Contact Form API endpoint
    CONTACT_API_URL: 'https://mycontactform.comharp.workers.dev/',
    
    // Request timeout in milliseconds
    REQUEST_TIMEOUT: 10000,
    
    // Rate limit settings (for client-side display)
    RATE_LIMIT: {
        MAX_REQUESTS: 5,
        TIME_WINDOW: 60000 // 1 minute in ms
    }
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;