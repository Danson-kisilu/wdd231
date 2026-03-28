// main.mjs - Main entry point for chamber home page
import { loadWeather, loadForecast } from './weather.mjs';
import { loadSpotlights } from './spotlights.mjs';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Chamber home page initializing...');
    loadWeather();
    loadForecast();
    loadSpotlights();
});