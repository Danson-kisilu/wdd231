const btn = document.querySelector("#menuButton");
const nav = document.querySelector("#navMenu");

btn.addEventListener("click", () => {
    nav.classList.toggle("open");
});