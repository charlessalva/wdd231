// Add timestamp
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#timestamp").value = new Date().toISOString();
});

// Modal functionality
document.querySelectorAll(".learn-more").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = link.dataset.modal;
        document.getElementById(modalId).style.display = "block";
    });
});

document.querySelectorAll(".close").forEach(button => {
    button.addEventListener("click", () => {
        button.closest(".modal").style.display = "none";
    });
});

window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) modal.style.display = "none";
    });
});
