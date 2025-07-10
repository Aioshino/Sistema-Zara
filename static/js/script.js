document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIÓN 1: MARCAR EL ENLACE DE NAVEGACIÓN ACTIVO ---
    try {
        const currentPagePath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        let activeLinkFound = false;

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname; // Obtiene la ruta limpia
            link.classList.remove('active');
            if (currentPagePath === linkPath) {
                link.classList.add('active');
                activeLinkFound = true;
            }
        });

        // Caso especial para la página principal
        if (!activeLinkFound && (currentPagePath.endsWith('/index.html') || currentPagePath.endsWith('/'))) {
            const homeLink = document.querySelector('a[href="../index.html"]'); // Busca el enlace a index
            if (homeLink) homeLink.classList.add('active');
        }
    } catch (error) {
        console.error("Error en la función de navegación activa:", error);
    }


    // --- FUNCIÓN 2: SIMULACIÓN DE INICIO DE SESIÓN ---
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const loginModalElement = document.getElementById('exampleModal');

    if (loginForm && loginContainer && loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const emailInput = document.getElementById('loginEmail');
            const email = emailInput.value;
            if (!email) return;

            const userName = email.split('@')[0];
            const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
            loginContainer.innerHTML = `<span class="navbar-text">Bienvenido, ${capitalizedUserName}</span>`;
            loginModal.hide();
            loginForm.reset();
        });
    }


    // --- FUNCIÓN 3: FILTRO DE BÚSQUEDA DE PRODUCTOS ---
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product-item');

    if (searchInput && products.length > 0) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            products.forEach(function (product) {
                const productName = product.querySelector('.card-title').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
});