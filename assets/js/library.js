// Efecto de sombra al hacer scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('.cheatsheet-nav');
    if (window.scrollY > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Navegación suave
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        // Actualizar navegación activa
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');

        // Desplazamiento suave con offset para la navegación fija
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 140;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar navegación activa al hacer scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    let currentSection = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
});

// Atajo de teclado para búsqueda
document.addEventListener('keydown', function (event) {
    if (event.altKey && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('.search input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Búsqueda en vivo mejorada para Java CheatSheet
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search input');
    const sections = document.querySelectorAll('.section');

    // Crear mensaje de no resultados
    const noResultsHTML = `
        <div class="no-results" id="noResults" style="display: none;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="#9aa6bd" stroke-width="1.6" />
                <path d="M21 21l-3.5-3.5" stroke="#9aa6bd" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            <h2>No se encontraron resultados</h2>
            <p>Intenta con otros términos de búsqueda</p>
        </div>
    `;

    // Insertar el mensaje en el contenido principal
    const mainContent = document.querySelector('.cheatsheet-content');
    if (mainContent) {
        mainContent.insertAdjacentHTML('beforeend', noResultsHTML);
    }

    const noResultsMessage = document.getElementById('noResults');

    if (searchInput && sections.length > 0) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleSections = 0;

            sections.forEach(section => {
                const title = section.querySelector('.section-title').textContent.toLowerCase();
                const codeBlocks = section.querySelectorAll('.code-block');
                const h3Elements = section.querySelectorAll('h3');
                const examples = section.querySelectorAll('.example');

                let codeContent = '';
                codeBlocks.forEach(block => {
                    codeContent += block.textContent.toLowerCase() + ' ';
                });

                let h3Content = '';
                h3Elements.forEach(h3 => {
                    h3Content += h3.textContent.toLowerCase() + ' ';
                });

                let exampleContent = '';
                examples.forEach(example => {
                    exampleContent += example.textContent.toLowerCase() + ' ';
                });

                // Buscar en título, código, subtítulos y ejemplos
                const matches = title.includes(searchTerm) ||
                    codeContent.includes(searchTerm) ||
                    h3Content.includes(searchTerm) ||
                    exampleContent.includes(searchTerm);

                if (matches || searchTerm === '') {
                    section.style.display = 'block';
                    visibleSections++;
                } else {
                    section.style.display = 'none';
                }
            });

            // Mostrar/ocultar mensaje de no resultados
            if (noResultsMessage) {
                if (visibleSections === 0 && searchTerm !== '') {
                    noResultsMessage.style.display = 'block';
                } else {
                    noResultsMessage.style.display = 'none';
                }
            }
        });

        // Limpiar búsqueda con Escape
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                e.target.value = '';
                sections.forEach(section => {
                    section.style.display = 'block';
                });
                if (noResultsMessage) {
                    noResultsMessage.style.display = 'none';
                }
            }
        });
    }
});