document.addEventListener('keydown', function (event) {
    if (event.altKey && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('.search input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Búsqueda en vivo mejorada
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search input');
    const technologyCards = document.querySelectorAll('.grid.cols-3 .card');
    const noResultsMessage = document.getElementById('noResults');

    if (searchInput && technologyCards.length > 0) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCards = 0;

            technologyCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-desc').textContent.toLowerCase();
                const chips = Array.from(card.querySelectorAll('.chip')).map(chip =>
                    chip.textContent.toLowerCase()
                );

                // Buscar en título, descripción y chips
                const matches = title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    chips.some(chip => chip.includes(searchTerm));

                if (matches || searchTerm === '') {
                    card.style.display = 'grid';
                    card.style.opacity = '1';
                    visibleCards++;
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });

            // Mostrar/ocultar mensaje de no resultados
            if (noResultsMessage) {
                if (visibleCards === 0 && searchTerm !== '') {
                    noResultsMessage.classList.add('show');
                } else {
                    noResultsMessage.classList.remove('show');
                }
            }
        });

        // Limpiar búsqueda con Escape
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                e.target.value = '';
                technologyCards.forEach(card => {
                    card.style.display = 'grid';
                    card.style.opacity = '1';
                });
                if (noResultsMessage) {
                    noResultsMessage.classList.remove('show');
                }
            }
        });
    }
});