document.addEventListener('DOMContentLoaded', function() {
    mostrarResultados();
    const guardarBtn = document.getElementById('guardarBtn');
    if (guardarBtn) {
        guardarBtn.addEventListener('click', guardarEvaluacion);
    }
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
