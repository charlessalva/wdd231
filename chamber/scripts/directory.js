const container = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

let membersData = []; // store members globally

async function loadMembers() {
    try {
        const response = await fetch("./data/members.json");
        membersData = await response.json();
        displayMembers(membersData);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members, showImages = true) {
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Only include image if showImages is true
        card.innerHTML = `
            ${showImages ? `<img src="../chamber/images/${member.image}" alt="${member.name}">` : ""}
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        container.appendChild(card);
    });
}

// Grid view button
gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    displayMembers(membersData, true); // show images
});

// List view button
listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    displayMembers(membersData, false); // hide images
});

// Toggle active button styling
document.querySelectorAll('.view-toggle .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.view-toggle .filter-btn.active')
            ?.classList.remove('active');
        btn.classList.add('active');
    });
});

loadMembers();
