// thankyou.js - Display submitted form data

document.addEventListener('DOMContentLoaded', () => {
    displayFormData();
});

function displayFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const container = document.getElementById('formData');
    
    if (!container) return;
    
    const fields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'title', label: 'Organizational Title' },
        { name: 'email', label: 'Email Address' },
        { name: 'phone', label: 'Mobile Phone' },
        { name: 'organization', label: 'Business/Organization' },
        { name: 'membership', label: 'Membership Level' },
        { name: 'timestamp', label: 'Application Date' }
    ];
    
    let html = '<div class="summary-grid">';
    
    fields.forEach(field => {
        let value = urlParams.get(field.name);
        if (value) {
            // Format membership level display
            if (field.name === 'membership') {
                switch(value) {
                    case 'np': value = 'NP Membership (Non-Profit)'; break;
                    case 'bronze': value = 'Bronze Membership'; break;
                    case 'silver': value = 'Silver Membership'; break;
                    case 'gold': value = 'Gold Membership'; break;
                }
            }
            // Format timestamp
            if (field.name === 'timestamp') {
                value = new Date(value).toLocaleString();
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