(function () {
    const DATA_PATH = 'data/services.json';
    let services = [];

    document.addEventListener('DOMContentLoaded', () => {
        const grid = document.getElementById('services-grid');
        const filter = document.getElementById('filter');
        const search = document.getElementById('search');
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        const modalClose = document.getElementById('modal-close');

        const favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));

        async function fetchData() {
            try {
                const res = await fetch(DATA_PATH);
                if (!res.ok) throw new Error('Network response not ok');
                services = await res.json();
                render(services);
            } catch (err) {
                grid.innerHTML = '<p>Unable to load data.</p>';
                console.error(err);
            }
        }

        function createCard(s) {
            const el = document.createElement('article');
            el.className = 'card';

            el.innerHTML = `
                <div class="card-top">
                    <div class="logo-wrap">
                        <img class="logo" src="${s.logo || 'images/logos/default.png'}" alt="${s.name} logo">
                    </div>

                    <div class="card-info">
                        <h3>${s.name}</h3>
                        <div class="meta">${s.type} — ${s.category}</div>
                        <p class="fee"><strong>Fee:</strong> ${s.transfer_fee}</p>
                        <p class="time"><strong>Time:</strong> ${s.processing_time}</p>
                    </div>

                    <button class="fav" data-id="${s.id}" aria-label="favorite">
                        ${favorites.has(s.id) ? '★' : '☆'}
                    </button>
                </div>

                <p class="desc">${s.description}</p>

                <button class="more" data-id="${s.id}">More details</button>
            `;

            return el;
        }

        function render(list) {
            grid.innerHTML = '';
            list.forEach(s => grid.appendChild(createCard(s)));
            attachCardEvents();
        }

        function attachCardEvents() {
            document.querySelectorAll('.more').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    const item = services.find(x => x.id === id);
                    if (item) openModal(item);
                });
            });

            document.querySelectorAll('.fav').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.id;
                    if (favorites.has(id)) {
                        favorites.delete(id);
                        btn.textContent = '☆';
                    } else {
                        favorites.add(id);
                        btn.textContent = '★';
                    }
                    localStorage.setItem('favorites', JSON.stringify([...favorites]));
                });
            });
        }

        function formatLink(url) {
            return url
                ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
                : `<span class="muted">No link available</span>`;
        }

        function openModal(item) {
            modalBody.innerHTML = `
                <h2>${item.name}</h2>

                <p><strong>Type:</strong> ${item.type}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Fee:</strong> ${item.transfer_fee}</p>
                <p><strong>Processing Time:</strong> ${item.processing_time}</p>
                <p>${item.description}</p>

                <hr>

                <h3>Official Links</h3>
                <p><strong>Website:</strong> ${formatLink(item.website)}</p>
                <p><strong>Support:</strong> ${formatLink(item.support)}</p>
            `;

            modal.setAttribute('aria-hidden', 'false');
        }

        modalClose.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'true');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
        });

        filter.addEventListener('change', applyFilters);
        search.addEventListener('input', applyFilters);

        function applyFilters() {
            let list = [...services];
            const val = filter.value.toLowerCase();
            const q = search.value.trim().toLowerCase();

            if (val !== 'all') {
                list = list.filter(
                    s => s.category.toLowerCase() === val || s.type.toLowerCase() === val
                );
            }

            if (q) {
                list = list.filter(
                    s =>
                        s.name.toLowerCase().includes(q) ||
                        s.description.toLowerCase().includes(q)
                );
            }

            render(list);
        }

        fetchData();
    });
})();
