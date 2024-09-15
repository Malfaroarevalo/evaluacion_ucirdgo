document.addEventListener('DOMContentLoaded', function() {
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    const tbody = document.querySelector('#datosPacientes tbody');
    
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
    
    document.getElementById('exportarExcel').addEventListener('click', exportarAExcel);
});

function exportarAExcel() {
    const evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    const ws = XLSX.utils.json_to_sheet(evaluaciones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Evaluaciones");
    XLSX.writeFile(wb, "evaluaciones_uci.xlsx");
}
