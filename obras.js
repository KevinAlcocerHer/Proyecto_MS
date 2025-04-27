// JavaScript para manejar el menú con submenús verticales
document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const body = document.querySelector("body");
    const sidebar = body.querySelector(".sidebar");
    const toggle = body.querySelector(".toggle");
    const modeSwitch = body.querySelector(".toggle-switch");
    const modeText = body.querySelector(".mode-text");
    const menuTitles = document.querySelectorAll('.menu-title');
    const openModal = document.getElementById('openModal');
    const closeModal = document.getElementById('closeModal');
    const formModal = document.getElementById('formModal');
    
    // Toggle sidebar
    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        
        // Cerrar todos los submenús cuando se cierra/abre el sidebar
        document.querySelectorAll('.nav-link.open').forEach(item => {
            item.classList.remove('open');
        });
    });
    
    // Tema oscuro y claro
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        
        if (body.classList.contains("dark")) {
            modeText.innerText = "Modo claro";
            // Guardar el modo oscuro en localStorage
            localStorage.setItem("theme", "dark");
        } else {
            modeText.innerText = "Modo oscuro";
            // Guardar el modo claro en localStorage
            localStorage.setItem("theme", "light");
        }
    });
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        body.classList.add("dark");
        modeText.innerText = "Modo claro";
    } else {
        body.classList.remove("dark");
        modeText.innerText = "Modo oscuro";
    }
    
    // Manejo del modal (si existe)
    if (openModal && closeModal && formModal) {
        openModal.addEventListener('click', () => {
            formModal.style.display = 'flex';
        });
        
        closeModal.addEventListener('click', () => {
            formModal.style.display = 'none';
        });
        
        window.addEventListener('click', (event) => {
            if (event.target === formModal) {
                formModal.style.display = 'none';
            }
        });
    }

    // Funcionamiento del hover cuando el sidebar está cerrado
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.querySelector('.submenu')) {
            // Mostrar submenú al hover cuando el sidebar está cerrado
            link.addEventListener('mouseenter', function() {
                if (sidebar.classList.contains('close')) {
                    this.classList.add('open');
                }
            });
            
            // Ocultar al salir
            link.addEventListener('mouseleave', function() {
                if (sidebar.classList.contains('close')) {
                    this.classList.remove('open');
                }
            });
        }
    });
    
    // Marcar la página actual como activa
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage) {
        // Buscar enlaces que coincidan con la página actual
        document.querySelectorAll('.menu-links a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                // Si es un enlace de submenú
                if (link.closest('.submenu')) {
                    link.parentElement.classList.add('active');
                    // Abrir el submenú padre
                    const parentNavLink = link.closest('.nav-link');
                    parentNavLink.classList.add('open');
                    parentNavLink.classList.add('active');
                    
                    // Ajustar posiciones para el menú abierto
                    setTimeout(() => {
                        recalculateMenuPositions();
                    }, 10);
                } else {
                    // Si es un enlace principal
                    link.closest('.nav-link').classList.add('active');
                }
            }
        });
    }
});