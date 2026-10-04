const navLinks = document.querySelectorAll("nav ul a");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        console.log(`Clicked: ${link.textContent}`);
    });
});


window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});


backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙 Dark";
    } else {
        themeToggle.textContent = "☀️ Light";
    }
});