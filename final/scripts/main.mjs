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
            window.open('https://www.loom.com/share/4c3bec8375814dd69160a17a75bca49c', '_blank');
        });
    }
});