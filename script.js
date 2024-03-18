// frontend/script.js

async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const response = await fetch(`http://localhost:3000/weather?location=${location}`);
    const data = await response.json();

    displayWeather(data);
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
        <p>Temperature: ${data.temperature} °C</p>
        <p>Condition: ${data.condition}</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Wind Direction: ${data.wind.direction}°</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Sunrise: ${data.sunrise}</p>
        <p>Sunset: ${data.sunset}</p>
    `;
}
