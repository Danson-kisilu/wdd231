// main.mjs - Main entry point
import { loadWeather, loadForecast } from './weather.mjs';
import { loadSpotlights } from './spotlights.mjs';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Chamber home page loading...');
    loadWeather();
    loadForecast();
    loadSpotlights();
});