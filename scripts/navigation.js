// navigation.js
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const navBar = document.querySelector("#nav-bar");

    menuButton.addEventListener("click", () => {
        navBar.classList.toggle("show");
        menuButton.textContent = navBar.classList.contains("show") ? "✖" : "☰";
    });
});
