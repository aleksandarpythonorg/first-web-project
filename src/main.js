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

function updateThemeButton() {

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙 Dark";
    } else {
        themeToggle.textContent = "☀️ Light";
    }

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "theme",
        isLightMode ? "light" : "dark"
    );

    updateThemeButton();

});
;const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

updateThemeButton();


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

});/* GitHub API */

const githubForm = document.getElementById("githubForm");
const githubUsername = document.getElementById("githubUsername");
const githubResult = document.getElementById("githubResult");


githubForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = githubUsername.value.trim();

    if (username === "") {
        githubResult.innerHTML =
            '<p class="github-error">Please enter a GitHub username.</p>';

        return;
    }

    githubResult.innerHTML = "<p>Loading...</p>";


    try {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );


        if (!response.ok) {
            throw new Error("GitHub user not found.");
        }


        const user = await response.json();


        githubResult.innerHTML = `
            <div class="github-card">

                <img
                    src="${user.avatar_url}"
                    alt="${user.login} profile picture"
                >

                <h3>${user.name || user.login}</h3>

                <p>
                    ${user.bio || "No bio available."}
                </p>

                <p>
                    <strong>Username:</strong>
                    ${user.login}
                </p>

                <p>
                    <strong>Public repositories:</strong>
                    ${user.public_repos}
                </p>

                <p>
                    <strong>Followers:</strong>
                    ${user.followers}
                </p>

                <p>
                    <strong>Following:</strong>
                    ${user.following}
                </p>

                <a
                    href="${user.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View GitHub Profile
                </a>

            </div>
        `;

    } catch (error) {

        githubResult.innerHTML = `
            <p class="github-error">
                ${error.message}
            </p>
        `;

    }

});/* Weather App */

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");


weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML = `
            <p class="weather-error">
                Please enter a city name.
            </p>
        `;

        return;
    }

    weatherResult.innerHTML = "<p>Loading weather...</p>";


    try {

        /*
         * STEP 1
         * Find the city coordinates
         */

        const geocodingResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );


        if (!geocodingResponse.ok) {
            throw new Error("Could not find the city.");
        }


        const geocodingData = await geocodingResponse.json();


        if (!geocodingData.results) {
            throw new Error("City not found.");
        }


        const location = geocodingData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;


        /*
         * STEP 2
         * Get weather using coordinates
         */

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`
        );


        if (!weatherResponse.ok) {
            throw new Error("Could not get weather data.");
        }


        const weatherData = await weatherResponse.json();


        /*
         * STEP 3
         * Extract weather data
         */

        const current = weatherData.current;

        const temperature = current.temperature_2m;
        const feelsLike = current.apparent_temperature;
        const humidity = current.relative_humidity_2m;
        const windSpeed = current.wind_speed_10m;


        /*
         * STEP 4
         * Display result
         */

        weatherResult.innerHTML = `
            <div class="weather-card">

                <h3>
                    ${location.name}, ${location.country}
                </h3>

                <div class="weather-temperature">
                    ${temperature}°C
                </div>

                <div class="weather-info">

                    <div>
                        <strong>Feels like</strong>
                        <br>
                        ${feelsLike}°C
                    </div>

                    <div>
                        <strong>Humidity</strong>
                        <br>
                        ${humidity}%
                    </div>

                    <div>
                        <strong>Wind</strong>
                        <br>
                        ${windSpeed} km/h
                    </div>

                </div>

            </div>
        `;


    } catch (error) {

        weatherResult.innerHTML = `
            <p class="weather-error">
                ${error.message}
            </p>
        `;

    }

});