let orientadores = JSON.parse(localStorage.getItem('pec_orientadores')) || [
    { nombre: 'Genaro Reyes', grado: '5to semestre', turno: 'Vespertino', usuario: 'orientador1', password: 'Genarito2026' },
    { nombre: 'Anel', grado: '3er semestre', turno: 'Vespertino', usuario: 'orientador2', password: 'Anel2026' }
];

let reportes = JSON.parse(localStorage.getItem('pec_reportes')) || [];

document.addEventListener('DOMContentLoaded', () => {
    guardarOrientadoresEnStorage();
    cargarReportes();
    cargarOrientadores();
    inicializarGrafica();

    const formOri = document.getElementById('formOrientador');
    if (formOri) {
        formOri.addEventListener('submit', guardarOrientador);
    }
});

function mostrarSeccion(seccionId, btn) {
    document.querySelectorAll('.panel-section').forEach(sec => {
        sec.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });

    const objetivo = document.getElementById(seccionId);
    if (objetivo) {
        objetivo.classList.add('active');
    }

    if (btn) {
        btn.classList.add('active');
    }
}

function guardarOrientadoresEnStorage() {
    localStorage.setItem('pec_orientadores', JSON.stringify(orientadores));
}

function cargarReportes() {
    const tbody = document.getElementById('tablaReportesBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    reportes = JSON.parse(localStorage.getItem('pec_reportes')) || [];

    if (reportes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #a83b0c;">No hay reportes registrados.</td></tr>`;
        return;
    }

    reportes.forEach(r => {
        tbody.innerHTML += `
            <tr>
                <td>${r.folio}</td>
                <td>${r.lugar}</td>
                <td>${r.momento}</td>
                <td>${r.dia}</td>
                <td>${r.emisor}</td>
                <td>${r.tipo}</td>
            </tr>
        `;
    });
}

function cargarOrientadores() {
    const tbody = document.getElementById('tablaOrientadoresBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    orientadores = JSON.parse(localStorage.getItem('pec_orientadores')) || [];

    if (orientadores.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #a83b0c;">No hay orientadores registrados.</td></tr>`;
        return;
    }

    orientadores.forEach((o, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${o.nombre}</td>
                <td>${o.grado}</td>
                <td>${o.turno}</td>
                <td>
                    <button class="btn-accion btn-editar" onclick="editarOrientador(${index})">Modificar</button>
                    <button class="btn-accion btn-eliminar" onclick="eliminarOrientador(${index})">Quitar</button>
                </td>
            </tr>
        `;
    });
}

function guardarOrientador(e) {
    e.preventDefault();
    const index = document.getElementById('orientadorIndex').value;
    const nombre = document.getElementById('oriNombre').value;
    const grado = document.getElementById('oriGrado').value;
    const turno = document.getElementById('oriTurno').value;
    const usuario = document.getElementById('oriUsuario') ? document.getElementById('oriUsuario').value : 'orientador' + (orientadores.length + 1);
    const password = document.getElementById('oriPassword') ? document.getElementById('oriPassword').value : 'Pec2026';

    if (index === '') {
        orientadores.push({ nombre, grado, turno, usuario, password });
    } else {
        orientadores[index] = { 
            nombre, 
            grado, 
            turno, 
            usuario: orientadores[index].usuario, 
            password: orientadores[index].password 
        };
        document.getElementById('orientadorIndex').value = '';
        const btnSubmit = document.getElementById('btnGuardarOri');
        if (btnSubmit) btnSubmit.textContent = 'Agregar Orientador';
    }

    guardarOrientadoresEnStorage();
    document.getElementById('formOrientador').reset();
    cargarOrientadores();
}

function editarOrientador(index) {
    const o = orientadores[index];
    document.getElementById('orientadorIndex').value = index;
    document.getElementById('oriNombre').value = o.nombre;
    document.getElementById('oriGrado').value = o.grado;
    document.getElementById('oriTurno').value = o.turno;
    if (document.getElementById('oriUsuario')) document.getElementById('oriUsuario').value = o.usuario;
    if (document.getElementById('oriPassword')) document.getElementById('oriPassword').value = o.password;
    
    const btnSubmit = document.getElementById('btnGuardarOri');
    if (btnSubmit) btnSubmit.textContent = 'Guardar Cambios';
}

function eliminarOrientador(index) {
    orientadores.splice(index, 1);
    guardarOrientadoresEnStorage();
    cargarOrientadores();
}

let chartInstance = null;

function inicializarGrafica() {
    const canvas = document.getElementById('graficaReportes');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Caídas', 'Eléctrico', 'Mobiliario', 'Señalización'],
            datasets: [{
                label: 'Reportes por Categoría de Riesgo',
                data: [reportes.length, 0, 0, 0],
                backgroundColor: ['#E0561B', '#C81E1E', '#F97316', '#8B0000']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            },
            scales: {
                x: { ticks: { color: '#ffffff' } },
                y: { ticks: { color: '#ffffff' } }
            }
        }
    });
}