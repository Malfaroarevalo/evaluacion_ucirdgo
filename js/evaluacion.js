// evaluacion.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('evaluacionForm');
    form.addEventListener('submit', evaluarPaciente);
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
    
    // Redirigir a la página de resultados
    window.location.href = 'resultados.html';
}

function calcularSOFA(evaluacion) {
    const sistemas = ['respiratorio', 'coagulacion', 'hepatico', 'cardiovascular', 'neurologico', 'renal'];
    return sistemas.reduce((total, sistema) => total + parseInt(evaluacion[`sofa_${sistema}`] || 0), 0);
}

function evaluarShock(evaluacion) {
    const criteriosShock = [
        'shock_hipotension', 'shock_taquicardia', 'shock_bradicardia', 
        'shock_oliguria', 'shock_anuria', 'shock_lactato_elevado'
    ];
    const cumpleCriterios = criteriosShock.some(criterio => evaluacion[criterio] === 'on');
    return {
        presente: cumpleCriterios,
        tipo: evaluacion.tipo_shock
    };
}

function evaluarIRA(evaluacion) {
    return {
        rifle: evaluacion.rifle_criterio,
        akin: evaluacion.akin_criterio
    };
}

function evaluarHDA(evaluacion) {
    const signosHDA = [
        'hda_hematemesis', 'hda_melena', 'hda_hematoquecia', 
        'hda_hipotension', 'hda_taquicardia', 'hda_piel_fria', 'hda_oliguria'
    ];
    const criteriosEndoscopicos = [
        'hda_sangrado_activo', 'hda_vaso_visible', 
        'hda_coagulo_adherido', 'hda_lesiones_alto_riesgo'
    ];
    
    return {
        presente: signosHDA.some(signo => evaluacion[signo] === 'on') || 
                  criteriosEndoscopicos.some(criterio => evaluacion[criterio] === 'on'),
        hemoglobina: parseFloat(evaluacion.hda_hemoglobina),
        hematocrito: parseFloat(evaluacion.hda_hematocrito),
        bunCreatininaElevado: evaluacion.hda_bun_creatinina === 'on'
    };
}

function evaluarSDRA(evaluacion) {
    const criteriosSDRA = [
        'sdra_inicio_agudo', 'sdra_opacidades_bilaterales', 'sdra_edema_no_cardiogenico'
    ];
    const cumpleCriterios = criteriosSDRA.every(criterio => evaluacion[criterio] === 'on');
    
    return {
        presente: cumpleCriterios,
        nivel: evaluacion.sdra_hipoxemia
    };
}

function generarRecomendacion(resultados) {
    let recomendacion = "Basado en la evaluación:";
    
    if (resultados.sofaScore >= 2) {
        recomendacion += "\n- El paciente tiene un SOFA score de " + resultados.sofaScore + ", lo que indica disfunción orgánica significativa.";
    }
    
    if (resultados.tieneShock.presente) {
        recomendacion += "\n- Se detecta shock " + resultados.tieneShock.tipo + ".";
    }
    
    if (resultados.nivelIRA.rifle !== "" || resultados.nivelIRA.akin !== "") {
        recomendacion += "\n- Hay evidencia de insuficiencia renal aguda.";
    }
    
    if (resultados.tieneHDA.presente) {
        recomendacion += "\n- Se observa hemorragia digestiva alta severa activa.";
    }
    
    if (resultados.nivelSDRA.presente) {
        recomendacion += "\n- El paciente presenta síndrome de distrés respiratorio agudo " + resultados.nivelSDRA.nivel + ".";
    }
    
    if (resultados.sofaScore >= 2 || resultados.tieneShock.presente || 
        resultados.tieneHDA.presente || (resultados.nivelSDRA.presente && resultados.nivelSDRA.nivel !== 'no_sdra')) {
        recomendacion += "\n\nSe recomienda el ingreso a la Unidad de Cuidados Intensivos para monitoreo y tratamiento intensivo.";
    } else {
        recomendacion += "\n\nBasado en los criterios evaluados, el paciente podría no requerir ingreso inmediato a UCI, pero se recomienda monitoreo cercano y reevaluación frecuente.";
    }
    
    return recomendacion;
}
