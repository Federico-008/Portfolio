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
                // Usar clase CSS en lugar de estilos inline para evitar CLS y forced reflows
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Agregar la clase base solo a elementos fuera del viewport inicial
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .skill-card, .about-text'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });
}


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
// DESACTIVADO: Causaba CLS (borraba el texto del subtitle y lo reconstruia char a char,
// afectando el LCP score y el Cumulative Layout Shift)
// El texto del hero-subtitle ahora es estático en el HTML para máximo rendimiento.
function initTypeWriter() {
    // No-op: conservado para no romper la llamada en DOMContentLoaded
}