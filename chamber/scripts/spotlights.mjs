// spotlights.mjs - Member spotlights (always 3 members)
const container = document.querySelector('#members');

export async function loadSpotlights() {
    if (!container) return;
    container.innerHTML = '<div class="loading">Loading spotlights...</div>';
    
    try {
        const res = await fetch('data/members.json');
        if (!res.ok) throw new Error('Failed to load');
        const members = await res.json();
        
        // Filter Gold & Silver
        const eligible = members.filter(m => m.level === 'Gold' || m.level === 'Silver');
        
        if (eligible.length === 0) {
            container.innerHTML = '<p>No spotlights available</p>';
            return;
        }
        
        // Shuffle and pick 3 (or all if less than 3)
        const shuffled = [...eligible];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const selected = shuffled.slice(0, 3);
        
        displaySpotlights(selected);
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p class="error">Unable to load spotlights</p>';
    }
}

function displaySpotlights(members) {
    container.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member');
        
        let imageName = '';
        if (member.name === 'Fresh Farm Exporters') imageName = 'Fresh Farm Exporters.jpg';
        else if (member.name === 'AgroTech Kenya') imageName = 'AgroTech Kenya.jpg';
        else if (member.name === 'Green Harvest') imageName = 'Organic produce supplier.jpg';
        else imageName = member.name.replace(/ /g, '-') + '.jpg';
        
        card.innerHTML = `
            <img src="images/${imageName}" alt="${member.name}" class="spotlight-logo" onerror="this.src='../images/logo.svg'">
            <h3>${member.name}</h3>
            <p>${member.description || ''}</p>
            <p>📍 ${member.address || 'Address not available'}</p>
            <p>📞 ${member.phone || 'N/A'}</p>
            <p>🌐 <a href="${member.website}" target="_blank">${member.website ? member.website.replace('https://', '') : 'Website'}</a></p>
            <span class="membership-${member.level.toLowerCase()}">${member.level}</span>
        `;
        container.appendChild(card);
    });
}