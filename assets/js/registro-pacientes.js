document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroPacientesForm');
    const tablaRegistros = document.getElementById('tablaRegistros');
    const buscarCedula = document.getElementById('buscarCedula');

    // Array para almacenar los registros
    let registros = [];

    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const cedula = document.getElementById('cedula').value.trim();
            const motivo = document.getElementById('motivo').value.trim();
            const tipoUsuario = document.getElementById('tipo-usuario').value;
            const fechaConsulta = document.getElementById('fecha-consulta').value;

            // Validar campos
            if (!nombre || !apellido || !cedula || !motivo || !tipoUsuario || !fechaConsulta) {
                mostrarAlerta('Por favor, complete todos los campos.', 'error');
                return;
            }

            // Crear un objeto con los datos del paciente
            const paciente = {
                nombre,
                apellido,
                cedula,
                motivo,
                tipoUsuario,
                fechaConsulta
            };

            // Agregar el registro al array
            registros.push(paciente);

            // Actualizar la tabla
            actualizarTabla();

            // Mostrar mensaje de éxito
            mostrarAlerta('Paciente registrado exitosamente.', 'success');

            // Reiniciar el formulario
            registroForm.reset();
        });
    }

    // Función para actualizar la tabla
    function actualizarTabla() {
        // Limpiar la tabla
        tablaRegistros.innerHTML = '';

        // Filtrar registros si hay búsqueda
        const filtro = buscarCedula.value.trim();
        const registrosFiltrados = filtro
            ? registros.filter(registro => registro.cedula.includes(filtro))
            : registros;

        // Agregar los registros a la tabla
        registrosFiltrados.forEach(registro => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${registro.nombre}</td>
                <td>${registro.apellido}</td>
                <td>${registro.cedula}</td>
                <td>${registro.motivo}</td>
                <td>${registro.tipoUsuario}</td>
                <td>${registro.fechaConsulta}</td>
            `;
            tablaRegistros.appendChild(fila);
        });
    }

    // Evento para buscar por cédula
    buscarCedula.addEventListener('input', actualizarTabla);

    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
        const alertaExistente = document.querySelector('.alerta');
        if (alertaExistente) alertaExistente.remove();

        const alerta = document.createElement('div');
        alerta.className = `alerta ${tipo}`;
        alerta.innerHTML = `<p>${mensaje}</p>`;
        document.querySelector('.registro-form').prepend(alerta);

        setTimeout(() => alerta.remove(), 5000);
    }
});