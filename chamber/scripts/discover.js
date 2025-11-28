import { interests } from "../data/interests.mjs";

const grid = document.querySelector("#discoverGrid");

/* -------------------------------
   BUILD CARDS WITH GRID AREAS
--------------------------------*/
interests.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("discover-card", `area${index + 1}`);

    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button class="learn-btn" data-index="${index}">Learn More</button>
    `;

    grid.appendChild(card);
});

/* -------------------------------
   MODAL POPUPS
--------------------------------*/
function openModal(item) {
    const overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");

    overlay.innerHTML = `
        <div class="modal">
            <button class="modal-close">X</button>
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:6px; margin-bottom:1rem;">
            <p><strong>Address:</strong> ${item.address}</p>
            <p>${item.description}</p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close events
    overlay.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-overlay")) overlay.remove();
    });

    overlay.querySelector(".modal-close").addEventListener("click", () => overlay.remove());

    document.addEventListener(
        "keydown",
        (e) => {
            if (e.key === "Escape") overlay.remove();
        },
        { once: true }
    );
}

document.querySelectorAll(".learn-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = interests[btn.dataset.index];
        openModal(item);
    });
});

/* -------------------------------
   LAST VISIT MESSAGE
--------------------------------*/
const msgBox = document.querySelector("#visitMessage");
const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();

if (!lastVisit) {
    msgBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysPassed < 1) msgBox.textContent = "Back so soon! Awesome!";
    else if (daysPassed === 1) msgBox.textContent = "You last visited 1 day ago.";
    else msgBox.textContent = `You last visited ${daysPassed} days ago.`;
}

localStorage.setItem("lastVisit", now);
