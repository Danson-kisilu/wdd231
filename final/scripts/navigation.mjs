// navigation.mjs - Mobile menu toggle
export function setupNavigation() {
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }
}