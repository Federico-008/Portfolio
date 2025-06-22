const themeToggle = document.getElementById("themeToggle")
    , themeIcon = themeToggle.querySelector("i"),
    body = document.body, currentTheme = localStorage.getItem("theme") || "light";
function updateThemeIcon(e) {
    themeIcon.className = "light" === e ? "fas fa-moon" : "fas fa-sun"
}
body.setAttribute("data-theme", currentTheme)
    , updateThemeIcon(currentTheme),
    themeToggle.addEventListener("click", () => {
        let e = body.getAttribute("data-theme"), t = "light" === e ? "dark" : "light";
        body.setAttribute("data-theme", t), localStorage.setItem("theme", t), updateThemeIcon(t)
    });