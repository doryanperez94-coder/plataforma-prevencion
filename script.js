document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');

    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nuevoReporte = {
                folio: 'PEC-' + Math.floor(1000 + Math.random() * 9000),
                lugar: document.getElementById('lugar').value,
                momento: document.getElementById('hora').value,
                dia: document.getElementById('fecha').value,
                emisor: document.getElementById('emisor').value,
                tipo: document.getElementById('tipoRiesgo').value,
                descripcion: document.getElementById('descripcion').value,
                estado: 'Pendiente'
            };

            let reportesGuardados = JSON.parse(localStorage.getItem('pec_reportes')) || [];
            reportesGuardados.push(nuevoReporte);
            localStorage.setItem('pec_reportes', JSON.stringify(reportesGuardados));

            alert('Reporte registrado correctamente con el Folio: ' + nuevoReporte.folio);
            reportForm.reset();
        });
    }

    const formClave = document.getElementById('formClaveSecreta');
    if (formClave) {
        formClave.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputClave = document.getElementById('claveSecretaInput').value;
            const msgError = document.getElementById('msgErrorClave');

            if (inputClave === 'Doryan2026') {
                window.location.href = 'director_login.html';
            } else if (inputClave === 'messi1010') {
                window.location.href = 'orientador_login.html';
            } else {
                msgError.textContent = 'Clave secreta incorrecta.';
            }
        });
    }
});

function entrarAlSitio() {
    const portada = document.getElementById('portada');
    const sitioPrincipal = document.getElementById('sitio-principal');

    if (portada) {
        portada.style.display = 'none';
    }
    if (sitioPrincipal) {
        sitioPrincipal.classList.remove('sitio-oculto');
    }
}

function switchSection(seccionId, btn) {
    document.querySelectorAll('.section-view').forEach(sec => {
        sec.classList.remove('active');
    });

    document.querySelectorAll('.nav-tab').forEach(b => {
        b.classList.remove('active');
    });

    const objetivo = document.getElementById(seccionId);
    if (objetivo) {
        objetivo.classList.add('active');
    }

    if (btn && btn.classList.contains('nav-tab')) {
        btn.classList.add('active');
    }
}

function verDiagnostico(zona, nivel, hallazgo, accion) {
    const box = document.getElementById('diagnosticoBox');
    if (!box) return;

    let colorBadge = '#10B981';
    if (nivel === 'Alto') colorBadge = '#EF4444';
    if (nivel === 'Medio') colorBadge = '#F59E0B';

    box.innerHTML = `
        <h3 style="margin-top: 0; color: var(--rojo-primario);">${zona}</h3>
        <p><strong>Nivel de Riesgo:</strong> <span style="background-color: ${colorBadge}; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">${nivel}</span></p>
        <p><strong>Hallazgo:</strong> ${hallazgo}</p>
        <p><strong>Medida Preventiva:</strong> ${accion}</p>
    `;
}

function abrirModalSecreto() {
    const modal = document.getElementById('modalSecreto');
    if (modal) {
        modal.style.display = 'flex';
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('modalSecreto');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};