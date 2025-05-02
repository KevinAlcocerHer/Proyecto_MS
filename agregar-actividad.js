// JavaScript modificado para la funcionalidad de agregar actividad
document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM
    const btnAgregarActividad = document.getElementById("btnAgregarActividad");
    const modalAgregarActividad = document.getElementById("modalAgregarActividad");
    const seleccionTipoActividad = document.getElementById("seleccionTipoActividad");
    const formMaterial = document.getElementById("formMaterial");
    const formListaRaya = document.getElementById("formListaRaya");
    const formHerramienta = document.getElementById("formHerramienta");
    const cerrarFormMaterial = document.getElementById("cerrarFormMaterial");
    const cerrarFormListaRaya = document.getElementById("cerrarFormListaRaya");
    const cerrarFormHerramienta = document.getElementById("cerrarFormHerramienta");
    const tiposActividad = document.querySelectorAll(".tipo-actividad");
    
    // Formularios
    const formAgregarMaterial = document.getElementById("formAgregarMaterial");
    const formAgregarListaRaya = document.getElementById("formAgregarListaRaya");
    const formAgregarHerramienta = document.getElementById("formAgregarHerramienta");
    
    // Botones para agregar items a listas
    const nuevoAgregarTrabajador = document.getElementById("nuevoAgregarTrabajador");
    const nuevoAgregarHerramienta = document.getElementById("nuevoAgregarHerramienta");
    
    // Inicialización
    if (modalAgregarActividad) {
        modalAgregarActividad.style.display = "none";
    }
    
    // Evento para mostrar modal de agregar actividad
    if (btnAgregarActividad) {
        btnAgregarActividad.addEventListener("click", () => {
            abrirModalAgregarActividad();
        });
    }
    
    // Eventos para seleccionar tipo de actividad
    if (tiposActividad) {
        tiposActividad.forEach(tipo => {
            tipo.addEventListener("click", () => {
                const tipoActividad = tipo.getAttribute("data-tipo");
                seleccionarTipoActividad(tipoActividad);
            });
        });
    }
    
    // Eventos para cerrar formularios
    if (cerrarFormMaterial) {
        cerrarFormMaterial.addEventListener("click", cerrarModalAgregarActividad);
    }
    
    if (cerrarFormListaRaya) {
        cerrarFormListaRaya.addEventListener("click", cerrarModalAgregarActividad);
    }
    
    if (cerrarFormHerramienta) {
        cerrarFormHerramienta.addEventListener("click", cerrarModalAgregarActividad);
    }
    
    // Eventos para agregar items a listas
    if (nuevoAgregarTrabajador) {
        nuevoAgregarTrabajador.addEventListener("click", () => {
            agregarItemLista("nuevoListaTrabajadores", "Nombre del trabajador");
        });
    }
    
    if (nuevoAgregarHerramienta) {
        nuevoAgregarHerramienta.addEventListener("click", () => {
            agregarItemLista("nuevoListaHerramientas", "Nombre de la herramienta");
        });
    }
    
    // Eventos para envío de formularios
    if (formAgregarMaterial) {
        formAgregarMaterial.addEventListener("submit", (e) => {
            e.preventDefault();
            guardarActividadMaterial();
        });
    }
    
    if (formAgregarListaRaya) {
        formAgregarListaRaya.addEventListener("submit", (e) => {
            e.preventDefault();
            guardarActividadListaRaya();
        });
    }
    
    if (formAgregarHerramienta) {
        formAgregarHerramienta.addEventListener("submit", (e) => {
            e.preventDefault();
            guardarActividadHerramienta();
        });
    }
    
    // Función para abrir el modal de agregar actividad
    function abrirModalAgregarActividad() {
        // Verificar si hay una obra cargada
        if (!window.obraActual) {
            alert("No se ha cargado correctamente la información de la obra");
            return;
        }
        
        // Verificar si la obra está finalizada
        if (window.obraActual.finalizada) {
            alert("No se pueden agregar actividades a una obra finalizada");
            return;
        }
        
        // 1. Ocultar temporalmente la sección de información del proyecto para evitar superposiciones
        const seccionInformacion = document.querySelector(".proyecto-informacion-container");
        if (seccionInformacion) {
            // Guardar el estado actual de visualización
            seccionInformacion.dataset.displayState = seccionInformacion.style.display;
            seccionInformacion.style.display = "none";
        }
        
        // 2. Mostrar selección de tipo de actividad y ocultar formularios
        const seleccionTipoActividad = document.getElementById("seleccionTipoActividad");
        if (seleccionTipoActividad) seleccionTipoActividad.style.display = "block";
        
        const formMaterial = document.getElementById("formMaterial");
        if (formMaterial) formMaterial.style.display = "none";
        
        const formListaRaya = document.getElementById("formListaRaya");
        if (formListaRaya) formListaRaya.style.display = "none";
        
        const formHerramienta = document.getElementById("formHerramienta");
        if (formHerramienta) formHerramienta.style.display = "none";
        
        // 3. Mostrar el modal con un z-index alto
        const modalAgregarActividad = document.getElementById("modalAgregarActividad");
        if (modalAgregarActividad) {
            modalAgregarActividad.style.display = "flex";
            modalAgregarActividad.style.zIndex = "2000"; // Asegurar que esté por encima
        }
        
        // 4. Prevenir scroll del fondo
        document.body.style.overflow = "hidden";
    }
    
    // Función para cerrar el modal
    function cerrarModalAgregarActividad() {
        // 1. Ocultar el modal
        const modalAgregarActividad = document.getElementById("modalAgregarActividad");
        if (modalAgregarActividad) {
            modalAgregarActividad.style.display = "none";
        }
        
        // 2. Restaurar la visualización de la sección de información
        const seccionInformacion = document.querySelector(".proyecto-informacion-container");
        if (seccionInformacion && seccionInformacion.dataset.displayState) {
            seccionInformacion.style.display = seccionInformacion.dataset.displayState;
            delete seccionInformacion.dataset.displayState;
        } else if (seccionInformacion) {
            seccionInformacion.style.display = "block";
        }
        
        // 3. Restaurar scroll
        document.body.style.overflow = "auto";
    }

    function actualizarVisibilidadSecciones() {
        // Asegurar que la sección de información esté visible
        const seccionInformacion = document.querySelector(".proyecto-informacion-container");
        if (seccionInformacion) {
            seccionInformacion.style.display = "block";
        }
        
        // Asegurar que el modal esté oculto
        const modalAgregarActividad = document.getElementById("modalAgregarActividad");
        if (modalAgregarActividad) {
            modalAgregarActividad.style.display = "none";
        }
    }
    
    // Añadir llamada a la función después de cargar datos
    document.addEventListener("DOMContentLoaded", function() {
        // Otras inicializaciones...
        
        // Llamar a esta función después de cargar los datos de la obra
        const urlParams = new URLSearchParams(window.location.search);
        const obraId = urlParams.get('id');
        if (obraId) {
            // Cargar los datos de la obra
            cargarDatosObra(obraId);
            
            // Asegurar que las secciones estén correctamente visibles
            setTimeout(actualizarVisibilidadSecciones, 300);
        }
    });
    
    // Función para seleccionar el tipo de actividad
    function seleccionarTipoActividad(tipo) {
        // Ocultar selección
        seleccionTipoActividad.style.display = "none";
        
        // Mostrar formulario correspondiente
        switch (tipo) {
            case "material":
                formMaterial.style.display = "block";
                break;
            case "listaRaya":
                formListaRaya.style.display = "block";
                // Inicializar lista de trabajadores
                document.getElementById("nuevoListaTrabajadores").innerHTML = "";
                agregarItemLista("nuevoListaTrabajadores", "Nombre del trabajador");
                break;
            case "herramienta":
                formHerramienta.style.display = "block";
                // Inicializar lista de herramientas
                document.getElementById("nuevoListaHerramientas").innerHTML = "";
                agregarItemLista("nuevoListaHerramientas", "Nombre de la herramienta");
                break;
        }
    }
    
    // Función para agregar item a una lista editable
    function agregarItemLista(listaId, placeholder) {
        const lista = document.getElementById(listaId);
        if (!lista) return;
        
        const itemDiv = document.createElement("div");
        itemDiv.className = "lista-editable-item";
        
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholder;
        input.required = true;
        
        const btnEliminar = document.createElement("span");
        btnEliminar.className = "eliminar-item";
        btnEliminar.innerHTML = "×";
        
        // Evento para eliminar item
        btnEliminar.addEventListener("click", () => {
            lista.removeChild(itemDiv);
        });
        
        itemDiv.appendChild(input);
        itemDiv.appendChild(btnEliminar);
        lista.appendChild(itemDiv);
    }
    
    // Función para guardar actividad de material
    function guardarActividadMaterial() {
        // Obtener valores del formulario
        const fechaEntrada = document.getElementById("nuevoFechaEntrada").value;
        const recibio = document.getElementById("nuevoRecibio").value;
        const cantidad = document.getElementById("nuevoCantidad").value;
        const tipoMaterial = document.getElementById("nuevoTipoMaterial").value;
        const gastoMaterial = parseFloat(document.getElementById("nuevoGastoMaterial").value) || 0;
        
        // Validar campos
        if (!fechaEntrada || !recibio || !cantidad || !tipoMaterial || gastoMaterial <= 0) {
            alert("Todos los campos son obligatorios y el gasto debe ser mayor que cero");
            return;
        }
        
        // Crear objeto de actividad
        const actividad = {
            id: generateUniqueId(),
            tipo: "Entrada de Material",
            fecha: fechaEntrada,
            recibio: recibio,
            cantidad: cantidad,
            tipoMaterial: tipoMaterial,
            gasto: gastoMaterial,
            estado: "Completado",
            fechaCreacion: new Date().toISOString()
        };
        
        // Actualizar gastos de materiales
        actualizarGastos("material", gastoMaterial);
        
        // Guardar actividad
        guardarActividad(actividad);
        
        // Actualizar UI de actividades
        actualizarUIActividades(actividad);
        
        // Cerrar modal
        cerrarModalAgregarActividad();
    }
    
    // Función para guardar actividad de lista raya
    function guardarActividadListaRaya() {
        // Obtener valores del formulario
        const fechaCorte = document.getElementById("nuevoFechaCorte").value;
        const responsablePagar = document.getElementById("nuevoResponsablePagar").value;
        const pagado = document.getElementById("nuevoPagado").value;
        const gastoTrabajadores = parseFloat(document.getElementById("nuevoGastoTrabajadores").value) || 0;
        
        // Obtener lista de trabajadores
        const trabajadores = [];
        const trabajadoresInputs = document.querySelectorAll("#nuevoListaTrabajadores .lista-editable-item input");
        trabajadoresInputs.forEach(input => {
            if (input.value.trim()) {
                trabajadores.push(input.value.trim());
            }
        });
        
        // Validar campos
        if (!fechaCorte || !responsablePagar || trabajadores.length === 0 || gastoTrabajadores <= 0) {
            alert("Complete todos los campos requeridos, añada al menos un trabajador y asegúrese de ingresar un gasto válido");
            return;
        }
        
        // Crear objeto de actividad
        const actividad = {
            id: generateUniqueId(),
            tipo: "Lista Raya",
            fecha: fechaCorte,
            responsablePagar: responsablePagar,
            pagado: pagado,
            trabajadores: trabajadores,
            gasto: gastoTrabajadores,
            estado: pagado === "Sí" ? "Completado" : "Pendiente",
            fechaCreacion: new Date().toISOString()
        };
        
        // Actualizar gastos de trabajadores
        actualizarGastos("trabajadores", gastoTrabajadores);
        
        // Guardar actividad
        guardarActividad(actividad);
        
        // Actualizar UI de actividades
        actualizarUIActividades(actividad);
        
        // Cerrar modal
        cerrarModalAgregarActividad();
    }
    
    // Función para guardar actividad de herramienta
    function guardarActividadHerramienta() {
        // Obtener valores del formulario
        const fechaEntrega = document.getElementById("nuevoFechaEntrega").value;
        const responsableEntrega = document.getElementById("nuevoResponsableEntrega").value;
        const responsableRecibe = document.getElementById("nuevoResponsableRecibe").value;
        const gastoHerramientas = parseFloat(document.getElementById("nuevoGastoHerramientas").value) || 0;
        
        // Obtener lista de herramientas
        const herramientas = [];
        const herramientasInputs = document.querySelectorAll("#nuevoListaHerramientas .lista-editable-item input");
        herramientasInputs.forEach(input => {
            if (input.value.trim()) {
                herramientas.push(input.value.trim());
            }
        });
        
        // Validar campos
        if (!fechaEntrega || !responsableEntrega || !responsableRecibe || herramientas.length === 0 || gastoHerramientas <= 0) {
            alert("Complete todos los campos requeridos, añada al menos una herramienta y asegúrese de ingresar un gasto válido");
            return;
        }
        
        // Crear objeto de actividad
        const actividad = {
            id: generateUniqueId(),
            tipo: "Entrada Herramienta",
            fecha: fechaEntrega,
            responsableEntrega: responsableEntrega,
            responsableRecibe: responsableRecibe,
            herramientas: herramientas,
            gasto: gastoHerramientas,
            estado: "Completado",
            fechaCreacion: new Date().toISOString()
        };
        
        // Actualizar gastos de materiales (las herramientas se consideran como material)
        actualizarGastos("material", gastoHerramientas);
        
        // Guardar actividad
        guardarActividad(actividad);
        
        // Actualizar UI de actividades
        actualizarUIActividades(actividad);
        
        // Cerrar modal
        cerrarModalAgregarActividad();
    }
    
    // Función para guardar actividad en localStorage
    function guardarActividad(actividad) {
        // Verificar que existe obraActual
        if (!window.obraActual) return;
        
        // Obtener todas las obras del localStorage
        const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
        
        // Encontrar el índice de la obra actual
        const indice = obrasGuardadas.findIndex(o => o.id === window.obraActual.id);
        
        if (indice !== -1) {
            // Inicializar array de actividades si no existe
            if (!obrasGuardadas[indice].actividades) {
                obrasGuardadas[indice].actividades = [];
            }
            
            // Añadir la nueva actividad
            obrasGuardadas[indice].actividades.push(actividad);
            
            // Actualizar obraActual
            window.obraActual = obrasGuardadas[indice];
            
            // Guardar en localStorage
            localStorage.setItem("obras", JSON.stringify(obrasGuardadas));
            
            // Mostrar mensaje de éxito
            alert(`Actividad "${actividad.tipo}" agregada correctamente`);
            
            // Actualizar información del proyecto
            setTimeout(() => {
                if (typeof window.actualizarInformacionProyecto === 'function') {
                    window.actualizarInformacionProyecto();
                }
            }, 100);
        }
    }
    
    // Función para actualizar gastos de la obra
    function actualizarGastos(tipoGasto, monto) {
        // Verificar que existe obraActual
        if (!window.obraActual) return;
        
        // Obtener todas las obras del localStorage
        const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
        
        // Encontrar el índice de la obra actual
        const indice = obrasGuardadas.findIndex(o => o.id === window.obraActual.id);
        
        if (indice !== -1) {
            // Actualizar gasto según tipo
            if (tipoGasto === "material") {
                obrasGuardadas[indice].gastoMaterial = (parseFloat(obrasGuardadas[indice].gastoMaterial) || 0) + parseFloat(monto);
            } else if (tipoGasto === "trabajadores") {
                obrasGuardadas[indice].gastoTrabajadores = (parseFloat(obrasGuardadas[indice].gastoTrabajadores) || 0) + parseFloat(monto);
            }
            
            // Actualizar obraActual
            window.obraActual = obrasGuardadas[indice];
            
            // Guardar en localStorage
            localStorage.setItem("obras", JSON.stringify(obrasGuardadas));
        }
    }
    
    // Función para actualizar la UI con la nueva actividad
    function actualizarUIActividades(actividad) {
        // Crear la nueva tarjeta de actividad
        const actividadesContainer = document.querySelector(".actividades-container");
        
        if (actividadesContainer) {
            // Crear elemento según el tipo de actividad
            if (actividad.tipo === "Entrada de Material") {
                const tarjeta = document.createElement("div");
                tarjeta.className = "actividad-tarjeta";
                tarjeta.innerHTML = `
                    <div class="actividad-header">
                        <h2>Actividad: ${actividad.tipo}</h2>
                        <p>Fecha de entrada: ${formatearFecha(actividad.fecha)}</p>
                        <p>Recibió: ${actividad.recibio}</p>
                        <p>Cantidad: ${actividad.cantidad}</p>
                        <p>Tipo de material: ${actividad.tipoMaterial}</p>
                        <p>Gasto: $${actividad.gasto.toFixed(2)}</p>
                    </div>
                `;
                // Insertar al inicio del contenedor
                actividadesContainer.insertBefore(tarjeta, actividadesContainer.firstChild);
            } 
            else if (actividad.tipo === "Lista Raya") {
                const tarjeta = document.createElement("div");
                tarjeta.className = "actividad-tarjeta doble";
                
                let trabajadoresHTML = "";
                actividad.trabajadores.forEach(trabajador => {
                    trabajadoresHTML += `<li>${trabajador}</li>`;
                });
                
                tarjeta.innerHTML = `
                    <div class="actividad-izquierda">
                        <div class="actividad-header">
                            <h2>Actividad: ${actividad.tipo}</h2>
                            <p>Fecha de corte: ${formatearFecha(actividad.fecha)}</p>
                            <p>Responsable pagar: ${actividad.responsablePagar}</p>
                            <p>Pagado: ${actividad.pagado}</p>
                            <p>Gasto: $${actividad.gasto.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="actividad-derecha">
                        <div class="actividad-lista">
                            <h2>Trabajadores</h2>
                            <ul>${trabajadoresHTML}</ul>
                        </div>
                    </div>
                `;
                // Insertar al inicio del contenedor
                actividadesContainer.insertBefore(tarjeta, actividadesContainer.firstChild);
            }
            else if (actividad.tipo === "Entrada Herramienta") {
                const tarjeta = document.createElement("div");
                tarjeta.className = "actividad-tarjeta doble";
                
                let herramientasHTML = "";
                actividad.herramientas.forEach(herramienta => {
                    herramientasHTML += `<li>${herramienta}</li>`;
                });
                
                tarjeta.innerHTML = `
                    <div class="actividad-izquierda">
                        <div class="actividad-header">
                            <h2>Actividad: ${actividad.tipo}</h2>
                            <p>Fecha de entrega: ${formatearFecha(actividad.fecha)}</p>
                            <p>Responsable Entrega: ${actividad.responsableEntrega}</p>
                            <p>Responsable Recibe: ${actividad.responsableRecibe}</p>
                            <p>Gasto: $${actividad.gasto.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="actividad-derecha">
                        <div class="actividad-lista">
                            <h2>Herramientas</h2>
                            <ul>${herramientasHTML}</ul>
                        </div>
                    </div>
                `;
                // Insertar al inicio del contenedor
                actividadesContainer.insertBefore(tarjeta, actividadesContainer.firstChild);
            }
        }
    }
    
    // Función auxiliar para formatear fechas
    function formatearFecha(fechaStr) {
        if (!fechaStr) return "Fecha no disponible";
        
        const fecha = new Date(fechaStr);
        if (isNaN(fecha)) return "Fecha inválida";
        
        return fecha.toLocaleDateString();
    }
    
    // Función para generar ID único
    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
});
