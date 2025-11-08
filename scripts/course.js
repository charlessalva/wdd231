document.addEventListener("DOMContentLoaded", () => {
    // Select elements that already exist in your HTML
    const courseList = document.querySelector(".course-list");
    const totalCreditsEl = document.querySelector(".course-credits");
    const buttons = document.querySelectorAll(".filter-btn");

    // Your course data
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands-on with students participating in simple web designs and programming.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Students learn to write, call, debug, and test their own functions and handle errors within them, improving their programming organization and efficiency.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Introduces the concept of classes and objects, encapsulation, inheritance, and polymorphism.',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Students learn to create dynamic websites that use JavaScript to respond to events and create responsive user experiences.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'Focuses on UX, accessibility, compliance, performance optimization, and basic API usage.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    // Function to render course cards
    function renderCourses(filter = "all") {
        courseList.innerHTML = "";

        const filtered = courses.filter(course =>
            filter === "all" ? true : course.subject.toLowerCase() === filter
        );

        filtered.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            if (course.completed) card.classList.add("completed");

            // simplified layout — show only course code and check mark if completed
            card.innerHTML = `
            <h3>${course.subject} ${course.number}
                ${course.completed ? '<span class="checkmark">✔</span>' : ''}
            </h3>
        `;

            courseList.appendChild(card);
        });

        const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
        totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
    }


    // Initial render (show all)
    renderCourses();

    // Filter buttons
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".filter-btn.active").classList.remove("active");
            btn.classList.add("active");
            renderCourses(btn.dataset.filter);
        });
    });
});
