document.addEventListener('DOMContentLoaded', function() {
    const triajeForm = document.getElementById('triageForm');

    if (triajeForm) {
        triajeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            evaluarTriaje();
        });
    }

    function evaluarTriaje() {
        // Contadores para cada nivel de triaje
        let triajeI = 0;
        let triajeII = 0;
        let triajeIII = 0;
        let triajeIV = 0;

        // Evaluar Triaje I (cualquier respuesta positiva)
        const triajeIPreguntas = ['triage1_q1', 'triage1_q2', 'triage1_q3', 'triage1_q4', 'triage1_q5', 'triage1_q6', 'triage1_q7', 'triage1_q8'];
        triajeIPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triajeI++;
            }
        });

        // Evaluar Triaje II (mínimo 3 respuestas positivas)
        const triajeIIPreguntas = ['triage2_q1', 'triage2_q2', 'triage2_q3', 'triage2_q4', 'triage2_q5', 'triage2_q6', 'triage2_q7', 'triage2_q8'];
        triajeIIPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triajeII++;
            }
        });

        // Evaluar Triaje III (mínimo 3 respuestas positivas)
        const triajeIIIPreguntas = ['triage3_q1', 'triage3_q2', 'triage3_q3', 'triage3_q4', 'triage3_q5', 'triage3_q6', 'triage3_q7', 'triage3_q8'];
        triajeIIIPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triajeIII++;
            }
        });

        // Evaluar Triaje IV (mínimo 4 respuestas positivas)
        const triajeIVPreguntas = ['triage4_q1', 'triage4_q2', 'triage4_q3', 'triage4_q4', 'triage4_q5', 'triage4_q6', 'triage4_q7', 'triage4_q8'];
        triajeIVPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triajeIV++;
            }
        });

        // Determinar el nivel de triaje
        let resultado = '';
        let tiempoAtencion = '';
        let clase = '';

        if (triajeI > 0) {
            resultado = 'Triaje I - Emergencia';
            tiempoAtencion = 'Atención Inmediata';
            clase = 'emergencia';
        } else if (triajeII >= 3) {
            resultado = 'Triaje II - Urgencia';
            tiempoAtencion = '15 minutos';
            clase = 'urgencia';
        } else if (triajeIII >= 3) {
            resultado = 'Triaje III - Consulta Prioritaria';
            tiempoAtencion = '30-40 minutos';
            clase = 'prioritaria';
        } else if (triajeIV >= 4) {
            resultado = 'Triaje IV - Consulta Externa';
            tiempoAtencion = '120 minutos';
            clase = 'externa';
        } else {
            resultado = 'No se puede determinar el nivel de triaje';
            tiempoAtencion = 'Por favor, complete todas las preguntas';
            clase = 'indeterminado';
        }

        mostrarResultado(resultado, tiempoAtencion, clase);
    }

    function mostrarResultado(resultado, tiempoAtencion, clase) {
        // Eliminar resultado anterior si existe
        const resultadoAnterior = document.querySelector('.resultado-triaje');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        // Crear elemento para mostrar el resultado
        const resultadoElement = document.createElement('div');
        resultadoElement.className = `resultado-triaje ${clase} fade-in`;
        resultadoElement.innerHTML = `
            <h3>${resultado}</h3>
            <p>Tiempo estimado de atención: ${tiempoAtencion}</p>
            ${clase === 'emergencia' ? '<p class="emergencia-mensaje">Por favor, busque ayuda inmediatamente.</p>' : ''}
        `;

        // Insertar el resultado después del formulario
        triajeForm.after(resultadoElement);

        // Scroll suave hasta el resultado
        resultadoElement.scrollIntoView({ behavior: 'smooth' });
    }
});