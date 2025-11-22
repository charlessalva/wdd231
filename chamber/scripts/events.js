// Placeholder function to fetch events (Replace with actual API or database calls later)
async function fetchEvents() {
    // Simulated event data
    const events = [
        {
            title: "Business Networking Luncheon",
            date: "2025-12-01",
            location: "Pasig Convention Center",
            description: "Join us for a networking lunch to meet other local business owners and entrepreneurs."
        },
        {
            title: "Chamber Annual General Meeting",
            date: "2025-12-10",
            location: "Pasig City Hall",
            description: "Annual general meeting to discuss the chamber's activities and future plans."
        },
        {
            title: "Small Business Workshop: Marketing Strategies",
            date: "2025-12-15",
            location: "Pasig Library",
            description: "Workshop for small business owners to learn effective marketing strategies."
        }
    ];

    // Render the events on the page
    displayEvents(events);
}

function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <h3 class="event-title">${event.title}</h3>
            <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
            <p class="event-location">${event.location}</p>
            <p class="event-description">${event.description}</p>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Call the function when the page is ready
fetchEvents();
