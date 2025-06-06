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
 * Setup contact form submission handler
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
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