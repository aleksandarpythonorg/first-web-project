export function showGithubUser(user, container) {
    container.innerHTML = `
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
}


export function showGithubError(message, container) {
    container.innerHTML = `
        <p class="github-error">
            ${message}
        </p>
    `;
}


export function showWeather(weather, location, container) {
    const current = weather.current;

    container.innerHTML = `
        <div class="weather-card">

            <h3>
                ${location.name}, ${location.country}
            </h3>

            <div class="weather-temperature">
                ${current.temperature_2m}°C
            </div>

            <div class="weather-info">

                <div>
                    <strong>Feels like</strong>
                    <br>
                    ${current.apparent_temperature}°C
                </div>

                <div>
                    <strong>Humidity</strong>
                    <br>
                    ${current.relative_humidity_2m}%
                </div>

                <div>
                    <strong>Wind</strong>
                    <br>
                    ${current.wind_speed_10m} km/h
                </div>

            </div>

        </div>
    `;
}


export function showWeatherError(message, container) {
    container.innerHTML = `
        <p class="weather-error">
            ${message}
        </p>
    `;
}