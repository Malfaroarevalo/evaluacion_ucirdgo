# Guía para crear un sitio web de evaluación de ingreso a UCI alojado en GitHub Pages

## 1. Planificación y diseño

### 1.1 Estructura del sitio web
- Página principal con información general
- Formulario de evaluación
- Página de resultados y recomendaciones
- Tabla de datos de pacientes (similar a Excel)

### 1.2 Tecnologías a utilizar
- HTML5 para la estructura
- CSS3 para el diseño (considerar usar un framework como Bootstrap)
- JavaScript para la lógica del formulario y manipulación de datos
- LocalStorage para almacenamiento de datos en el navegador
- SheetJS (https://sheetjs.com/) para exportar datos en formato Excel

## 2. Desarrollo

### 2.1 Configuración del repositorio en GitHub
1. Crear un nuevo repositorio en GitHub
2. Habilitar GitHub Pages en la configuración del repositorio

### 2.2 Estructura de archivos
```
/
├── index.html
├── evaluacion.html
├── resultados.html
├── datos.html
├── css/
│   └── styles.css
├── js/
│   ├── evaluacion.js
│   ├── resultados.js
│   └── datos.js
└── lib/
    └── xlsx.full.min.js
```

### 2.3 Desarrollo de las páginas principales

#### 2.3.1 index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Evaluación de Ingreso a UCI</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Sistema de Evaluación de Ingreso a UCI</h1>
    <nav>
        <ul>
            <li><a href="evaluacion.html">Nueva Evaluación</a></li>
            <li><a href="datos.html">Ver Datos de Pacientes</a></li>
        </ul>
    </nav>
</body>
</html>
```

#### 2.3.2 evaluacion.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evaluación de Ingreso a UCI</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Formulario de Evaluación</h1>
    <form id="evaluacionForm">
        <!-- Incluir aquí los campos del formulario basados en el documento proporcionado -->
        <h2>1. Evaluación de Disfunción Multiorgánica (SOFA Score)</h2>
        <!-- Campos SOFA -->
        
        <h2>2. Evaluación de Shock</h2>
        <!-- Campos de evaluación de shock -->
        
        <h2>3. Evaluación de Insuficiencia Renal Aguda (IRA)</h2>
        <!-- Campos de evaluación IRA -->
        
        <h2>4. Evaluación de Hemorragia Digestiva Alta Severa Activa</h2>
        <!-- Campos de evaluación de hemorragia -->
        
        <h2>5. Evaluación de Síndrome de Distrés Respiratorio Agudo (SDRA)</h2>
        <!-- Campos de evaluación SDRA -->
        
        <button type="submit">Evaluar</button>
    </form>
    <script src="js/evaluacion.js"></script>
</body>
</html>
```

#### 2.3.3 resultados.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Evaluación</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Resultados de la Evaluación</h1>
    <div id="resultados"></div>
    <button id="guardarBtn">Guardar Evaluación</button>
    <a href="evaluacion.html">Nueva Evaluación</a>
    <script src="js/resultados.js"></script>
</body>
</html>
```

#### 2.3.4 datos.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos de Pacientes</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <h1>Datos de Pacientes</h1>
    <table id="datosPacientes">
        <thead>
            <tr>
                <th>ID Paciente</th>
                <th>Fecha Evaluación</th>
                <th>Puntaje SOFA</th>
                <th>Recomendación</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <button id="exportarExcel">Exportar a Excel</button>
    <script src="lib/xlsx.full.min.js"></script>
    <script src="js/datos.js"></script>
</body>
</html>
```

### 2.4 Desarrollo de la lógica JavaScript

#### 2.4.1 evaluacion.js
```javascript
document.getElementById('evaluacionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Recopilar datos del formulario
    const formData = new FormData(this);
    const evaluacion = Object.fromEntries(formData);
    
    // Realizar cálculos y evaluaciones
    const resultados = evaluarPaciente(evaluacion);
    
    // Guardar resultados en localStorage
    localStorage.setItem('ultimaEvaluacion', JSON.stringify(resultados));
    
    // Redirigir a la página de resultados
    window.location.href = 'resultados.html';
});

function evaluarPaciente(evaluacion) {
    // Implementar lógica de evaluación basada en los criterios proporcionados
    // Retornar objeto con resultados y recomendaciones
}
```

#### 2.4.2 resultados.js
```javascript
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
```

#### 2.4.3 datos.js
```javascript
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
```

## 3. Despliegue

1. Commit y push de todos los archivos al repositorio de GitHub.
2. En la configuración del repositorio, asegurarse de que GitHub Pages esté habilitado y apunte a la rama principal.
3. El sitio web estará disponible en `https://<username>.github.io/<repository-name>/`

## 4. Consideraciones adicionales

- Implementar validación de formularios para asegurar la integridad de los datos.
- Considerar la adición de gráficos para visualizar tendencias en los datos de pacientes.
- Implementar un sistema de autenticación básico para proteger los datos de los pacientes.
- Agregar la funcionalidad de editar o eliminar evaluaciones existentes.
- Optimizar el rendimiento para manejar un gran número de evaluaciones.

Esta guía proporciona una base sólida para crear un sitio web de evaluación de ingreso a UCI que puede ser alojado en GitHub Pages y que permite guardar y visualizar datos de pacientes en un formato similar a Excel. El uso de LocalStorage permite el almacenamiento de datos en el navegador del usuario, lo que es adecuado para proyectos pequeños o prototipos. Para una aplicación en producción con datos sensibles de pacientes, se recomienda implementar un backend seguro y cumplir con las regulaciones de privacidad de datos de salud.

