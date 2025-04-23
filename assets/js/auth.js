document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar contraseña
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this;
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye-slash');
            icon.classList.toggle('fa-eye');
        });
    }

    // Selector de tipo de usuario
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Actualizar botones activos
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const userType = this.dataset.type;
            document.getElementById('user-type').value = userType;
            
            // Manejar campos administrativos
            const adminFields = document.querySelectorAll('.admin-field');
            const isAdmin = userType === 'admin';
            
            adminFields.forEach(field => {
                const inputs = field.querySelectorAll('input, select');
                if (isAdmin) {
                    field.style.display = 'block';
                    inputs.forEach(input => input.required = true);
                } else {
                    field.style.display = 'none';
                    inputs.forEach(input => input.required = false);
                }
            });
            
            // Actualizar botón de submit
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = isAdmin 
                ? '<i class="fas fa-lock"></i> Acceso Administrativo' 
                : '<i class="fas fa-sign-in-alt"></i> Ingresar';
        });
    });
    
        // Validación del formulario
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
    
                const userType = document.getElementById('user-type').value;
                const nombreUsuario = "Usuario Administrativo"; // Cambiar según el nombre real del usuario
                const requiredFields = ['documento', 'password'];
    
                if (userType === 'admin') {
                    requiredFields.push('codigo-empleado', 'departamento');
                }
    
                // Validar campos requeridos
                for (const fieldId of requiredFields) {
                    const field = document.getElementById(fieldId);
                    if (!field.value.trim()) {
                        mostrarAlerta(`Por favor complete el campo ${field.labels[0].textContent}`, 'error');
                        field.focus();
                        return;
                    }
                }
    
                // Simular autenticación
                mostrarAlerta('Autenticando...', 'success');
                setTimeout(() => {
                    if (userType === 'natural') {
                        localStorage.setItem('usuario', 'Persona Natural');
                        window.location.href = 'index.html';
                    } else if (userType === 'admin') {
                        localStorage.setItem('usuario', nombreUsuario);
                        window.location.href = 'admin-dashboard.html';
                    }
                }, 1500);
            });
        }
    
    function mostrarAlerta(mensaje, tipo) {
        const alertaExistente = document.querySelector('.alerta');
        if (alertaExistente) alertaExistente.remove();
        
        const alerta = document.createElement('div');
        alerta.className = `alerta ${tipo}`;
        alerta.innerHTML = `<p>${mensaje}</p>`;
        document.querySelector('.login-form').prepend(alerta);
        
        setTimeout(() => alerta.remove(), 5000);
    }
});