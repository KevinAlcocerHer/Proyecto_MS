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

    modalEditar.style.display = "none";

// Arreglar la visibilidad del botón de editar
btnEditar.style.display = "flex";

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

// Reemplaza la función agregarItemEditable con esta versión mejorada
function agregarItemEditable(listId, valor) {
    const lista = document.getElementById(listId);
    
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

// Mejorar la validación del formulario antes de enviar
formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Validar que al menos un trabajador y una herramienta estén presentes
    const trabajadoresInputs = document.querySelectorAll('#listaTrabajadoresEditable input');
    const herramientasInputs = document.querySelectorAll('#listaHerramientasEditable input');
    
    let trabajadoresValidos = false;
    let herramientasValidas = false;
    
    trabajadoresInputs.forEach(input => {
        if (input.value.trim() !== "") {
            trabajadoresValidos = true;
        }
    });
    
    herramientasInputs.forEach(input => {
        if (input.value.trim() !== "") {
            herramientasValidas = true;
        }
    });
    
    if (!trabajadoresValidos) {
        alert("Debe agregar al menos un trabajador");
        return;
    }
    
    if (!herramientasValidas) {
        alert("Debe agregar al menos una herramienta");
        return;
    }
    
    guardarCambiosObra();
});

// Mejorar la función guardarCambiosObra para asegurarse de que las fechas son válidas
function guardarCambiosObra() {
    if (!obraActual) return;
    
    // Obtener valores del formulario
    const nombre = document.getElementById("editNombre").value;
    const ubicacion = document.getElementById("editUbicacion").value;
    const fechaInicio = document.getElementById("editFechaInicio").value;
    const fechaFin = document.getElementById("editFechaFin").value;
    
    // Validar que la fecha de fin sea posterior a la fecha de inicio
    if (new Date(fechaFin) < new Date(fechaInicio)) {
        alert("La fecha de finalización debe ser posterior a la fecha de inicio");
        return;
    }
    
    const gastoMaterial = document.getElementById("editGastoMaterial").value;
    const gastoTrabajadores = document.getElementById("editGastoTrabajadores").value;
    
    // Validar que los gastos sean números positivos
    if (parseFloat(gastoMaterial) < 0 || parseFloat(gastoTrabajadores) < 0) {
        alert("Los gastos no pueden ser negativos");
        return;
    }
    
    // Continuar con el resto de la función original...
    // Actividad: Entrada de Material
    const fechaEntrada = document.getElementById("editFechaEntrada").value;
    const recibio = document.getElementById("editRecibio").value;
    const cantidad = document.getElementById("editCantidad").value;
    
    // Actividad: Lista raya
    const fechaCorte = document.getElementById("editFechaCorte").value;
    const responsablePagar = document.getElementById("editResponsablePagar").value;
    const pagado = document.getElementById("editPagado").value;
    
    // Actividad: Entrada Herramienta
    const fechaEntrega = document.getElementById("editFechaEntrega").value;
    const responsableEntrega = document.getElementById("editResponsableEntrega").value;
    const responsableRecibe = document.getElementById("editResponsableRecibe").value;
    
    // Obtener trabajadores
    const trabajadores = [];
    const inputsTrabajadores = document.querySelectorAll('#listaTrabajadoresEditable input');
    inputsTrabajadores.forEach(input => {
        if (input.value.trim() !== "") {
            trabajadores.push(input.value.trim());
        }
    });
    
    // Obtener herramientas
    const herramientas = [];
    const inputsHerramientas = document.querySelectorAll('#listaHerramientasEditable input');
    inputsHerramientas.forEach(input => {
        if (input.value.trim() !== "") {
            herramientas.push(input.value.trim());
        }
    });
    
    // Actualizar objeto obra
    obraActual.nombre = nombre;
    obraActual.ubicacion = ubicacion;
    obraActual.fechaInicio = fechaInicio;
    obraActual.fechaFin = fechaFin;
    obraActual.gastoMaterial = gastoMaterial;
    obraActual.gastoTrabajadores = gastoTrabajadores;
    
    // Actividades
    obraActual.fechaEntrada = fechaEntrada;
    obraActual.recibio = recibio;
    obraActual.cantidad = cantidad;
    
    obraActual.fechaCorte = fechaCorte;
    obraActual.responsablePagar = responsablePagar;
    obraActual.pagado = pagado;
    
    obraActual.fechaEntrega = fechaEntrega;
    obraActual.responsableEntrega = responsableEntrega;
    obraActual.responsableRecibe = responsableRecibe;
    
    // Listas
    obraActual.trabajadores = trabajadores;
    obraActual.herramientas = herramientas;
    
    // Guardar en localStorage
    guardarObraActualizada();
    
    // Actualizar la vista
    cargarDatosObra(obraActual.id);
    
    // Cerrar el modal
    modalEditar.style.display = "none";
    document.body.style.overflow = "auto"; // Restaurar scroll
    
    // Mostrar mensaje de éxito
    alert("Obra actualizada correctamente");
}
    // Variables globales
    let obraActual = null;

    // Manejar el botón de regreso
    btnRegresar.addEventListener("click", () => {
        window.location.href = "obras.html"; // Regresar a la página principal
    });

    // Manejar el botón de editar
    btnEditar.addEventListener("click", () => {
        cargarDatosFormularioEdicion();
        modalEditar.style.display = "flex";
    });

    // Cerrar modal de edición
    cerrarModalEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", (event) => {
        if (event.target === modalEditar) {
            modalEditar.style.display = "none";
        }
    });

    // Manejar envío del formulario de edición
    formEditar.addEventListener("submit", (e) => {
        e.preventDefault();
        guardarCambiosObra();
    });

    // Agregar trabajador a la lista editable
    document.getElementById("agregarTrabajador").addEventListener("click", () => {
        agregarItemEditable("listaTrabajadoresEditable", "");
    });

    // Agregar herramienta a la lista editable
    document.getElementById("agregarHerramienta").addEventListener("click", () => {
        agregarItemEditable("listaHerramientasEditable", "");
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

    // Función para cargar los datos de la obra
    function cargarDatosObra(id) {
        // Obtener todas las obras del localStorage
        const obrasGuardadas = JSON.parse(localStorage.getItem("obras")) || [];
        
        // Buscar la obra por su ID
        const obra = obrasGuardadas.find(o => o.id === id);
        
        if (obra) {
            // Guardar la obra actual en variable global
            obraActual = obra;
            
            // Rellenar los datos en la página
            document.title = "Obra: " + obra.nombre + " | TecnoBuild";
            document.getElementById("obraTitulo").innerHTML = `Obra: <span>${obra.nombre}</span>`;
            
            if (obra.imagen) {
                document.getElementById("obraImagen").src = obra.imagen;
            }
            
            document.getElementById("obraUbicacion").textContent = obra.ubicacion || "Ubicación no disponible";
            
            const fechaInicio = obra.fechaInicio ? new Date(obra.fechaInicio).toLocaleDateString() : "Fecha no disponible";
            const fechaFin = obra.fechaFin ? new Date(obra.fechaFin).toLocaleDateString() : "Fecha no disponible";
            document.getElementById("obraFechas").textContent = `${fechaInicio} - ${fechaFin}`;
            
            document.getElementById("obraGastoMaterial").textContent = `Total gastos material: $${obra.gastoMaterial || 0}`;
            document.getElementById("obraGastoTrabajadores").textContent = `Total gastos trabajadores: $${obra.gastoTrabajadores || 0}`;
            
            // Calcular progreso
            const hoy = new Date();
            const inicio = obra.fechaInicio ? new Date(obra.fechaInicio) : new Date();
            const fin = obra.fechaFin ? new Date(obra.fechaFin) : new Date();
            
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
            document.getElementById("fechaEntrada").textContent = `Fecha de entrada: ${obra.fechaEntrada ? new Date(obra.fechaEntrada).toLocaleDateString() : fechaAleatoria()}`;
            document.getElementById("recibio").textContent = `Recibió: ${obra.recibio || "Nombre no registrado"}`;
            document.getElementById("cantidad").textContent = `Cantidad: ${obra.cantidad || Math.floor(Math.random() * 100) + 1}`;
            
            document.getElementById("fechaCorte").textContent = `Fecha de corte: ${obra.fechaCorte ? new Date(obra.fechaCorte).toLocaleDateString() : fechaAleatoria()}`;
            document.getElementById("responsablePagar").textContent = `Responsable pagar: ${obra.responsablePagar || obra.responsable || "No asignado"}`;
            document.getElementById("pagado").textContent = `Pagado: ${obra.pagado || (Math.random() > 0.5 ? "Sí" : "No")}`;
            
            document.getElementById("fechaEntrega").textContent = `Fecha de entrega: ${obra.fechaEntrega ? new Date(obra.fechaEntrega).toLocaleDateString() : fechaAleatoria()}`;
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
            window.location.href = "obras.html"; // Redirigir si no se encuentra
        }
    }

    // Cargar datos en el formulario de edición
    function cargarDatosFormularioEdicion() {
        if (!obraActual) return;
        
        // Información general
        document.getElementById("editNombre").value = obraActual.nombre || "";
        document.getElementById("editUbicacion").value = obraActual.ubicacion || "";
        document.getElementById("editFechaInicio").value = obraActual.fechaInicio || "";
        document.getElementById("editFechaFin").value = obraActual.fechaFin || "";
        document.getElementById("editGastoMaterial").value = obraActual.gastoMaterial || 0;
        document.getElementById("editGastoTrabajadores").value = obraActual.gastoTrabajadores || 0;
        
        // Actividad: Entrada de Material
        document.getElementById("editFechaEntrada").value = obraActual.fechaEntrada || "";
        document.getElementById("editRecibio").value = obraActual.recibio || "";
        document.getElementById("editCantidad").value = obraActual.cantidad || 0;
        
        // Actividad: Lista raya
        document.getElementById("editFechaCorte").value = obraActual.fechaCorte || "";
        document.getElementById("editResponsablePagar").value = obraActual.responsablePagar || "";
        document.getElementById("editPagado").value = obraActual.pagado || "No";
        
        // Actividad: Entrada Herramienta
        document.getElementById("editFechaEntrega").value = obraActual.fechaEntrega || "";
        document.getElementById("editResponsableEntrega").value = obraActual.responsableEntrega || "";
        document.getElementById("editResponsableRecibe").value = obraActual.responsableRecibe || "";
        
        // Trabajadores
        const listaTrabajadoresEditable = document.getElementById("listaTrabajadoresEditable");
        listaTrabajadoresEditable.innerHTML = "";
        
        if (obraActual.trabajadores && obraActual.trabajadores.length > 0) {
            obraActual.trabajadores.forEach(trabajador => {
                agregarItemEditable("listaTrabajadoresEditable", trabajador);
            });
        } else {
            // Añadir al menos un campo vacío
            agregarItemEditable("listaTrabajadoresEditable", "");
        }
        
        // Herramientas
        const listaHerramientasEditable = document.getElementById("listaHerramientasEditable");
        listaHerramientasEditable.innerHTML = "";
        
        if (obraActual.herramientas && obraActual.herramientas.length > 0) {
            obraActual.herramientas.forEach(herramienta => {
                agregarItemEditable("listaHerramientasEditable", herramienta);
            });
        } else {
            // Añadir al menos un campo vacío
            agregarItemEditable("listaHerramientasEditable", "");
        }
    }

    // Función para agregar un elemento a una lista editable
    function agregarItemEditable(listId, valor) {
        const lista = document.getElementById(listId);
        
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
    }

    // Función para guardar los cambios de la obra
    function guardarCambiosObra() {
        if (!obraActual) return;
        
        // Obtener valores del formulario
        const nombre = document.getElementById("editNombre").value;
        const ubicacion = document.getElementById("editUbicacion").value;
        const fechaInicio = document.getElementById("editFechaInicio").value;
        const fechaFin = document.getElementById("editFechaFin").value;
        const gastoMaterial = document.getElementById("editGastoMaterial").value;
        const gastoTrabajadores = document.getElementById("editGastoTrabajadores").value;
        
        // Actividad: Entrada de Material
        const fechaEntrada = document.getElementById("editFechaEntrada").value;
        const recibio = document.getElementById("editRecibio").value;
        const cantidad = document.getElementById("editCantidad").value;
        
        // Actividad: Lista raya
        const fechaCorte = document.getElementById("editFechaCorte").value;
        const responsablePagar = document.getElementById("editResponsablePagar").value;
        const pagado = document.getElementById("editPagado").value;
        
        // Actividad: Entrada Herramienta
        const fechaEntrega = document.getElementById("editFechaEntrega").value;
        const responsableEntrega = document.getElementById("editResponsableEntrega").value;
        const responsableRecibe = document.getElementById("editResponsableRecibe").value;
        
        // Obtener trabajadores
        const trabajadores = [];
        const inputsTrabajadores = document.querySelectorAll('#listaTrabajadoresEditable input');
        inputsTrabajadores.forEach(input => {
            if (input.value.trim() !== "") {
                trabajadores.push(input.value.trim());
            }
        });
        
        // Obtener herramientas
        const herramientas = [];
        const inputsHerramientas = document.querySelectorAll('#listaHerramientasEditable input');
        inputsHerramientas.forEach(input => {
            if (input.value.trim() !== "") {
                herramientas.push(input.value.trim());
            }
        });
        
        // Actualizar objeto obra
        obraActual.nombre = nombre;
        obraActual.ubicacion = ubicacion;
        obraActual.fechaInicio = fechaInicio;
        obraActual.fechaFin = fechaFin;
        obraActual.gastoMaterial = gastoMaterial;
        obraActual.gastoTrabajadores = gastoTrabajadores;
        
        // Actividades
        obraActual.fechaEntrada = fechaEntrada;
        obraActual.recibio = recibio;
        obraActual.cantidad = cantidad;
        
        obraActual.fechaCorte = fechaCorte;
        obraActual.responsablePagar = responsablePagar;
        obraActual.pagado = pagado;
        
        obraActual.fechaEntrega = fechaEntrega;
        obraActual.responsableEntrega = responsableEntrega;
        obraActual.responsableRecibe = responsableRecibe;
        
        // Listas
        obraActual.trabajadores = trabajadores;
        obraActual.herramientas = herramientas;
        
        // Guardar en localStorage
        guardarObraActualizada();
        
        // Actualizar la vista
        cargarDatosObra(obraActual.id);
        
        // Cerrar el modal
        modalEditar.style.display = "none";
        
        // Mostrar mensaje de éxito
        alert("Obra actualizada correctamente");
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

    // Función auxiliar para generar una fecha aleatoria en el último año
    function fechaAleatoria() {
        const hoy = new Date();
        const diasAtras = Math.floor(Math.random() * 365);
        const fecha = new Date(hoy);
        fecha.setDate(hoy.getDate() - diasAtras);
        return fecha.toLocaleDateString();
    }
});