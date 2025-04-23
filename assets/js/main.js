document.addEventListener('DOMContentLoaded', function() {
    // Manejo del formulario de contacto
    const formulario = document.getElementById('formulario-contacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación simple
            if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
                mostrarAlerta('Por favor completa todos los campos obligatorios', 'error');
                return;
            }
            
            // En una aplicación real, aquí enviarías los datos a un servidor
            // Como es solo frontend, mostraremos un mensaje de confirmación
            mostrarAlerta(`¡Gracias ${nombre} por tu mensaje! Te contactaremos pronto en ${email}.`, 'success');
            formulario.reset();
        });
    }
    
    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
        // Crear elemento de alerta
        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alerta ${tipo}`;
        alertaDiv.textContent = mensaje;
        
        // Añadir al DOM
        const contactoSection = document.getElementById('contacto');
        contactoSection.insertBefore(alertaDiv, contactoSection.firstChild);
        
        // Eliminar después de 5 segundos
        setTimeout(() => {
            alertaDiv.remove();
        }, 5000);
    }
    
    // Scroll suave para los enlaces de navegación
    const menuLinks = document.querySelectorAll('.menu a, .footer-links a, .btn-conocenos');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                event.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de entrada para secciones
    const secciones = document.querySelectorAll('section');
    const elementos = document.querySelectorAll('.fade-in');
    
    // Función para verificar si un elemento está en el viewport
    function esVisible(elemento) {
        const rect = elemento.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight * 0.75 && 
            rect.bottom >= 0
        );
    }
    
    // Función para aplicar animaciones al hacer scroll
    function animarScrollElements() {
        // Animar secciones
        secciones.forEach(seccion => {
            if (esVisible(seccion)) {
                seccion.classList.add('visible');
            }
        });
        
        // Animar elementos individuales
        elementos.forEach(elemento => {
            if (esVisible(elemento)) {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Iniciar animaciones al cargar la página
    animarScrollElements();
    
    // Animar al hacer scroll
    window.addEventListener('scroll', animarScrollElements);
    
    // Manejo del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en cualquier enlace
        document.querySelectorAll('.menu a').forEach(enlace => {
            enlace.addEventListener('click', function() {
                menu.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.menu') && !event.target.closest('.menu-toggle')) {
                menu.classList.remove('active');
            }
        });
    }
    
    // Añadir reglas de estilo para las alertas
    const estiloAlerta = document.createElement('style');
    estiloAlerta.textContent = `
        .alerta {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            text-align: center;
            animation: fadeIn 0.5s;
        }
        
        .success {
            background-color: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }
        
        .error {
            background-color: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(estiloAlerta);
    
    // Efecto parallax para el hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            if (scrollPos < window.innerHeight) {
                heroSection.style.backgroundPositionY = `${scrollPos * 0.5}px`;
            }
        });
    }
    
    // Añadir efectos hover para los servicios
    const servicios = document.querySelectorAll('.servicio');
    servicios.forEach(servicio => {
        servicio.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#7DB9A3';
        });
        
        servicio.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#94C4B2';
        });
    });
    
    // Añadir contador de caracteres al textarea
    const textarea = document.getElementById('mensaje');
    if (textarea) {
        // Crear elemento contador
        const contadorDiv = document.createElement('div');
        contadorDiv.className = 'contador-caracteres';
        contadorDiv.style.textAlign = 'right';
        contadorDiv.style.fontSize = '0.8rem';
        contadorDiv.style.color = '#666';
        contadorDiv.style.marginTop = '5px';
        
        // Insertar después del textarea
        textarea.parentNode.insertBefore(contadorDiv, textarea.nextSibling);
        
        // Actualizar contador
        function actualizarContador() {
            const caracteres = textarea.value.length;
            contadorDiv.textContent = `${caracteres} caracteres`;
            
            // Cambiar color cuando se acerca al límite
            if (caracteres > 200) {
                contadorDiv.style.color = '#E8985B';
            } else {
                contadorDiv.style.color = '#666';
            }
        }
        
        // Eventos para actualizar contador
        textarea.addEventListener('input', actualizarContador);
        actualizarContador(); // Inicializar
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Mostrar nombre del usuario si está autenticado
        const usuarioInfo = document.getElementById('usuario-info');
        const nombreUsuario = document.getElementById('nombre-usuario');
        const cerrarSesionBtn = document.getElementById('cerrar-sesion');
        const loginBtn = document.getElementById('login-btn');
    
        // Obtener el nombre del usuario desde localStorage
        const usuario = localStorage.getItem('usuario');
    
        if (usuario) {
            // Mostrar el contenedor de usuario y ocultar el botón de iniciar sesión
            usuarioInfo.style.display = 'flex';
            nombreUsuario.textContent = `Hola, ${usuario}`;
            loginBtn.style.display = 'none';
        } else {
            // Si no hay usuario, mostrar el botón de iniciar sesión y ocultar el contenedor de usuario
            usuarioInfo.style.display = 'none';
            loginBtn.style.display = 'inline-block';
        }
    
        // Manejar cierre de sesión
        cerrarSesionBtn.addEventListener('click', function() {
            localStorage.removeItem('usuario'); // Eliminar el usuario del almacenamiento local
            window.location.reload(); // Recargar la página para actualizar la interfaz
        });
    });
});