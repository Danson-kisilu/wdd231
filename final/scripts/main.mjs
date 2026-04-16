// main.mjs - Home page functionality
import { setYear, setLastModified } from './date.mjs';
import { setupNavigation } from './navigation.mjs';

document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    setupNavigation();
    
    const videoLink = document.getElementById('videoLink');
    if (videoLink) {
        videoLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Video demo will be added here after recording.');
        });
    }
});