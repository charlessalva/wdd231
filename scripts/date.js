// date.js
document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    const yearSpan = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastModified");

    if (yearSpan) yearSpan.textContent = year;
    if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
});
