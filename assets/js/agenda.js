document.addEventListener('DOMContentLoaded', function() {
    const seguimientoForm = document.getElementById('seguimientoForm');
    const historialClinicoForm = document.getElementById('historialClinicoForm');
    const tablaSeguimiento = document.getElementById('tablaSeguimiento');
    const tablaHistorialClinico = document.getElementById('tablaHistorialClinico');
    const calendarEl = document.getElementById('calendar');

    // Arrays para almacenar los registros
    let seguimientos = [];
    let historialesClinicos = [];

    // Registrar seguimiento
    if (seguimientoForm) {
        seguimientoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cedula = document.getElementById('cedula-usuario').value.trim();
            const servicio = document.getElementById('servicio-utilizado').value;

            if (!cedula || !servicio) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            const registro = {
                cedula,
                servicio,
                fecha: new Date().toLocaleDateString()
            };

            seguimientos.push(registro);
            actualizarTablaSeguimiento();
            seguimientoForm.reset();
        });
    }

    // Registrar historial clínico
    if (historialClinicoForm) {
        historialClinicoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const cedula = document.getElementById('cedula-clinico').value.trim();
            const anotaciones = document.getElementById('anotaciones').value.trim();

            if (!cedula || !anotaciones) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            const registro = {
                cedula,
                anotaciones,
                fecha: new Date().toLocaleDateString()
            };

            historialesClinicos.push(registro);
            actualizarTablaHistorialClinico();
            historialClinicoForm.reset();
        });
    }

    // Actualizar tabla de seguimiento
    function actualizarTablaSeguimiento() {
        tablaSeguimiento.innerHTML = '';
        seguimientos.forEach(registro => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${registro.cedula}</td>
                <td>${registro.servicio}</td>
                <td>${registro.fecha}</td>
            `;
            tablaSeguimiento.appendChild(fila);
        });
    }

    // Actualizar tabla de historial clínico
    function actualizarTablaHistorialClinico() {
        tablaHistorialClinico.innerHTML = '';
        historialesClinicos.forEach(registro => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${registro.cedula}</td>
                <td>${registro.anotaciones}</td>
                <td>${registro.fecha}</td>
            `;
            tablaHistorialClinico.appendChild(fila);
        });
    }
   
    // Inicializar FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek', // Vista semanal
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
        },
        locale: 'es', // Idioma español
        events: [
            {
                title: 'Consulta Psicológica',
                start: '2025-05-01T10:00:00',
                end: '2025-05-01T11:00:00',
                description: 'Cita con el psicólogo Juan Pérez'
            },
            {
                title: 'Sesiones de mindfulness guiadas',
                start: '2025-05-02T09:00:00',
                end: '2025-05-02T10:00:00',
                description: 'Ejercicio de respiración y atención plena'
            },
            {
                title: 'Aromaterapia personalizada',
                start: '2025-05-03T15:00:00',
                end: '2025-05-03T15:45:00',
                description: 'Aplicación de aceites esenciales según diagnóstico'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-05T11:30:00',
                end: '2025-05-05T12:30:00',
                description: 'Sesión de seguimiento con la psicóloga Ana Gómez'
            },
            {
                title: 'Musicoterapia receptiva',
                start: '2025-05-06T14:00:00',
                end: '2025-05-06T14:45:00',
                description: 'Escucha guiada para reducir el estrés'
            },
            {
                title: 'Técnicas de regulación conductual',
                start: '2025-05-08T13:00:00',
                end: '2025-05-08T14:00:00',
                description: 'Entrenamiento en autocontrol y refuerzo positivo'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-09T10:00:00',
                end: '2025-05-09T11:00:00',
                description: 'Intervención para manejo de ansiedad con el psicólogo Carlos Ruiz'
            },
            {
                title: 'Sesiones de psicoeducación',
                start: '2025-05-10T12:00:00',
                end: '2025-05-10T13:00:00',
                description: 'Educación emocional y habilidades sociales'
            },
            {
                title: 'Estrategias de regulación emocional',
                start: '2025-05-13T15:30:00',
                end: '2025-05-13T16:30:00',
                description: 'Identificación y expresión de emociones'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-14T09:00:00',
                end: '2025-05-14T10:00:00',
                description: 'Sesión individual con el psicólogo Carlos Ruiz'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-16T14:30:00',
                end: '2025-05-16T15:30:00',
                description: 'Seguimiento del plan de tratamiento con la psicóloga Ana Gómez'
            },
            {
                title: 'Sesiones de mindfulness guiadas',
                start: '2025-05-17T08:30:00',
                end: '2025-05-17T09:30:00',
                description: 'Relajación guiada y meditación consciente'
            },
            {
                title: 'Aromaterapia personalizada',
                start: '2025-05-20T16:00:00',
                end: '2025-05-20T16:45:00',
                description: 'Tratamiento complementario con aromas relajantes'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-21T11:00:00',
                end: '2025-05-21T12:00:00',
                description: 'Atención personalizada con el psicólogo Juan Pérez'
            },
            {
                title: 'Técnicas de regulación conductual',
                start: '2025-05-23T13:30:00',
                end: '2025-05-23T14:30:00',
                description: 'Sesión práctica sobre modificación de conducta'
            },
            {
                title: 'Musicoterapia receptiva',
                start: '2025-05-24T15:00:00',
                end: '2025-05-24T15:45:00',
                description: 'Sesión musical enfocada en relajación'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-27T09:30:00',
                end: '2025-05-27T10:30:00',
                description: 'Evaluación clínica de avance con la psicóloga Ana Gómez'
            },
            {
                title: 'Estrategias de regulación emocional',
                start: '2025-05-28T14:00:00',
                end: '2025-05-28T15:00:00',
                description: 'Manejo del estrés y técnicas de afrontamiento'
            },
            {
                title: 'Consulta Psicológica',
                start: '2025-05-30T10:00:00',
                end: '2025-05-30T11:00:00',
                description: 'Cierre de proceso terapéutico con el psicólogo Juan Pérez'
            }
        ],
        eventClick: function(info) {
            // Mostrar detalles de la cita al hacer clic
            alert(`Cita: ${info.event.title}\nDescripción: ${info.event.extendedProps.description}`);
        }
    });

    // Renderizar el calendario
    calendar.render();
});