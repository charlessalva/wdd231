// Function to fetch and display spotlight members
async function fetchSpotlights() {
    // Fetch the members JSON data
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Filter members by gold (3) or silver (2) membership levels
    const spotlightMembers = members.filter(member => member.membership === 2 || member.membership === 3);

    // Randomly select 2 or 3 spotlight members
    const selectedMembers = selectRandomMembers(spotlightMembers);

    // Render the spotlight members on the page
    displaySpotlights(selectedMembers);
}

// Function to randomly select 2 or 3 members
function selectRandomMembers(members) {
    const shuffled = members.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 3); // Select 2 or 3 random members
}

// Function to display the spotlight cards
function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');

    // Clear any existing content in the spotlight container
    spotlightContainer.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-card');

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" class="spotlight-logo">
            <h3 class="spotlight-name">${member.name}</h3>
            <p class="spotlight-description">${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
        `;

        spotlightContainer.appendChild(memberCard);
    });
}

// Call the fetchSpotlights function when the page is ready
fetchSpotlights();
