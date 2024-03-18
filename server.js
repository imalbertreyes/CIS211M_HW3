// backend/server.js

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.static('frontend'));

// Define route to handle weather data retrieval
app.get('/weather', async (req, res) => {
    try {
        const { location } = req.query;
        const apiKey = '848dbffb31f76ed40663bf2f89602866';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        const weatherData = {
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            wind: {
                speed: response.data.wind.speed,
                direction: response.data.wind.deg
            },
            humidity: response.data.main.humidity,
            sunrise: convertTimestamp(response.data.sys.sunrise, 'Asia/Manila'),
            sunset: convertTimestamp(response.data.sys.sunset, 'Asia/Manila')
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to convert timestamp to Philippines timezone
function convertTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
