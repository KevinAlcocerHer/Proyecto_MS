// JavaScript para la página de detalle de obra
document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const body = document.querySelector("body");
    const btnRegresar = document.getElementById("btnRegresar");
    const btnEditar = document.getElementById("btnEditar");
    const modalEditar = document.getElementById("modalEditar");
    const cerrarModalEditar = document.getElementById("cerrarModalEditar");
    const formEditar = document.getElementById("formEditar");
    const toggleSwitch = document.querySelector(".toggle-switch");
    const modeText = document.querySelector(".mode-text");

    // Asegurarse de que el modal comienza oculto
    modalEditar.style.display = "none";

    // Arreglar la visibilidad del botón de editar
    btnEditar.style.display = "flex";

    // Variables globales
    let obraActual = null;

    // Manejar el botón de regreso
    btnRegresar.addEventListener("click", () => {
        window.location.href = "obras.html"; // Regresar a la página principal
    });

    // Función mejorada para abrir el modal de edición
    btnEditar.addEventListener("click", () => {
        cargarDatosFormularioEdicion();
        modalEditar.style.display = "flex";
        document.body.style.overflow = "hidden"; // Evitar scroll en el fondo
    });

    // Función mejorada para cerrar el modal
    cerrarModalEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
        document.body.style.overflow = "auto"; // Restaurar scroll
    });

    // Cerrar modal al hacer clic fuera con mejora para evitar cierres accidentales
    window.addEventListener("click", (event) => {
        if (event.target === modalEditar) {
            modalEditar.style.display = "none";
            document.body.style.overflow = "auto"; // Restaurar scroll
        }
    });

    // Manejar envío del formulario de edición
    formEditar.addEventListener("submit", (e) => {
        e.preventDefault();
        guardarCambiosObra();
    });

    // Tema oscuro y claro
    toggleSwitch.addEventListener("click", () => {
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

    // Obtener el ID de la obra desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const obraId = urlParams.get('id');

    if (obraId) {
        // Cargar los datos de la obra desde localStorage
        cargarDatosObra(obraId);
    } else {
        alert("No se especificó una obra para mostrar");
        window.location.href = "obras.html"; // Redirigir si no hay id
    }

    // Función para cargar los datos de la obra - versión corregida
    function cargarDatosObra(id) {
        // Obtener todas las obras del localStorage
        const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
        
        // Buscar la obra por su ID
        const obra = obrasGuardadas.find(o => o.id === id);
        
        if (obra) {
            // Guardar la obra actual en variable global
            obraActual = obra;
            window.obraActual = obra;
            
            // Rellenar los datos en la página
            document.title = "Obra: " + obra.nombre + " | TecnoBuild";
            document.getElementById("obraTitulo").innerHTML = `Obra: <span>${obra.nombre}</span>`;
            
            if (obra.imagen) {
                document.getElementById("obraImagen").src = obra.imagen;
            }
            
            // Mostrar la información actualizada
            document.getElementById("obraUbicacion").textContent = `Ubicación: ${obra.ubicacion || "Ubicación no disponible"}`;
            document.getElementById("obraDuenoPredio").textContent = `Dueño del predio: ${obra.duenoPredio || "Dueño no especificado"}`;
            document.getElementById("obraNumeroContrato").textContent = `Número de contrato: ${obra.numeroContrato || "No asignado"}`;
            document.getElementById("obraPresupuesto").textContent = `Presupuesto: ${obra.presupuesto || "$0"}`;
            document.getElementById("obraFechaInicio").textContent = obra.fechaInicio ? 
                formatearFecha(obra.fechaInicio) : "Fecha no disponible";
            
            // Calcular progreso
            const hoy = new Date();
            const inicio = obra.fechaInicio ? new Date(obra.fechaInicio) : new Date();
            const fin = obra.fechaFin ? new Date(obra.fechaFin) : new Date(inicio);
            fin.setMonth(fin.getMonth() + 3); // Si no hay fecha fin, asumimos 3 meses por defecto
            
            // Asegurarse de que las fechas son válidas
            if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
                document.getElementById("obraProgreso").style.width = "0%";
                document.getElementById("obraSemana").textContent = "0";
            } else {
                // Calcular diferencia en días
                const totalDias = Math.floor((fin - inicio) / (1000 * 60 * 60 * 24));
                const diasTranscurridos = Math.floor((hoy - inicio) / (1000 * 60 * 60 * 24));
                
                // Calcular semanas
                const semanasTotal = Math.ceil(totalDias / 7);
                const semanaActual = Math.ceil(diasTranscurridos / 7);
                
                // Establecer número de semana (no mayor que el total)
                const semanaAMostrar = Math.min(semanaActual, semanasTotal);
                document.getElementById("obraSemana").textContent = semanaAMostrar > 0 ? semanaAMostrar : "1";
                
                // Calcular porcentaje de progreso
                let porcentaje = (diasTranscurridos / totalDias) * 100;
                
                // Restringir entre 0 y 100
                porcentaje = Math.max(0, Math.min(100, porcentaje));
                
                document.getElementById("obraProgreso").style.width = `${porcentaje}%`;
            }
            
            // Actividades (usar datos de la obra si existen, sino simulados)
            document.getElementById("fechaEntrada").textContent = `Fecha de entrada: ${obra.fechaEntrada ? formatearFecha(obra.fechaEntrada) : fechaAleatoria()}`;
            document.getElementById("recibio").textContent = `Recibió: ${obra.recibio || "Nombre no registrado"}`;
            document.getElementById("cantidad").textContent = `Cantidad: ${obra.cantidad || Math.floor(Math.random() * 100) + 1}`;
            
            document.getElementById("fechaCorte").textContent = `Fecha de corte: ${obra.fechaCorte ? formatearFecha(obra.fechaCorte) : fechaAleatoria()}`;
            document.getElementById("responsablePagar").textContent = `Responsable pagar: ${obra.responsablePagar || obra.responsable || "No asignado"}`;
            document.getElementById("pagado").textContent = `Pagado: ${obra.pagado || (Math.random() > 0.5 ? "Sí" : "No")}`;
            
            document.getElementById("fechaEntrega").textContent = `Fecha de entrega: ${obra.fechaEntrega ? formatearFecha(obra.fechaEntrega) : fechaAleatoria()}`;
            document.getElementById("responsableEntrega").textContent = `Responsable Entrega: ${obra.responsableEntrega || obra.responsable || "No asignado"}`;
            document.getElementById("responsableRecibe").textContent = `Responsable Recibe: ${obra.responsableRecibe || obra.recibio || "No asignado"}`;
            
            // Si hay trabajadores asignados
            if (obra.trabajadores && obra.trabajadores.length > 0) {
                const listaTrabajadores = document.getElementById("listaTrabajadores");
                listaTrabajadores.innerHTML = "";
                
                obra.trabajadores.forEach(trabajador => {
                    const li = document.createElement("li");
                    li.textContent = trabajador;
                    listaTrabajadores.appendChild(li);
                });
            }
            
            // Si hay herramientas asignadas
            if (obra.herramientas && obra.herramientas.length > 0) {
                const listaHerramientas = document.getElementById("listaHerramientas");
                listaHerramientas.innerHTML = "";
                
                obra.herramientas.forEach(herramienta => {
                    const li = document.createElement("li");
                    li.textContent = herramienta;
                    listaHerramientas.appendChild(li);
                });
            }
        } else {
            alert("No se encontró la obra especificada");
            window.location.href = "/Principal/obras.html"; // Redirigir si no se encuentra
        }
    }

    // Cargar datos en el formulario de edición - modificada para solo información general
    function cargarDatosFormularioEdicion() {
        if (!obraActual) return;
        
        // Mostrar solo la sección de información general y ocultar las demás
        const secciones = document.querySelectorAll('.seccion-form');
        secciones.forEach((seccion, index) => {
            if (index === 0) {
                // Mostrar solo la primera sección (Información General)
                seccion.style.display = 'block';
            } else {
                // Ocultar las demás secciones
                seccion.style.display = 'none';
            }
        });
        
        // Información general - solo los campos que queremos mantener
        document.getElementById("editNombre").value = obraActual.nombre || "";
        document.getElementById("editUbicacion").value = obraActual.ubicacion || "";
        
        // Campos específicos de la etiqueta simplificada
        if (document.getElementById("editDuenoPredio")) {
            document.getElementById("editDuenoPredio").value = obraActual.duenoPredio || "";
        }
        if (document.getElementById("editNumeroContrato")) {
            document.getElementById("editNumeroContrato").value = obraActual.numeroContrato || "";
        }
        if (document.getElementById("editPresupuesto")) {
            document.getElementById("editPresupuesto").value = obraActual.presupuesto || "";
        }
        
        document.getElementById("editFechaInicio").value = obraActual.fechaInicio || "";
        
        // Mantener estos campos para la funcionalidad interna, pero no los mostraremos en la interfaz principal
        if (document.getElementById("editFechaFin")) {
            document.getElementById("editFechaFin").value = obraActual.fechaFin || "";
        }
        if (document.getElementById("editGastoMaterial")) {
            document.getElementById("editGastoMaterial").value = obraActual.gastoMaterial || 0;
        }
        if (document.getElementById("editGastoTrabajadores")) {
            document.getElementById("editGastoTrabajadores").value = obraActual.gastoTrabajadores || 0;
        }
    }

    // Función para guardar los cambios de la obra - modificada para solo información general
    function guardarCambiosObra() {
        if (!obraActual) return;
        
        // Obtener valores del formulario - solo los campos que queremos mantener
        const nombre = document.getElementById("editNombre").value;
        const ubicacion = document.getElementById("editUbicacion").value;
        
        // Capturar los nuevos campos específicos de la etiqueta simplificada
        let duenoPredio = "";
        let presupuesto = "";
        
        if (document.getElementById("editDuenoPredio")) {
            duenoPredio = document.getElementById("editDuenoPredio").value;
        }
        if (document.getElementById("editNumeroContrato")) {
            numeroContrato = document.getElementById("editNumeroContrato").value;
        }
        if (document.getElementById("editPresupuesto")) {
            presupuesto = document.getElementById("editPresupuesto").value;
        }
        
        const fechaInicio = document.getElementById("editFechaInicio").value;
        
        // Validar que los campos no estén vacíos
        if (!nombre.trim()) {
            alert("El nombre de la obra es obligatorio");
            return;
        }
        
        if (!ubicacion.trim()) {
            alert("La ubicación es obligatoria");
            return;
        }
        
        if (!fechaInicio) {
            alert("La fecha de inicio es obligatoria");
            return;
        }
        
        // Actualizar objeto obra - solo la información general
        obraActual.nombre = nombre;
        obraActual.ubicacion = ubicacion;
        
        // Actualizar los nuevos campos específicos de la etiqueta simplificada
        if (duenoPredio) obraActual.duenoPredio = duenoPredio;
        if (numeroContrato) obraActual.numeroContrato = numeroContrato;
        if (presupuesto) obraActual.presupuesto = presupuesto;
        
        obraActual.fechaInicio = fechaInicio;
        
        // Guardar en localStorage
        guardarObraActualizada();
        
        // Actualizar la vista
        cargarDatosObra(obraActual.id);
        
        // Cerrar el modal
        modalEditar.style.display = "none";
        document.body.style.overflow = "auto"; // Restaurar scroll
        
        if (typeof window.actualizarInformacionProyecto === 'function') {
            window.actualizarInformacionProyecto();
        }
        // Mostrar mensaje de éxito
        alert("Información general actualizada correctamente");
    }

    // Función para guardar la obra actualizada en localStorage
    function guardarObraActualizada() {
        // Obtener todas las obras del localStorage
        const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
        
        // Encontrar el índice de la obra actual
        const indice = obrasGuardadas.findIndex(o => o.id === obraActual.id);
        
        if (indice !== -1) {
            // Reemplazar la obra
            obrasGuardadas[indice] = obraActual;
            
            // Guardar de nuevo en localStorage
            localStorage.setItem("obras", JSON.stringify(obrasGuardadas));
        }
    }

    // Función auxiliar para formatear fechas
    function formatearFecha(fechaStr) {
        if (!fechaStr) return "No definido";
        
        const fecha = new Date(fechaStr);
        if (isNaN(fecha)) return "Fecha inválida";
        
        return fecha.toLocaleDateString();
    }

    // Función auxiliar para generar una fecha aleatoria en el último año
    function fechaAleatoria() {
        const hoy = new Date();
        const diasAtras = Math.floor(Math.random() * 365);
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() - diasAtras);
        return fecha.toLocaleDateString();
    }
});


// Código para integrar con obra-detalle.js
// Colocar este código justo después del cierre de DOMContentLoaded

// Agregar la referencia global a obraActual
window.obraActual = null;

// Modificar la función cargarDatosObra para asignar obraActual a window.obraActual
function cargarDatosObra(id) {
    // Obtener todas las obras del localStorage
    const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
    
    // Buscar la obra por su ID
    const obra = obrasGuardadas.find(o => o.id === id);
    
    if (obra) {
        // Guardar la obra actual en variable global
        obraActual = obra;
        window.obraActual = obra; // Añadir esta línea para hacer accesible globalmente
        
        // Resto del código de cargarDatosObra...
    }
}


