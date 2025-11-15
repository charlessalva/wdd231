const container = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

async function loadMembers() {
    try {
        const response = await fetch("./data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="../chamber/images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        container.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
});

document.querySelectorAll('.view-toggle .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.view-toggle .filter-btn.active')
                ?.classList.remove('active');
            btn.classList.add('active');
        });
});

loadMembers();
