document.addEventListener('DOMContentLoaded', function() {
    const resultados = JSON.parse(localStorage.getItem('ultimaEvaluacion'));
    const resultadosDiv = document.getElementById('resultados');
    
    // Mostrar resultados y recomendaciones
    resultadosDiv.innerHTML = `
        <p>Puntaje SOFA: ${resultados.sofaScore}</p>
        <p>Recomendación: ${resultados.recomendacion}</p>
        <!-- Mostrar más detalles según sea necesario -->
    `;
    
    document.getElementById('guardarBtn').addEventListener('click', function() {
        guardarEvaluacion(resultados);
        alert('Evaluación guardada correctamente');
    });
});

function guardarEvaluacion(resultados) {
    let evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    evaluaciones.push({
        id: Date.now(), // Usar timestamp como ID único
        fecha: new Date().toISOString(),
        ...resultados
    });
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
}
