// spotlights.mjs - Random gold/silver member spotlights
const spotlightContainer = document.querySelector('#members');

export async function loadSpotlights() {
    if (!spotlightContainer) return;
    
    spotlightContainer.innerHTML = '<div class="loading">Loading member spotlights...</div>';
    
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load member data');
        
        const members = await response.json();
        
        // Filter gold and silver members
        const eligible = members.filter(m => 
            m.level === 'Gold' || m.level === 'Silver'
        );
        
        if (eligible.length === 0) {
            spotlightContainer.innerHTML = '<p>No spotlight members available</p>';
            return;
        }
        
        // Randomly select 2-3 members
        const shuffled = [...eligible];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const count = Math.min(eligible.length, Math.floor(Math.random() * 2) + 2);
        const selected = shuffled.slice(0, count);
        
        displaySpotlights(selected);
        
        console.log('Spotlights loaded:', selected.length, 'members');
        
    } catch (error) {
        console.error('Spotlight error:', error);
        spotlightContainer.innerHTML = '<p class="error">Unable to load member spotlights</p>';
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member');
        
        // Handle image filename
        let imageName = '';
        if (member.name === 'Fresh Farm Exporters') imageName = 'Fresh Farm Exporters.jpg';
        else if (member.name === 'AgroTech Kenya') imageName = 'AgroTech Kenya.jpg';
        else if (member.name === 'Green Harvest') imageName = 'Organic produce supplier.jpg';
        else imageName = member.name.replace(/ /g, '-') + '.jpg';
        
        // Format membership level
        const levelClass = member.level.toLowerCase();
        
        card.innerHTML = `
            <img src="images/${imageName}" alt="${member.name} logo" class="spotlight-logo" loading="lazy" onerror="this.src='../images/logo.svg'">
            <h3>${member.name}</h3>
            <p>${member.description || ''}</p>
            <p>📍 ${member.address || 'Address not available'}</p>
            <p>📞 ${member.phone || 'N/A'}</p>
            <p>🌐 <a href="${member.website}" target="_blank" rel="noopener">${member.website ? member.website.replace('https://', '').replace('http://', '') : 'Website'}</a></p>
            <span class="membership-${levelClass}">${member.level}</span>
        `;
        
        spotlightContainer.appendChild(card);
    });
}