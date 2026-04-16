// contact.mjs - Handle form, local storage, timestamp
import { setYear, setLastModified } from './date.mjs';
import { setupNavigation } from './navigation.mjs';

function setTimestamp() {
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }
}

function loadPreferences() {
    const saved = localStorage.getItem('farmConnectPreference');
    const container = document.getElementById('savedPreferences');
    if (container) {
        if (saved) {
            container.innerHTML = `You prefer: <strong>${saved}</strong>`;
        } else {
            container.innerHTML = 'No saved preferences yet. Select an option from the form to save.';
        }
    }
}

function savePreference(value) {
    if (value && value !== '') {
        localStorage.setItem('farmConnectPreference', value);
        loadPreferences();
    }
}

function setupFormListener() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', () => {
            const interest = document.getElementById('interest').value;
            if (interest) savePreference(interest);
        });
    }
    
    const clearBtn = document.getElementById('clearStorageBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem('farmConnectPreference');
            loadPreferences();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    setupNavigation();
    setTimestamp();
    loadPreferences();
    setupFormListener();
});