// weather.mjs - Weather API
const API_KEY = '36687cf944b7a0795e657f05e48a722e';
const LAT = '-1.2864';
const LON = '36.8172';
const UNITS = 'metric';

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');
const forecastContainer = document.querySelector('#forecast-container');

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

function displayCurrentWeather(data) {
    if (currentTemp) currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    if (weatherDesc) weatherDesc.textContent = data.weather[0].description;
    if (humidity) humidity.textContent = `${data.main.humidity}%`;
    if (weatherIcon) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
    }
}

function displayForecast(data) {
    const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 3);
    forecastContainer.innerHTML = daily.map(day => {
        const date = new Date(day.dt * 1000);
        return `
            <div class="forecast-card">
                <h4>${date.toLocaleDateString('en-US', { weekday: 'short' })}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                <p>${Math.round(day.main.temp)}°C</p>
            </div>
        `;
    }).join('');
}

export async function loadWeather() {
    try {
        const res = await fetch(currentUrl);
        if (!res.ok) throw new Error('Weather error');
        displayCurrentWeather(await res.json());
    } catch (err) {
        console.error(err);
        if (currentTemp) currentTemp.textContent = '--°C';
    }
}

export async function loadForecast() {
    try {
        const res = await fetch(forecastUrl);
        if (!res.ok) throw new Error('Forecast error');
        displayForecast(await res.json());
    } catch (err) {
        console.error(err);
        if (forecastContainer) forecastContainer.innerHTML = '<p>Forecast unavailable</p>';
    }
}