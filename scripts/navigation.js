// navigation.js
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const navBar = document.querySelector("#nav-bar");

    menuButton.addEventListener("click", () => {
        navBar.classList.toggle("show");
        menuButton.classList.toggle("open");

        // Accessibility for screen readers
        const expanded = menuButton.classList.contains("open");
        menuButton.setAttribute("aria-expanded", expanded);
    });
});
