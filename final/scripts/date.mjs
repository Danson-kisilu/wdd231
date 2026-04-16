// date.mjs - Set current year and last modified
export function setYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

export function setLastModified() {
    const modifiedSpan = document.getElementById('lastModified');
    if (modifiedSpan) {
        modifiedSpan.textContent = document.lastModified;
    }
}