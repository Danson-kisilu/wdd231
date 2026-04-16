// main.mjs - Home page functionality
import { setupNavigation } from './navigation.mjs';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    
    // Set current year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Set last modified
    const modifiedSpan = document.getElementById('lastModified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
    
    const videoLink = document.getElementById('videoLink');
    if (videoLink) {
        videoLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Video demo will be added here after recording.');
        });
    }
});