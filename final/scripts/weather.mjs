// weather.mjs - Weather API module
const API_KEY = '36687cf944b7a0795e657f05e48a722e';
const LAT = '-1.2864';
const LON = '36.8172';
const UNITS = 'metric';

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

function displayCurrentWeather(data) {
    if (currentTemp) {
        currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    }
    if (weatherDesc) {
        weatherDesc.textContent = data.weather[0].description;
    }
    if (humidity) {
        humidity.textContent = `${data.main.humidity}%`;
    }
    if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description;
    }
}

export async function loadWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Weather error:', error);
        if (currentTemp) currentTemp.textContent = '--°C';
        if (weatherDesc) weatherDesc.textContent = 'Weather unavailable';
        if (humidity) humidity.textContent = '--';
    }
}