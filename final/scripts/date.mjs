// date.js - Set current year and last modified
document.addEventListener('DOMContentLoaded', () => {
    const yearSpans = document.querySelectorAll('#year, #year2');
    yearSpans.forEach(span => {
        if (span) span.textContent = new Date().getFullYear();
    });
    
    const modifiedSpan = document.getElementById('lastModified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
});