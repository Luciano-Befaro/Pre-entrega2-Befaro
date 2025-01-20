
// Referencias del DOM
const form = document.getElementById('interactionForm');
const actionSelect = document.getElementById('action');
const extraInput = document.getElementById('extraInput');
const extraValue = document.getElementById('extraValue');
const resultsContainer = document.getElementById('resultsContainer');

// Historial de interacciones
let historialInteracciones = JSON.parse(localStorage.getItem('historial')) || [];

// Límite máximo de registros en el historial
const LIMITE_HISTORIAL = 3;

// Función para guardar historial localStorage
function guardarHistorial() {
    // Si el historial excede el límite, elimina las entradas más antiguas
    if (historialInteracciones.length > LIMITE_HISTORIAL) {
    historialInteracciones = historialInteracciones.slice(-LIMITE_HISTORIAL);
}
  localStorage.setItem('historial', JSON.stringify(historialInteracciones));
}


// Función para registrar interacciones
function registrarInteraccion(tipo, detalle) {
    const nuevaInteraccion = { tipo, detalle, fecha: new Date().toLocaleString() };
    historialInteracciones.push(nuevaInteraccion);
    guardarHistorial();
}

// Función para mostrar historial
function mostrarHistorial() {
    if (historialInteracciones.length === 0) {
        resultsContainer.innerHTML = '<p>No hay interacciones en el historial.</p>';
        return;
    }

    let historialHTML = '<h3>Historial de Interacciones:</h3><ul>';
    historialInteracciones.forEach((interaccion, index) => {
        historialHTML += `<li>${index + 1}. [${interaccion.fecha}] ${interaccion.tipo}: ${interaccion.detalle}</li>`;
    });
    historialHTML += '</ul>';

    resultsContainer.innerHTML = historialHTML;
}

// Función principal para procesar acciones
function procesarAccion(event) {
    event.preventDefault();

    const accion = actionSelect.value;
    const detalle = extraValue.value || 'No especificado';

    let resultado = '';

    switch (accion) {
        case 'saldo':
            resultado = 'Tu saldo restante es de 30.000$';
            registrarInteraccion('Consulta', 'Saldo restante: 30.000$');
            break;
        case 'pago':
            if (detalle.trim() === '') {
                resultado = 'Por favor, completa el monto a abonar.'; // Mensaje de advertencia
            } else if (isNaN(detalle) || Number(detalle) <= 0) {
                resultado = 'Por favor, ingresa un monto válido.'; 
            } else {
                resultado = `¡Tu pago de ${detalle}$ se completó con éxito!`;
                registrarInteraccion('Pago', `Monto abonado: ${detalle}$`);
            }
            break;
        case 'asesor':
            resultado = 'Aguarda un momento, hay una demora de 5 minutos.';
            registrarInteraccion('Consulta', 'Contacto con asesor');
            break;
        case 'cuotas':
            const [totalCuotas, cuotasPagadas] = detalle.split(',').map(Number);
            if (isNaN(totalCuotas) || isNaN(cuotasPagadas) || cuotasPagadas > totalCuotas) {
                resultado = 'Por favor, ingresa datos válidos (formato: totalCuotas,cuotasPagadas).';
            } else {
                const cuotasRestantes = totalCuotas - cuotasPagadas;
                resultado = `Te quedan ${cuotasRestantes} cuotas por pagar.`;
                registrarInteraccion('Consulta', `Cuotas restantes: ${cuotasRestantes}`);
            }
            break;
        case 'historial':
            mostrarHistorial();
            return;
        default:
            resultado = 'Acción no reconocida.';
    }

    resultsContainer.innerHTML = `<p>${resultado}</p>`;
    extraValue.value = '';
}

// Mostrar campo adicional 
actionSelect.addEventListener('change', () => {
    if (actionSelect.value === 'pago' || actionSelect.value === 'cuotas') {
        extraInput.style.display = 'block';
        extraValue.placeholder = actionSelect.value === 'pago' ? 'Monto a pagar' : 'Total cuotas, cuotas pagadas';
    } else {
        extraInput.style.display = 'none';
    }
});

// procesar formulario
form.addEventListener('submit', procesarAccion);

// Mostrar historial 
mostrarHistorial();
