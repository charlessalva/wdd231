// thankyou.js

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    // Required fields to display
    const fields = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Mobile Number",
        organization: "Business / Organization",
        timestamp: "Submission Time"
    };

    const container = document.getElementById("confirmation-details");

    // Display each value properly
    Object.keys(fields).forEach(key => {
        const value = params.get(key);

        if (value) {
            const item = document.createElement("p");
            item.classList.add("detail-item");
            item.innerHTML = `<strong>${fields[key]}:</strong> ${value}`;
            container.appendChild(item);
        }
    });
});
