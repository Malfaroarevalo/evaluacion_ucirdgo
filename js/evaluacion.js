// evaluacion.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evaluacionForm');
    form.addEventListener('submit', evaluarPaciente);

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
    // Implementación de la evaluación de shock
}

function evaluarIRA(evaluacion) {
    // Implementación de la evaluación de IRA
}

function evaluarHDA(evaluacion) {
    // Implementación de la evaluación de HDA
}

function evaluarSDRA(evaluacion) {
    // Implementación de la evaluación de SDRA
}

function generarRecomendacion(resultados) {
    // Implementación de la generación de recomendaciones
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

// resultados.js

document.addEventListener('DOMContentLoaded', function() {
    mostrarResultados();
    document.getElementById('guardarBtn').addEventListener('click', guardarEvaluacion);
});

function mostrarResultados() {
    const resultados = JSON.parse(localStorage.getItem('ultimaEvaluacion'));
    const resultadosDiv = document.getElementById('resultados');

    if (resultados) {
        resultadosDiv.innerHTML = `
            <div class="card fade-in">
                <h2 class="card-title">Resumen de la Evaluación</h2>
                <p>SOFA Score: ${resultados.sofaScore}</p>
                <p>Recomendación: ${resultados.recomendacion}</p>
                <!-- Añadir más detalles según sea necesario -->
            </div>
        `;
    } else {
        resultadosDiv.innerHTML = '<p>No hay resultados disponibles.</p>';
    }
}

function guardarEvaluacion() {
    const resultados = JSON.parse(localStorage.getItem('ultimaEvaluacion'));
    let evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    
    evaluaciones.push({
        id: Date.now(),
        fecha: new Date().toISOString(),
        ...resultados
    });

    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
    alert('Evaluación guardada correctamente');
}

// datos.js

document.addEventListener('DOMContentLoaded', function() {
    cargarDatosPacientes();
    document.getElementById('exportarExcel').addEventListener('click', exportarAExcel);
});

function cargarDatosPacientes() {
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    const tbody = document.querySelector('#datosPacientes tbody');
    
    tbody.innerHTML = '';
    evaluaciones.forEach(eva => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${eva.id}</td>
            <td>${new Date(eva.fecha).toLocaleString()}</td>
            <td>${eva.sofaScore}</td>
            <td>${eva.recomendacion}</td>
        `;
        tbody.appendChild(tr);
    });
}

function exportarAExcel() {
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    const ws = XLSX.utils.json_to_sheet(evaluaciones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Evaluaciones");
    XLSX.writeFile(wb, "evaluaciones_uci.xlsx");
}