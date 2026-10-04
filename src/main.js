const navLinks = document.querySelectorAll("nav ul a");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formSuccess = document.getElementById("formSuccess");


/* Navigation */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        console.log(`Clicked: ${link.textContent}`);
    });
});


/* Back to top */

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


/* Dark / Light mode */

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙 Dark";
    } else {
        themeToggle.textContent = "☀️ Light";
    }
});


/* Contact form */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;


    /* Name validation */

    if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
    }


    /* Email validation */

    if (emailInput.value.trim() === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
    } else if (!emailInput.value.includes("@")) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }


    /* Message validation */

    if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter a message.";
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;
    }


    /* Success */

    if (isValid) {
        formSuccess.textContent =
            "Message validated successfully! 🚀";

        contactForm.reset();
    }

});/* Project filter */

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;


        /* Change active button */

        filterButtons.forEach((button) => {
            button.classList.remove("active");
        });

        button.classList.add("active");


        /* Filter projects */

        projectCards.forEach((project) => {

            const projectCategory = project.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }

        });

    });

});
/* Project modal */

const projectButtons = document.querySelectorAll(".project-details");

const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTechnologies = document.getElementById("modalTechnologies");
const modalGithub = document.getElementById("modalGithub");


projectButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const description = button.dataset.description;
        const technologies = button.dataset.technologies;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalTechnologies.textContent = technologies;

        modalGithub.href = "https://github.com/";

        projectModal.classList.add("show");

    });

});


closeModal.addEventListener("click", () => {
    projectModal.classList.remove("show");
});


projectModal.addEventListener("click", (event) => {

    if (event.target === projectModal) {
        projectModal.classList.remove("show");
    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        projectModal.classList.remove("show");
    }

});