/**
 * Original Dark Premium - Script
 * Handles animations, spotlight effects, and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSpotlightEffect();
    initScrollReveal();
    initMobileMenu();
    initTypeWriter();
});

/* --- 1. Spotlight Effect (Cards) --- */
function initSpotlightEffect() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .btn-primary');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for the glow position
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

/* --- 2. Scroll Reveal Animations --- */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to save resources
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .cta-buttons, .profile-container, .section-title, .skill-card, .project-card, .about-text'
    );

    elementsToAnimate.forEach((el, index) => {
        // Add base class for animation styles (handled in CSS or here)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        // Stagger delay based on index (rough approximation)
        // For grid items, we might want a different logic, but this is simple
        
        observer.observe(el);
    });

    // Add global listener for the class change
    // Note: It's better to use CSS transition on the class, but we set inline above for init.
    // Let's refactor to use a CSS class '.reveal' for cleaner separation.
    
    // Correction: We will use the observer callback to set styles directly 
    // to ensure it overrides the initial state.
}

// Helper to handle the actual class addition logic
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};
// Re-init observer with corrected logic
const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });
document.querySelectorAll('.hero-title, .hero-subtitle, .cta-buttons, .profile-container, .section-title, .skill-card, .project-card, .about-text').forEach(el => revealObserver.observe(el));


/* --- 3. Mobile Menu --- */
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        btn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
}

/* --- 4. Typewriter Effect (Hero) --- */
function initTypeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent.trim();
    subtitle.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    
    // Start after a slight delay
    setTimeout(type, 500);
}