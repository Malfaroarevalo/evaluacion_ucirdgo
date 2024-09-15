document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evaluacionForm');
    if (form) {
        form.addEventListener('submit', evaluarPaciente);
    }
    
    // Inicializar tooltips
    initTooltips();
});

function evaluarPaciente(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const evaluacion = Object.fromEntries(formData);

    const resultados = {
        sofaScore: calcularSOFA(evaluacion),
        tieneShock: evaluarShock(evaluacion),
        nivelIRA: evaluarIRA(evaluacion),
        tieneHDA: evaluarHDA(evaluacion),
        nivelSDRA: evaluarSDRA(evaluacion)
    };
    
    resultados.recomendacion = generarRecomendacion(resultados);
    
    // Guardar resultados en localStorage
    localStorage.setItem('ultimaEvaluacion', JSON.stringify(resultados));
    
    // Mostrar modal de confirmación
    mostrarModalConfirmacion(resultados);
}

function calcularSOFA(evaluacion) {
    const sistemas = ['respiratorio', 'coagulacion', 'hepatico', 'cardiovascular', 'neurologico', 'renal'];
    return sistemas.reduce((total, sistema) => total + parseInt(evaluacion[`sofa_${sistema}`] || 0), 0);
}

function evaluarShock(evaluacion) {
    // Implementación de evaluación de shock (placeholder)
    return 0; // Cambiar según sea necesario
}

function evaluarIRA(evaluacion) {
    // Implementación de evaluación de IRA (placeholder)
    return 0; // Cambiar según sea necesario
}

function evaluarHDA(evaluacion) {
    // Implementación de evaluación de Hemorragia Digestiva Alta (placeholder)
    return 0; // Cambiar según sea necesario
}

function evaluarSDRA(evaluacion) {
    // Implementación de evaluación de SDRA (placeholder)
    return 0; // Cambiar según sea necesario
}

function generarRecomendacion(resultados) {
    // Generar recomendación basado en los resultados (placeholder)
    return resultados.sofaScore > 4 ? "Ingresar a UCI" : "Observar";
}

function mostrarModalConfirmacion(resultados) {
    const modal = document.createElement('div');
    modal.className = 'modal fade-in';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Confirmación de Evaluación</h2>
            <p>SOFA Score: ${resultados.sofaScore}</p>
            <p>Recomendación: ${resultados.recomendacion}</p>
            <button id="confirmarEvaluacion" class="btn">Confirmar y Ver Resultados</button>
            <button id="cancelarEvaluacion" class="btn btn-secondary">Cancelar</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirmarEvaluacion').addEventListener('click', () => {
        window.location.href = 'resultados.html';
    });

    document.getElementById('cancelarEvaluacion').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltipText = event.currentTarget.querySelector('.tooltiptext');
    tooltipText.style.visibility = 'visible';
    tooltipText.style.opacity = '1';
}

function hideTooltip(event) {
    const tooltipText = event.currentTarget.querySelector('.tooltiptext');
    tooltipText.style.visibility = 'hidden';
    tooltipText.style.opacity = '0';
}
