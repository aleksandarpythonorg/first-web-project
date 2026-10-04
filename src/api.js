export async function searchGithubUser(username) {
    const response = await fetch(
        `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
        throw new Error("GitHub user not found.");
    }

    return await response.json();
}


export async function searchCity(city) {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
        throw new Error("Could not find the city.");
    }

    const data = await response.json();

    if (!data.results) {
        throw new Error("City not found.");
    }

    return data.results[0];
}


export async function getWeather(latitude, longitude) {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`
    );

    if (!response.ok) {
        throw new Error("Could not get weather data.");
    }

    return await response.json();
}