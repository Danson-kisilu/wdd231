// discover.js - Load discover items and handle visit tracking

import { discoverItems } from '../data/discover-items.mjs';

// Load items onto the page
function loadDiscoverItems() {
    const container = document.getElementById('discover-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    discoverItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="images/${item.image}" alt="${item.name}" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More →</button>
        `;
        
        container.appendChild(card);
    });
}

// Handle last visit message using localStorage
function displayVisitMessage() {
    const messageContainer = document.getElementById('visit-message');
    if (!messageContainer) return;
    
    const lastVisit = localStorage.getItem('lastVisitDate');
    const currentDate = Date.now();
    
    if (!lastVisit) {
        // First visit
        messageContainer.innerHTML = '👋 Welcome! Let us know if you have any questions.';
        messageContainer.className = 'visit-message first';
    } else {
        const daysDifference = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            messageContainer.innerHTML = '🔥 Back so soon! Awesome!';
            messageContainer.className = 'visit-message soon';
        } else if (daysDifference === 1) {
            messageContainer.innerHTML = `📅 You last visited 1 day ago.`;
            messageContainer.className = 'visit-message normal';
        } else {
            messageContainer.innerHTML = `📅 You last visited ${daysDifference} days ago.`;
            messageContainer.className = 'visit-message normal';
        }
    }
    
    // Store current visit date
    localStorage.setItem('lastVisitDate', currentDate.toString());
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadDiscoverItems();
    displayVisitMessage();
});