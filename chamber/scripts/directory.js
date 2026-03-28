// directory.js - Handles member directory with grid/list view toggle

const url = "data/members.json";
const container = document.querySelector("#directory");

// FETCH DATA
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load member data');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching members:', error);
        container.innerHTML = '<p class="error">Unable to load directory. Please try again later.</p>';
    }
}

// DISPLAY MEMBERS
function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Use the exact image filename from JSON
        const imageName = member.image || member.name.replace(/ /g, '-') + '.jpg';
        
        // Format membership level for display
        let membershipBadge = '';
        const level = member.level || member.membership;
        switch(level) {
            case 'Gold':
                membershipBadge = '<span class="badge gold">⭐ Gold Member</span>';
                break;
            case 'Silver':
                membershipBadge = '<span class="badge silver">✨ Silver Member</span>';
                break;
            default:
                membershipBadge = '<span class="badge member">🤝 Member</span>';
        }

        card.innerHTML = `
            <img src="images/${imageName}" alt="${member.name}" class="member-img" onerror="this.src='../images/logo.svg'">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-desc">${member.description || ''}</p>
                <p class="member-address">📍 ${member.address || 'Address not available'}</p>
                <p class="member-phone">📞 ${member.phone || 'N/A'}</p>
                <a href="${member.website}" target="_blank" rel="noopener" class="member-website">🌐 Visit Website</a>
                ${membershipBadge}
            </div>
        `;

        container.appendChild(card);
    });
    
    // Set initial view to GRID after displaying members
    setGridView();
}

// VIEW TOGGLE FUNCTIONALITY
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

function setGridView() {
    if (!container) return;
    container.classList.remove("directory-list");
    container.classList.add("directory-grid");
    
    if (gridBtn) gridBtn.classList.add("active");
    if (listBtn) listBtn.classList.remove("active");
}

function setListView() {
    if (!container) return;
    container.classList.remove("directory-grid");
    container.classList.add("directory-list");
    
    if (listBtn) listBtn.classList.add("active");
    if (gridBtn) gridBtn.classList.remove("active");
}

// Add event listeners
if (gridBtn) {
    gridBtn.addEventListener("click", setGridView);
}
if (listBtn) {
    listBtn.addEventListener("click", setListView);
}

// INITIAL LOAD
getMembers();