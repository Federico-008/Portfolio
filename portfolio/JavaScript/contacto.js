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
                `, document.body.appendChild(e);
        let t = e.getContext("2d");
        return e.width = window.innerWidth, e.height = window.innerHeight,
            { canvas: e, ctx: t }
    } catch (r) {
        return console.error("Error initializing canvas:", r), null
    }
},
    setupParticles = e => e ? Array.from({ length: 80 },
        () => ({ x: Math.random() * e.width, y: Math.random() * e.height, radius: 2 * Math.random() + .5, speed: .8 * Math.random() + .2, opacity: .5 * Math.random() + .3 })) : [], { canvas: e, ctx: t } = initCanvas() || {}, particles = e ? setupParticles(e) : [];
function animateParticles() {
    if (!t || !e) return;
    t.clearRect(0, 0, e.width, e.height);
    let r = "dark" === document.body.getAttribute("data-theme");
    particles.forEach(a => {
        a.y += a.speed, a.y > e.height && (a.y = -5, a.x = Math.random() * e.width),
            t.beginPath(),
            t.arc(a.x, a.y, a.radius, 0, 2 * Math.PI), t.fillStyle = r ? `rgba(99, 102, 241, ${a.opacity})` : `rgba(6, 182, 212, ${.6 * a.opacity})`, t.fill()
    }),
        requestAnimationFrame(animateParticles)
}
e && (animateParticles(),
    window.addEventListener("resize", () => {
        e.width = window.innerWidth, e.height = window.innerHeight
    }));
const themeToggle = document.getElementById("themeToggle"),
    themeIcon = themeToggle.querySelector("i"),
    body = document.body, currentTheme = localStorage.getItem("theme") || "light";
function updateThemeIcon(e) {
    themeIcon.className = "light" === e ? "fas fa-moon" : "fas fa-sun"
}
body.setAttribute("data-theme", currentTheme),
    updateThemeIcon(currentTheme),
    themeToggle.addEventListener("click", () => {
        let e = body.getAttribute("data-theme"),
            t = "light" === e ? "dark" : "light"; body.setAttribute("data-theme", t), localStorage.setItem("theme", t), updateThemeIcon(t)
    });
const contactForm = document.getElementById("contactForm"),
    submitBtn = document.getElementById("submitBtn"),
    successMessage = document.getElementById("successMessage");
function validateField(e) {
    let t = e.value.trim(), r = !0;
    return e.classList.remove("error"),
        e.required && !t ? r = !1 : "email" === e.type && t && (r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(t)), r || e.classList.add("error"), r
}
const formFields = contactForm.querySelectorAll("input, textarea");
formFields.forEach(e => {
    e.addEventListener("blur", () => validateField(e)),
        e.addEventListener("input", () => {
            e.classList.contains("error") && validateField(e)
        })
}),
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let t = !0; if (formFields.forEach(e => {
            validateField(e) || (t = !1)
        }), !t) return;
        submitBtn.classList.add("btn-loading"),
            submitBtn.disabled = !0;
        let r = new FormData(contactForm);
        fetch("https://formsubmit.co/ramirezguillermofederico@gmail.com",
            { method: "POST", body: r })
            .then(e => {
                if (e.ok) successMessage.classList.add("show"),
                    contactForm.reset(),
                    setTimeout(() => { successMessage.classList.remove("show") }, 5e3);
                else throw Error("Error al enviar el formulario")
            })
            .catch(e => {
                console.error("Error:", e),
                    alert("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
            }).finally(() => { submitBtn.classList.remove("btn-loading"), submitBtn.disabled = !1 })
    });
const observerOptions = {
    threshold: .1, rootMargin: "0px 0px -50px 0px"
},
    observer = new IntersectionObserver(e => {
        e.forEach(e => { e.isIntersecting && (e.target.style.opacity = "1", e.target.style.transform = "translateY(0)") })
    }, observerOptions);
document.querySelectorAll(".contact-method")
    .forEach((e, t) => {
        e.style.opacity = "0", e.style.transform = "translateY(20px)", e.style.transition = `opacity 0.6s ease ${.1 * t}s, transform 0.6s ease ${.1 * t}s`, observer.observe(e)
    });
const form = document.querySelector(".contact-form");
form.style.opacity = "0", form.style.transform = "translateY(30px)",
    form.style.transition = "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
    observer.observe(form);