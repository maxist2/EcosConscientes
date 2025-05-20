document.addEventListener('DOMContentLoaded', function() {
    const triageForm = document.getElementById('triageForm');

    if (triageForm) {
        triageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            evaluarTriage();
        });
    }

    function evaluarTriage() {
        // Contadores para cada nivel de triage
        let triageI = 0;
        let triageII = 0;
        let triageIII = 0;
        let triageIV = 0;

        // Evaluar Triage I (cualquier respuesta positiva)
        const triageIPreguntas = ['triage1_q1', 'triage1_q2', 'triage1_q3', 'triage1_q4', 'triage1_q5', 'triage1_q6', 'triage1_q7', 'triage1_q8'];
        triageIPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triageI++;
            }
        });

        // Evaluar Triage II (mínimo 3 respuestas positivas)
        const triageIIPreguntas = ['triage2_q1', 'triage2_q2', 'triage2_q3', 'triage2_q4', 'triage2_q5', 'triage2_q6', 'triage2_q7', 'triage2_q8'];
        triageIIPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triageII++;
            }
        });

        // Evaluar Triage III (mínimo 3 respuestas positivas)
        const triageIIIPreguntas = ['triage3_q1', 'triage3_q2', 'triage3_q3', 'triage3_q4', 'triage3_q5', 'triage3_q6', 'triage3_q7', 'triage3_q8'];
        triageIIIPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triageIII++;
            }
        });

        // Evaluar Triage IV (mínimo 4 respuestas positivas)
        const triageIVPreguntas = ['triage4_q1', 'triage4_q2', 'triage4_q3', 'triage4_q4', 'triage4_q5', 'triage4_q6', 'triage4_q7', 'triage4_q8'];
        triageIVPreguntas.forEach(pregunta => {
            const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
            if (respuesta && respuesta.value === 'si') {
                triageIV++;
            }
        });

        // Determinar el nivel de triage
        let resultado = '';
        let tiempoAtencion = '';
        let clase = '';

        if (triageI > 0) {
            resultado = 'Triage I - Emergencia';
            tiempoAtencion = 'Atención Inmediata';
            clase = 'emergencia';
        } else if (triageII >= 3) {
            resultado = 'Triage II - Urgencia';
            tiempoAtencion = '15 minutos';
            clase = 'urgencia';
        } else if (triageIII >= 3) {
            resultado = 'Triage III - Consulta Prioritaria';
            tiempoAtencion = '30-40 minutos';
            clase = 'prioritaria';
        } else if (triageIV >= 4) {
            resultado = 'Triage IV - Consulta Externa';
            tiempoAtencion = '120 minutos';
            clase = 'externa';
        } else {
            resultado = 'No se puede determinar el nivel de triage';
            tiempoAtencion = 'Por favor, complete todas las preguntas';
            clase = 'indeterminado';
        }

        mostrarResultado(resultado, tiempoAtencion, clase);
    }

    function mostrarResultado(resultado, tiempoAtencion, clase) {
        // Eliminar resultado anterior si existe
        const resultadoAnterior = document.querySelector('.resultado-triage');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        // Crear elemento para mostrar el resultado
        const resultadoElement = document.createElement('div');
        resultadoElement.className = `resultado-triage ${clase} fade-in`;
        resultadoElement.innerHTML = `
            <h3>${resultado}</h3>
            <p>Tiempo estimado de atención: ${tiempoAtencion}</p>
            ${clase === 'emergencia' ? '<p class="emergencia-mensaje">Por favor, busque ayuda inmediatamente.</p>' : ''}
        `;

        // Insertar el resultado después del formulario
        triageForm.after(resultadoElement);

        // Scroll suave hasta el resultado
        resultadoElement.scrollIntoView({ behavior: 'smooth' });
    }
});