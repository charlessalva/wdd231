// main.js - navigation, wayfinding, year, dark mode, accessibility helpers
(function () {
    document.addEventListener('DOMContentLoaded', () => {

        /* -------------------------
           Year
        ------------------------- */
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();


        /* -------------------------
           Mobile nav toggle + hamburger animation
        ------------------------- */
        const btn = document.getElementById('nav-toggle');
        const nav = document.getElementById('primary-nav');

        if (btn && nav) {
            btn.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('open');
                btn.classList.toggle('open', isOpen);
                btn.setAttribute('aria-expanded', String(isOpen));
            });
        }


        /* -------------------------
           Wayfinding (highlight current page)
        ------------------------- */
        const links = document.querySelectorAll('#primary-nav a');
        const currentPage = location.pathname.split('/').pop() || 'index.html';

        links.forEach(link => {
            const target = link.getAttribute('href');
            const cleanURL = link.href.split('#')[0].split('?')[0];

            if (target === currentPage || cleanURL === location.href.split('#')[0].split('?')[0]) {
                link.setAttribute('aria-current', 'page');
            }
        });


        /* -------------------------
           Restore theme preference
        ------------------------- */
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    });
})();
