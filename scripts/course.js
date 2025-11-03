// courses.js
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    const courseSection = document.createElement("section");
    courseSection.classList.add("courses-section");
    courseSection.innerHTML = `
    <h2>Web and Computer Programming Certificate Courses</h2>
    <div class="course-buttons">
      <button data-filter="all" class="active">All Courses</button>
      <button data-filter="wdd">WDD Courses</button>
      <button data-filter="cse">CSE Courses</button>
    </div>
    <div id="courseList" class="course-list"></div>
    <p id="totalCredits" class="credits"></p>
  `;
    main.appendChild(courseSection);

    // Course data (adapted from BYU-Idaho array)
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: false
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: false
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ];

    const courseList = document.getElementById("courseList");
    const totalCreditsEl = document.getElementById("totalCredits");
    const buttons = document.querySelectorAll(".course-buttons button");

    function renderCourses(filter = "all") {
        courseList.innerHTML = "";

        const filtered = courses.filter(course =>
            filter === "all" ? true : course.subject.toLowerCase() === filter
        );

        filtered.forEach(course => {
            const card = document.createElement("div");
            card.classList.add("course-card");
            if (course.completed) card.classList.add("completed");

            card.innerHTML = `
        <h3>${course.subject} ${course.number}</h3>
        <p>${course.title}</p>
        <p><strong>${course.credits}</strong> credits</p>
      `;

            courseList.appendChild(card);
        });

        const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
        totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
    }

    renderCourses();

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".course-buttons .active").classList.remove("active");
            btn.classList.add("active");
            renderCourses(btn.dataset.filter);
        });
    });
});
