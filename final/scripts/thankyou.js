// thankyou.js - Display submitted form data
document.addEventListener('DOMContentLoaded', () => {
    displayFormData();
});

function displayFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const container = document.getElementById('formData');
    
    if (!container) return;
    
    const fields = [
        { name: 'name', label: 'Full Name' },
        { name: 'email', label: 'Email Address' },
        { name: 'phone', label: 'Phone Number' },
        { name: 'interest', label: 'I am a' },
        { name: 'message', label: 'Message' },
        { name: 'timestamp', label: 'Submitted On' }
    ];
    
    let html = '<div class="summary-grid">';
    
    fields.forEach(field => {
        let value = urlParams.get(field.name);
        if (value) {
            if (field.name === 'timestamp') {
                value = new Date(value).toLocaleString();
            }
            if (field.name === 'interest') {
                value = value === 'farmer' ? 'Farmer' : value === 'exporter' ? 'Exporter' : 'Both';
            }
            html += `
                <div class="summary-item">
                    <strong>${field.label}:</strong>
                    <span>${escapeHtml(value)}</span>
                </div>
            `;
        }
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}