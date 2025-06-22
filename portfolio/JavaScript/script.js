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
}, setupParticles = e => e ? Array.from({ length: 80 }, () => ({ x: Math.random() * e.width, y: Math.random() * e.height, radius: 2 * Math.random() + .5, speed: .8 * Math.random() + .2, opacity: .5 * Math.random() + .3 })) : [], { canvas: e, ctx: t } = initCanvas() || {}, particles = e ? setupParticles(e) : []; function animateParticles() { if (!t || !e) return; t.clearRect(0, 0, e.width, e.height); let r = "dark" === document.body.getAttribute("data-theme"); particles.forEach(a => { a.y += a.speed, a.y > e.height && (a.y = -5, a.x = Math.random() * e.width), t.beginPath(), t.arc(a.x, a.y, a.radius, 0, 2 * Math.PI), t.fillStyle = r ? `rgba(99, 102, 241, ${a.opacity})` : `rgba(6, 182, 212, ${.6 * a.opacity})`, t.fill() }), requestAnimationFrame(animateParticles) } e && (animateParticles(), window.addEventListener("resize", () => { e.width = window.innerWidth, e.height = window.innerHeight })); const mobileMenuBtn = document.querySelector(".mobile-menu-btn"), navMenu = document.querySelector(".nav-menu"); mobileMenuBtn && (mobileMenuBtn.addEventListener("click", () => { navMenu.classList.toggle("active"), mobileMenuBtn.classList.toggle("active"), document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "" }), document.querySelectorAll(".nav-link").forEach(e => { e.addEventListener("click", () => { navMenu.classList.remove("active"), mobileMenuBtn.classList.remove("active"), document.body.style.overflow = "" }) })); const themeToggle = document.getElementById("themeToggle"), themeIcon = themeToggle.querySelector("i"), body = document.body, currentTheme = localStorage.getItem("theme") || "light"; function updateThemeIcon(e) { themeIcon.className = "light" === e ? "fas fa-moon" : "fas fa-sun" } body.setAttribute("data-theme", currentTheme), updateThemeIcon(currentTheme), themeToggle.addEventListener("click", () => { let e = body.getAttribute("data-theme"), t = "light" === e ? "dark" : "light"; body.setAttribute("data-theme", t), localStorage.setItem("theme", t), updateThemeIcon(t) }); const profileImage = document.querySelector(".profile-image"); function createImageModal() {
    let e = document.createElement("div"); return e.id = "imageModal", e.style.cssText = `
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `, e.innerHTML = `
                <div style="position: relative; max-width: 90%; max-height: 90%;">
                    <button id="closeModal" style="
                        position: absolute;
                        top: -40px;
                        right: 0;
                        background: white;
                        border: none;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        cursor: pointer;
                        font-size: 18px;
                        z-index: 2001;
                    ">✖</button>
                    <img id="modalImage" style="
                        max-width: 100%;
                        max-height: 100%;
                        border-radius: 12px;
                        transition: transform 0.3s ease;
                    ">
                </div>
            `, document.body.appendChild(e), e
} const imageModal = createImageModal(), modalImage = document.getElementById("modalImage"), closeModal = document.getElementById("closeModal"); profileImage.addEventListener("click", () => { modalImage.src = profileImage.src, imageModal.style.display = "flex", setTimeout(() => imageModal.style.opacity = "1", 10) }), closeModal.addEventListener("click", () => { imageModal.style.opacity = "0", setTimeout(() => imageModal.style.display = "none", 300) }), imageModal.addEventListener("click", e => { e.target === imageModal && (imageModal.style.opacity = "0", setTimeout(() => imageModal.style.display = "none", 300)) }); const cards = document.querySelectorAll(".skill-card"), isMobile = window.innerWidth <= 768; if (cards.length > 0) { let r = [], a = null, i = new IntersectionObserver(e => { e.forEach(e => { e.isIntersecting ? r.includes(e.target) || r.push(e.target) : r = r.filter(t => t !== e.target) }) }, { threshold: .6 }); cards.forEach(e => { i.observe(e) }), isMobile && setInterval(() => { if (0 === r.length) return; a && (a.classList.remove("flipped"), a = null); let e = Math.floor(Math.random() * r.length), t = r[e]; t.classList.add("flipped"), a = t, setTimeout(() => { a === t && (t.classList.remove("flipped"), a = null) }, 3e3) }, 4e3) } document.querySelectorAll('a[href^="#"]').forEach(e => { e.addEventListener("click", function (e) { e.preventDefault(); let t = document.querySelector(this.getAttribute("href")); t && t.scrollIntoView({ behavior: "smooth", block: "start" }) }) }), window.addEventListener("scroll", () => { let e = document.querySelector(".navbar"), t = "dark" === body.getAttribute("data-theme"); window.scrollY > 100 ? e.style.background = t ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)" : e.style.background = t ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.8)" }); const observerOptions = { threshold: .1, rootMargin: "0px 0px -50px 0px" }, observer = new IntersectionObserver(e => { e.forEach(e => { e.isIntersecting && (e.target.style.opacity = "1", e.target.style.transform = "translateY(0)") }) }, observerOptions); document.querySelectorAll(".skill-card, .about-content > div").forEach((e, t) => { e.style.opacity = "0", e.style.transform = "translateY(30px)", e.style.transition = `opacity 0.8s ease ${.1 * t}s, transform 0.8s ease ${.1 * t}s`, observer.observe(e) }); const heroSubtitle = document.querySelector(".hero-subtitle"), originalText = heroSubtitle.textContent; function typeWriter(e, t, r = 50) { e.textContent = ""; let a = 0; !function i() { a < t.length && (e.textContent += t.charAt(a), a++, setTimeout(i, r)) }() } window.addEventListener("load", () => { setTimeout(() => { typeWriter(heroSubtitle, originalText, 30) }, 800) }); const createCustomCursor = () => {
    if (window.innerWidth <= 768) return; let e = document.createElement("div"); e.style.cssText = `
                position: fixed;
                z-index: 9999;
                pointer-events: none;
                width: 20px;
                height: 20px;
                border: 2px solid var(--primary-color);
                border-radius: 50%;
                transition: transform 0.1s ease, opacity 0.3s ease;
                opacity: 0;
                mix-blend-mode: difference;
            `, document.body.appendChild(e); let t = !1; document.addEventListener("mousemove", r => { t || (e.style.opacity = "1", t = !0), e.style.transform = `translate(${r.clientX - 10}px, ${r.clientY - 10}px)` }), document.addEventListener("mouseenter", () => { e.style.opacity = "1" }), document.addEventListener("mouseleave", () => { e.style.opacity = "0", t = !1 }); let r = document.querySelectorAll("a, button, .skill-card, .profile-image"); r.forEach(t => { t.addEventListener("mouseenter", () => { e.style.transform += " scale(1.5)", e.style.borderColor = "var(--secondary-color)" }), t.addEventListener("mouseleave", () => { e.style.transform = e.style.transform.replace(" scale(1.5)", ""), e.style.borderColor = "var(--primary-color)" }) })
}; createCustomCursor();