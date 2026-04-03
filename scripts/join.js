// join.js - Handle timestamp and modals

// Set timestamp when form loads
document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    
    // Setup modals
    setupModals();
});

// Modal functionality
function setupModals() {
    const modalBtns = document.querySelectorAll('.modal-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // Open modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });
    
    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.close();
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
}