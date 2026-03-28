// weather.mjs - Weather API module for Nairobi Chamber
// OpenWeatherMap API Key (Working)
const API_KEY = '36687cf944b7a0795e657f05e48a722e';

// Nairobi, Kenya coordinates
const LAT = '-1.2864';
const LON = '36.8172';
const UNITS = 'metric';

// DOM Elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');
const forecastContainer = document.querySelector('#forecast-container');

// API URLs
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;

// Display current weather
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
    
    console.log('Weather loaded:', data.main.temp, '°C,', data.weather[0].description);
}

// Display 3-day forecast
function displayForecast(data) {
    if (!forecastContainer) return;
    
    // Get one forecast per day (every 8th entry = 24 hours)
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0).slice(0, 3);
    
    if (dailyForecasts.length === 0) {
        forecastContainer.innerHTML = '<p class="error">Forecast data not available</p>';
        return;
    }
    
    forecastContainer.innerHTML = dailyForecasts.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const temp = Math.round(day.main.temp);
        const description = day.weather[0].description;
        
        return `
            <div class="forecast-card">
                <h4>${dayName}</h4>
                <img src="${iconUrl}" alt="${description}" loading="lazy">
                <p class="forecast-temp">${temp}°C</p>
                <p class="forecast-desc">${description}</p>
            </div>
        `;
    }).join('');
    
    console.log('Forecast loaded:', dailyForecasts.length, 'days');
}

// Fetch and load current weather
export async function loadWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        displayCurrentWeather(data);
        
    } catch (error) {
        console.error('Weather error:', error);
        if (currentTemp) currentTemp.textContent = '--°C';
        if (weatherDesc) weatherDesc.textContent = 'Weather unavailable';
        if (humidity) humidity.textContent = '--';
    }
}

// Fetch and load 3-day forecast
export async function loadForecast() {
    try {
        const response = await fetch(forecastUrl);
        
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        
        const data = await response.json();
        displayForecast(data);
        
    } catch (error) {
        console.error('Forecast error:', error);
        if (forecastContainer) {
            forecastContainer.innerHTML = '<p class="error">Forecast unavailable</p>';
        }
    }
}