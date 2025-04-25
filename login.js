// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del formulario
    const loginForm = document.querySelector('.form');
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');
    const submitButton = document.querySelector('button[type="submit"]');

    // Variables para almacenar credenciales demo
    const credencialesDemo = [
        { usuario: 'admin', contrasena: 'admin123' },
        { usuario: 'cees ', contrasena: 'cees' }
        
        
    ];

    // Función para validar el formulario
    function validarFormulario(usuario, contrasena) {
        // Validar que los campos no estén vacíos
        if (!usuario || !contrasena) {
            return { valido: false, mensaje: 'Por favor complete todos los campos.' };
        }
        
        // Simulación de autenticación con credenciales demo
        const usuarioEncontrado = credencialesDemo.find(
            cred => cred.usuario === usuario && cred.contrasena === contrasena
        );
        
        if (usuarioEncontrado) {
            return { valido: true, mensaje: 'Credenciales válidas!' };
        } else {
            return { valido: false, mensaje: 'Usuario o contraseña incorrectos.' };
        }
    }
    
    // Función para mostrar mensajes de error o éxito
    function mostrarMensaje(mensaje, tipo) {
        // Eliminar mensajes anteriores
        const mensajesAnteriores = document.querySelectorAll('.mensaje-alerta');
        mensajesAnteriores.forEach(msg => msg.remove());
        
        // Crear el elemento para el mensaje
        const mensajeElement = document.createElement('div');
        mensajeElement.className = `mensaje-alerta ${tipo}`;
        mensajeElement.textContent = mensaje;
        
        // Insertar el mensaje después del fieldset
        const fieldset = document.querySelector('fieldset');
        fieldset.insertAdjacentElement('afterend', mensajeElement);
        
        // Estilos para el mensaje
        mensajeElement.style.margin = '10px 20px';
        mensajeElement.style.padding = '8px 12px';
        mensajeElement.style.borderRadius = '4px';
        mensajeElement.style.fontSize = '0.9em';
        
        // Estilos específicos según el tipo de mensaje
        if (tipo === 'error') {
            mensajeElement.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            mensajeElement.style.color = '#d32f2f';
            mensajeElement.style.border = '1px solid #d32f2f';
        } else if (tipo === 'exito') {
            mensajeElement.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
            mensajeElement.style.color = '#388e3c';
            mensajeElement.style.border = '1px solid #388e3c';
        }
        
        // Eliminar el mensaje después de 5 segundos
        setTimeout(() => {
            mensajeElement.remove();
        }, 5000);
    }
    
    // Función para redirigir al sistema después de inicio de sesión exitoso
    function redirigirAlSistema() {
        // Cambiar estado del botón
        submitButton.disabled = true;
        submitButton.textContent = 'Ingresando...';
        
        // Simulación de carga y luego redirección
        setTimeout(() => {
            // Redirección a la página del sistema
            window.location.href = 'obras.html'; // Reemplaza con la ruta a tu página HTML
            
            // Nota: El código después de la redirección no se ejecutará
            // ya que el navegador cargará la nueva página
        }, 1500);
    }
    
    // Manejar el evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
        // Prevenir el comportamiento predeterminado del formulario
        event.preventDefault();
        
        // Obtener valores de los campos
        const usuario = usuarioInput.value.trim();
        const contrasena = contrasenaInput.value.trim();
        
        // Validar el formulario
        const resultado = validarFormulario(usuario, contrasena);
        
        if (resultado.valido) {
            mostrarMensaje(resultado.mensaje, 'exito');
            redirigirAlSistema();
        } else {
            mostrarMensaje(resultado.mensaje, 'error');
            // Hacer vibrar el formulario para indicar error
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });
    
    // Añadir animación de vibración al CSS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .form_input input:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
        }
        
        button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Manejar el evento de enlace de contraseña olvidada
    const forgotPasswordLink = document.querySelector('.forgot-password a');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('En un sistema real, aquí se abriría un formulario para recuperar la contraseña.');
        });
    }
    
    // Manejar el evento de enlace de registro
    const registerLink = document.querySelector('.register-link a');
    if (registerLink) {
        registerLink.addEventListener('click', function(event) {
            event.preventDefault();
            alert('En un sistema real, aquí se redireccionaría a la página de registro.');
        });
    }
});
