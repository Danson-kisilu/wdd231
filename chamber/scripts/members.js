const container = document.querySelector("#members");

async function getMembers(){
    const response = await fetch("data/members.json");
    const data = await response.json();

    // FILTER ONLY GOLD & SILVER
    const filtered = data.filter(m => 
        m.level === "Gold" || m.level === "Silver"
    );

    displayMembers(filtered);
}

function displayMembers(members){

    container.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("div");
        card.classList.add("member");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <strong>${member.level}</strong>
        `;

        container.appendChild(card);
    });
}

getMembers();