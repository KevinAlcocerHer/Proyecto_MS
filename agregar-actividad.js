// Código para la funcionalidad de agregar actividad
document.addEventListener("DOMContentLoaded", function() {
    // Elementos DOM para agregar actividad
    const btnAgregarActividad = document.getElementById("btnAgregarActividad");
    const modalAgregarActividad = document.getElementById("modalAgregarActividad");
    const seleccionTipoActividad = document.getElementById("seleccionTipoActividad");
    const formMaterial = document.getElementById("formMaterial");
    const formListaRaya = document.getElementById("formListaRaya");
    const formHerramienta = document.getElementById("formHerramienta");
    
    // Elementos de cierre de formularios
    const cerrarFormMaterial = document.getElementById("cerrarFormMaterial");
    const cerrarFormListaRaya = document.getElementById("cerrarFormListaRaya");
    const cerrarFormHerramienta = document.getElementById("cerrarFormHerramienta");
    
    // Formularios
    const formAgregarMaterial = document.getElementById("formAgregarMaterial");
    const formAgregarListaRaya = document.getElementById("formAgregarListaRaya");
    const formAgregarHerramienta = document.getElementById("formAgregarHerramienta");
    
    // Botones para agregar elementos a listas
    const nuevoAgregarTrabajador = document.getElementById("nuevoAgregarTrabajador");
    const nuevoAgregarHerramienta = document.getElementById("nuevoAgregarHerramienta");
    
    // Asegurarse de que el modal comienza oculto
    if (modalAgregarActividad) {
        modalAgregarActividad.style.display = "none";
    }
    
    // Función para abrir el modal de agregar actividad
    if (btnAgregarActividad) {
        btnAgregarActividad.addEventListener("click", () => {
            if (modalAgregarActividad) {
                // Resetear - mostrar selección de tipo y ocultar formularios
                seleccionTipoActividad.style.display = "block";
                formMaterial.style.display = "none";
                formListaRaya.style.display = "none";
                formHerramienta.style.display = "none";
                
                // Mostrar modal
                modalAgregarActividad.style.display = "flex";
                document.body.style.overflow = "hidden"; // Evitar scroll
            }
        });
    }
    
    // Manejador para selección de tipo de actividad
    if (seleccionTipoActividad) {
        const tiposActividad = seleccionTipoActividad.querySelectorAll(".tipo-actividad");
        
        tiposActividad.forEach(tipo => {
            tipo.addEventListener("click", () => {
                const tipoSeleccionado = tipo.getAttribute("data-tipo");
                
                // Ocultar selección
                seleccionTipoActividad.style.display = "none";
                
                // Mostrar formulario correspondiente
                if (tipoSeleccionado === "material") {
                    formMaterial.style.display = "block";
                    resetFormMaterial();
                } else if (tipoSeleccionado === "listaRaya") {
                    formListaRaya.style.display = "block";
                    resetFormListaRaya();
                } else if (tipoSeleccionado === "herramienta") {
                    formHerramienta.style.display = "block";
                    resetFormHerramienta();
                }
            });
        });
    }
    
    // Funciones para cerrar formularios
    if (cerrarFormMaterial) {
        cerrarFormMaterial.addEventListener("click", cerrarModal);
    }
    
    if (cerrarFormListaRaya) {
        cerrarFormListaRaya.addEventListener("click", cerrarModal);
    }
    
    if (cerrarFormHerramienta) {
        cerrarFormHerramienta.addEventListener("click", cerrarModal);
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", (event) => {
        if (event.target === modalAgregarActividad) {
            cerrarModal();
        }
    });
    
    // Función para cerrar el modal
    function cerrarModal() {
        if (modalAgregarActividad) {
            modalAgregarActividad.style.display = "none";
            document.body.style.overflow = "auto"; // Restaurar scroll
        }
    }
    
    // Agregar trabajador a lista nueva
    if (nuevoAgregarTrabajador) {
        nuevoAgregarTrabajador.addEventListener("click", () => {
            agregarItemEditable("nuevoListaTrabajadores", "");
        });
    }
    
    // Agregar herramienta a lista nueva
    if (nuevoAgregarHerramienta) {
        nuevoAgregarHerramienta.addEventListener("click", () => {
            agregarItemEditable("nuevoListaHerramientas", "");
        });
    }
    
    // Función para agregar item a lista editable
    function agregarItemEditable(listId, valor) {
        const lista = document.getElementById(listId);
        if (!lista) return;
        
        const itemDiv = document.createElement("div");
        itemDiv.className = "lista-editable-item";
        
        const input = document.createElement("input");
        input.type = "text";
        input.value = valor;
        input.required = true;
        
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "eliminar-item";
        deleteBtn.innerHTML = '<i class="bx bx-x"></i>';
        deleteBtn.addEventListener("click", function() {
            // No eliminar si es el único elemento
            if (lista.children.length > 1) {
                lista.removeChild(itemDiv);
            } else {
                input.value = ""; // Limpiar en vez de eliminar
            }
        });
        
        itemDiv.appendChild(input);
        itemDiv.appendChild(deleteBtn);
        lista.appendChild(itemDiv);
        
        // Dar foco al input que se acaba de crear
        input.focus();
    }
    
    // Resetear formularios
    function resetFormMaterial() {
        if (formAgregarMaterial) {
            formAgregarMaterial.reset();
            document.getElementById("nuevoFechaEntrada").valueAsDate = new Date();
        }
    }
    
    function resetFormListaRaya() {
        if (formAgregarListaRaya) {
            formAgregarListaRaya.reset();
            document.getElementById("nuevoFechaCorte").valueAsDate = new Date();
            
            // Limpiar lista de trabajadores
            const listaTrabajadores = document.getElementById("nuevoListaTrabajadores");
            if (listaTrabajadores) {
                listaTrabajadores.innerHTML = "";
                // Agregar al menos un espacio para trabajador
                agregarItemEditable("nuevoListaTrabajadores", "");
            }
        }
    }
    
    function resetFormHerramienta() {
        if (formAgregarHerramienta) {
            formAgregarHerramienta.reset();
            document.getElementById("nuevoFechaEntrega").valueAsDate = new Date();
            
            // Limpiar lista de herramientas
            const listaHerramientas = document.getElementById("nuevoListaHerramientas");
            if (listaHerramientas) {
                listaHerramientas.innerHTML = "";
                // Agregar al menos un espacio para herramienta
                agregarItemEditable("nuevoListaHerramientas", "");
            }
        }
    }
    
    // Manejar envío de formularios
    if (formAgregarMaterial) {
        formAgregarMaterial.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Validar campos
            const fechaEntrada = document.getElementById("nuevoFechaEntrada").value;
            const recibio = document.getElementById("nuevoRecibio").value;
            const cantidad = document.getElementById("nuevoCantidad").value;
            const tipoMaterial = document.getElementById("nuevoTipoMaterial").value;
            
            if (!fechaEntrada || !recibio || !cantidad || !tipoMaterial) {
                alert("Por favor, complete todos los campos");
                return;
            }
            
            // Crear y agregar nueva actividad
            agregarNuevaActividadMaterial(fechaEntrada, recibio, cantidad, tipoMaterial);
            
            // Cerrar modal
            cerrarModal();
        });
    }
    
    if (formAgregarListaRaya) {
        formAgregarListaRaya.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Validar campos
            const fechaCorte = document.getElementById("nuevoFechaCorte").value;
            const responsablePagar = document.getElementById("nuevoResponsablePagar").value;
            const pagado = document.getElementById("nuevoPagado").value;
            
            // Obtener trabajadores
            const trabajadores = [];
            const inputsTrabajadores = document.querySelectorAll('#nuevoListaTrabajadores input');
            let hasTrabajadores = false;
            
            inputsTrabajadores.forEach(input => {
                if (input.value.trim() !== "") {
                    trabajadores.push(input.value.trim());
                    hasTrabajadores = true;
                }
            });
            
            if (!fechaCorte || !responsablePagar || !hasTrabajadores) {
                alert("Por favor, complete todos los campos y agregue al menos un trabajador");
                return;
            }
            
            // Crear y agregar nueva actividad
            agregarNuevaActividadListaRaya(fechaCorte, responsablePagar, pagado, trabajadores);
            
            // Cerrar modal
            cerrarModal();
        });
    }
    
    if (formAgregarHerramienta) {
        formAgregarHerramienta.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Validar campos
            const fechaEntrega = document.getElementById("nuevoFechaEntrega").value;
            const responsableEntrega = document.getElementById("nuevoResponsableEntrega").value;
            const responsableRecibe = document.getElementById("nuevoResponsableRecibe").value;
            
            // Obtener herramientas
            const herramientas = [];
            const inputsHerramientas = document.querySelectorAll('#nuevoListaHerramientas input');
            let hasHerramientas = false;
            
            inputsHerramientas.forEach(input => {
                if (input.value.trim() !== "") {
                    herramientas.push(input.value.trim());
                    hasHerramientas = true;
                }
            });
            
            if (!fechaEntrega || !responsableEntrega || !responsableRecibe || !hasHerramientas) {
                alert("Por favor, complete todos los campos y agregue al menos una herramienta");
                return;
            }
            
            // Crear y agregar nueva actividad
            agregarNuevaActividadHerramienta(fechaEntrega, responsableEntrega, responsableRecibe, herramientas);
            
            // Cerrar modal
            cerrarModal();
        });
    }
    
    // Funciones para agregar nuevas actividades
    function agregarNuevaActividadMaterial(fechaEntrada, recibio, cantidad, tipoMaterial) {
        // Obtener el contenedor de actividades
        const actividadesContainer = document.querySelector(".actividades-container");
        if (!actividadesContainer) return;
        
        // Crear nueva tarjeta de actividad
        const nuevaActividad = document.createElement("div");
        nuevaActividad.className = "actividad-tarjeta";
        
        // Crear el contenido de la actividad
        nuevaActividad.innerHTML = `
            <div class="actividad-header">
                <h2>Actividad: Entrada de Material - ${tipoMaterial}</h2>
                <p>Fecha de entrada: ${formatearFecha(fechaEntrada)}</p>
                <p>Recibió: ${recibio}</p>
                <p>Cantidad: ${cantidad}</p>
            </div>
        `;
        
        // Insertar al principio del contenedor de actividades
        actividadesContainer.insertBefore(nuevaActividad, actividadesContainer.firstChild);
        
        // Guardar en el objeto obraActual si existe
        if (window.obraActual) {
            // Crear un ID único para la actividad
            const actividadId = "act_" + new Date().getTime();
            
            // Guardar datos de la actividad
            const nuevaActividadObj = {
                id: actividadId,
                tipo: "material",
                fechaEntrada: fechaEntrada,
                recibio: recibio,
                cantidad: cantidad,
                tipoMaterial: tipoMaterial
            };
            
            // Inicializar array de actividades si no existe
            if (!window.obraActual.actividades) {
                window.obraActual.actividades = [];
            }
            
            // Agregar la nueva actividad
            window.obraActual.actividades.push(nuevaActividadObj);
            
            // Guardar los cambios
            guardarObraActualizada();
        }
        
        // Mostrar mensaje de éxito
        alert("Actividad de material agregada correctamente");
    }
    
    function agregarNuevaActividadListaRaya(fechaCorte, responsablePagar, pagado, trabajadores) {
        // Obtener el contenedor de actividades
        const actividadesContainer = document.querySelector(".actividades-container");
        if (!actividadesContainer) return;
        
        // Crear nueva tarjeta de actividad
        const nuevaActividad = document.createElement("div");
        nuevaActividad.className = "actividad-tarjeta doble";
        
        // Crear el contenido de la actividad
        let trabajadoresHTML = '';
        trabajadores.forEach(trabajador => {
            trabajadoresHTML += `<li>${trabajador}</li>`;
        });
        
        nuevaActividad.innerHTML = `
            <div class="actividad-izquierda">
                <div class="actividad-header">
                    <h2>Actividad: Lista raya</h2>
                    <p>Fecha de corte: ${formatearFecha(fechaCorte)}</p>
                    <p>Responsable pagar: ${responsablePagar}</p>
                    <p>Pagado: ${pagado}</p>
                </div>
            </div>
            <div class="actividad-derecha">
                <div class="actividad-lista">
                    <h2>Trabajadores</h2>
                    <ul>
                        ${trabajadoresHTML}
                    </ul>
                </div>
            </div>
        `;
        
        // Insertar al principio del contenedor de actividades
        actividadesContainer.insertBefore(nuevaActividad, actividadesContainer.firstChild);
        
        // Guardar en el objeto obraActual si existe
        if (window.obraActual) {
            // Crear un ID único para la actividad
            const actividadId = "act_" + new Date().getTime();
            
            // Guardar datos de la actividad
            const nuevaActividadObj = {
                id: actividadId,
                tipo: "listaRaya",
                fechaCorte: fechaCorte,
                responsablePagar: responsablePagar,
                pagado: pagado,
                trabajadores: trabajadores
            };
            
            // Inicializar array de actividades si no existe
            if (!window.obraActual.actividades) {
                window.obraActual.actividades = [];
            }
            
            // Agregar la nueva actividad
            window.obraActual.actividades.push(nuevaActividadObj);
            
            // Guardar los cambios
            guardarObraActualizada();
        }
        
        // Mostrar mensaje de éxito
        alert("Actividad de lista raya agregada correctamente");
    }
    
    function agregarNuevaActividadHerramienta(fechaEntrega, responsableEntrega, responsableRecibe, herramientas) {
        // Obtener el contenedor de actividades
        const actividadesContainer = document.querySelector(".actividades-container");
        if (!actividadesContainer) return;
        
        // Crear nueva tarjeta de actividad
        const nuevaActividad = document.createElement("div");
        nuevaActividad.className = "actividad-tarjeta doble";
        
        // Crear el contenido de la actividad
        let herramientasHTML = '';
        herramientas.forEach(herramienta => {
            herramientasHTML += `<li>${herramienta}</li>`;
        });
        
        nuevaActividad.innerHTML = `
            <div class="actividad-izquierda">
                <div class="actividad-header">
                    <h2>Actividad: Entrada Herramienta</h2>
                    <p>Fecha de entrega: ${formatearFecha(fechaEntrega)}</p>
                    <p>Responsable Entrega: ${responsableEntrega}</p>
                    <p>Responsable Recibe: ${responsableRecibe}</p>
                </div>
            </div>
            <div class="actividad-derecha">
                <div class="actividad-lista">
                    <h2>Herramientas</h2>
                    <ul>
                        ${herramientasHTML}
                    </ul>
                </div>
            </div>
        `;
        
        // Insertar al principio del contenedor de actividades
        actividadesContainer.insertBefore(nuevaActividad, actividadesContainer.firstChild);
        
        // Guardar en el objeto obraActual si existe
        if (window.obraActual) {
            // Crear un ID único para la actividad
            const actividadId = "act_" + new Date().getTime();
            
            // Guardar datos de la actividad
            const nuevaActividadObj = {
                id: actividadId,
                tipo: "herramienta",
                fechaEntrega: fechaEntrega,
                responsableEntrega: responsableEntrega,
                responsableRecibe: responsableRecibe,
                herramientas: herramientas
            };
            
            // Inicializar array de actividades si no existe
            if (!window.obraActual.actividades) {
                window.obraActual.actividades = [];
            }
            
            // Agregar la nueva actividad
            window.obraActual.actividades.push(nuevaActividadObj);
            
            // Guardar los cambios
            guardarObraActualizada();
        }
        
        // Mostrar mensaje de éxito
        alert("Actividad de herramienta agregada correctamente");
    }
    
    // Función para guardar la obra actualizada en localStorage
    function guardarObraActualizada() {
        if (!window.obraActual) return;
        
        // Obtener todas las obras del localStorage
        const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
        
        // Encontrar el índice de la obra actual
        const indice = obrasGuardadas.findIndex(o => o.id === window.obraActual.id);
        
        if (indice !== -1) {
            // Reemplazar la obra
            obrasGuardadas[indice] = window.obraActual;
            
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
});


