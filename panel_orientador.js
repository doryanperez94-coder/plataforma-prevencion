document.addEventListener('DOMContentLoaded', () => {
    cargarReportesConsulta();
});

function cargarReportesConsulta() {
    const tbody = document.getElementById('tablaReportesConsultaBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const reportes = JSON.parse(localStorage.getItem('pec_reportes')) || [];

    if (reportes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #a83b0c;">No hay reportes registrados en la plataforma.</td></tr>`;
        return;
    }

    reportes.forEach(r => {
        tbody.innerHTML += `
            <tr>
                <td>${r.folio}</td>
                <td>${r.lugar}</td>
                <td>${r.momento}</td>
                <td>${r.dia}</td>
                <td>${r.tipo}</td>
                <td><span class="badge-estado">${r.estado}</span></td>
            </tr>
        `;
    });
}