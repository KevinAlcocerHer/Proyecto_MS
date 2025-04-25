const body = document.querySelector("body")
    sidebar = body.querySelector(".sidebar")
    toggle = body.querySelector(".toggle")
    searchBtn = body.querySelector(".search-box")
    modeSwitch = body.querySelector(".toggle-switch")
    modeText = body.querySelector(".mode-text")
    
    toggle.addEventListener("click",() => {
        sidebar.classList.toggle("close")
    })

    // TEMA OSCURO Y CLARO
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
    
    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
    
        if (savedTheme === "dark") {
            body.classList.add("dark");
            modeText.innerText = "Modo claro";
        } else {
            body.classList.remove("dark");
            modeText.innerText = "Modo oscuro";
        }
    });
    
    // DESPLIEGUE DE FORMULARIOS
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
    

    
    

