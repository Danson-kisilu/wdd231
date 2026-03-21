const url = "data/members.json";
const container = document.querySelector("#directory");

// FETCH DATA
async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

getMembers();

// DISPLAY MEMBERS
function displayMembers(members) {

  container.innerHTML = "";

  members.forEach(member => {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>${member.membership}</strong></p>
    `;

    container.appendChild(card);
  });
}

// VIEW TOGGLE

document.querySelector("#gridBtn").addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

document.querySelector("#listBtn").addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});