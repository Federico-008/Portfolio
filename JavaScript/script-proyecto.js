const themeToggle = document.getElementById("themeToggle"),
    themeIcon = themeToggle.querySelector("i"),
    body = document.body, currentTheme = localStorage.getItem("theme") || "light";
function updateThemeIcon(e) {
    themeIcon.className = "light" === e ? "fas fa-moon" : "fas fa-sun"
}
body.setAttribute("data-theme", currentTheme),
    updateThemeIcon(currentTheme),
    themeToggle.addEventListener("click", () => {
        let e = body.getAttribute("data-theme"), t = "light" === e ? "dark" : "light";
        body.setAttribute("data-theme", t),
            localStorage.setItem("theme", t),
            updateThemeIcon(t)
    });
const observerOptions = {
    threshold: .1, rootMargin: "0px 0px -50px 0px"
},
    observer = new IntersectionObserver(e => {
        e.forEach(e => {
            e.isIntersecting && (e.target.style.opacity = "1", e.target.style.transform = "translateY(0)")
        })
    },
        observerOptions);
document.querySelectorAll(".project-card")
    .forEach((e, t) => {
        e.style.opacity = "0", e.style.transform = "translateY(30px)",
            e.style.transition = `opacity 0.6s ease ${.1 * t}s, transform 0.6s ease ${.1 * t}s`,
            observer.observe(e)
    });
const initCanvas = () => {
    try {
        let e = document.createElement("canvas"); e.id = "particles-canvas", e.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                `, document.body.appendChild(e); let t = e.getContext("2d"); return e.width = window.innerWidth, e.height = window.innerHeight, { canvas: e, ctx: t }
    } catch (r) { return console.error("Error initializing canvas:", r), null }
}, setupParticles = e => e ? Array.from({ length: 80 }, () => ({ x: Math.random() * e.width, y: Math.random() * e.height, radius: 2 * Math.random() + .5, speed: .8 * Math.random() + .2, opacity: .5 * Math.random() + .3 })) : [], { canvas: e, ctx: t } = initCanvas() || {}, particles = e ? setupParticles(e) : []; function animateParticles() { if (!t || !e) return; t.clearRect(0, 0, e.width, e.height); let r = "dark" === document.body.getAttribute("data-theme"); particles.forEach(a => { a.y += a.speed, a.y > e.height && (a.y = -5, a.x = Math.random() * e.width), t.beginPath(), t.arc(a.x, a.y, a.radius, 0, 2 * Math.PI), t.fillStyle = r ? `rgba(99, 102, 241, ${a.opacity})` : `rgba(6, 182, 212, ${.6 * a.opacity})`, t.fill() }), requestAnimationFrame(animateParticles) } e && (animateParticles(), window.addEventListener("resize", () => { e.width = window.innerWidth, e.height = window.innerHeight }));

// Lógica de filtrado de proyectos
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card, .project-placeholder');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Agregar al boton clickeado
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    // Reiniciar animaciones
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

// Lightbox Gallery Logic
document.addEventListener('DOMContentLoaded', () => {
    const galleryTriggers = document.querySelectorAll('.gallery-trigger');
    const modal = document.getElementById('galleryModal');

    if (!modal) return; // Si no hay modal en esta página, no ejecutar

    const modalImg = document.getElementById('galleryImage');
    const closeBtn = document.getElementById('galleryClose');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const counter = document.getElementById('galleryCounter');

    let currentGallery = [];
    let currentIndex = 0;

    // Función para abrir modal y setear imagen
    function openGallery(images, index) {
        currentGallery = images;
        currentIndex = index;
        updateModal();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }

    // Actualizar imagen modal
    function updateModal() {
        modalImg.style.transform = 'scale(0.95)';
        modalImg.style.opacity = '0';

        setTimeout(() => {
            modalImg.src = currentGallery[currentIndex];
            counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
            modalImg.style.transform = 'scale(1)';
            modalImg.style.opacity = '1';
        }, 200);
    }

    // Función para cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Eventos para abrir galería
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            try {
                const galleryData = JSON.parse(trigger.getAttribute('data-gallery'));
                if (galleryData && galleryData.length > 0) {
                    openGallery(galleryData, 0);
                }
            } catch (e) {
                console.error("Error parsing gallery data", e);
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Navegación
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModal();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateModal();
    });

    // Cerrar si se da click fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Controles de teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });
});