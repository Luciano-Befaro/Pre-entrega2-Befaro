
// Referencias del DOM
const form = document.getElementById('interactionForm');
const actionSelect = document.getElementById('action');
const extraInput = document.getElementById('extraInput');
const extraValue = document.getElementById('extraValue');
const resultsContainer = document.getElementById('resultsContainer');


// Historial de interacciones
let historialInteracciones = JSON.parse(localStorage.getItem('historial')) || [];

async function cargarClientes() {
    try {
        console.log('./data/clientes.json');
        const response = await fetch('/data/clientes.json');
        const clientes = await response.json();
        console.log('Clientes cargados:', clientes);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

function registrarInteraccion(tipo, detalle) {
    const nuevaInteraccion = { tipo, detalle, fecha: new Date().toLocaleString() };

    // Agregar la nueva interacción
    historialInteracciones.push(nuevaInteraccion);

    // Limitar el historial a las últimas 3 acciones
    historialInteracciones = historialInteracciones.slice(-3);

    // Guardar en localStorage y actualizar el DOM
    localStorage.setItem('historial', JSON.stringify(historialInteracciones));
    actualizarHistorialDOM();
}

// Cargar datos desde una API simulada para asesoramiento
async function obtenerAsesoramiento() {
    try {
        console.log('Intentando cargar clientes desde ./data/clientes.json');
        const response = await fetch('/data/clientes.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener asesoramiento:', error);
        return [];
    }
}

// Generar historial en el DOM de forma dinámica
function actualizarHistorialDOM() {
    resultsContainer.innerHTML = historialInteracciones.length
        ? historialInteracciones.map(interaccion => `<p>${interaccion.fecha} - ${interaccion.tipo}: ${interaccion.detalle}</p>`).join('')
        : '<p>No hay interacciones en el historial.</p>';
}

// Mostrar/ocultar el campo extra dinámicamente según la acción seleccionada
actionSelect.addEventListener('change', () => {
    const accion = actionSelect.value;

    // Mostrar u ocultar el campo adicional según la acción
    if (accion === 'pago') {
        extraInput.style.display = 'block';
        extraValue.placeholder = 'Ingresa el monto a pagar';
    } else if (accion === 'cuotas') {
        extraInput.style.display = 'block';
        extraValue.placeholder = 'Formato: totalCuotas,cuotasPagadas';
    } else {
        extraInput.style.display = 'none';
    }
});

// Ocultar el campo extra al inicio
extraInput.style.display = 'none';

// Función principal para procesar acciones
async function procesarAccion(event) {
    event.preventDefault();

    const accion = actionSelect.value;
    const detalle = extraValue.value.trim();
    let resultado = '';

    switch (accion) {
        case 'saldo':
            resultado = 'Tu saldo restante es de 30.000$';
            registrarInteraccion('Consulta', 'Saldo restante: 30.000$');
            break;
        case 'pago':  
            if (!detalle || isNaN(detalle) || Number(detalle) <= 0) {
                Swal.fire('Error', 'Por favor, ingresa un monto válido.', 'error');
                return;
            }
            resultado = `¡Tu pago de ${detalle}$ se completó con éxito!`;
            registrarInteraccion('Pago', `Monto abonado: ${detalle}$`);
            break;
            case 'asesor':
            resultado = 'Conectando con un asesor...';
            registrarInteraccion('Consulta', 'Solicitud de asesoramiento');
            setTimeout(() => {
                // Mensaje fijo
                const mensajeFijo = 'Hola Buen dia, ¿En que puedo ayudarte?.';
                Swal.fire('Asesor dice:', mensajeFijo, 'info');
            }, 2000);
            break;
        case 'cuotas':
            const [totalCuotas, cuotasPagadas] = detalle.split(',').map(Number);
            if (isNaN(totalCuotas) || isNaN(cuotasPagadas) || cuotasPagadas > totalCuotas) {
                Swal.fire('Error', 'Por favor, ingresa datos válidos en formato: totalCuotas,cuotasPagadas', 'error');
                return;
            }
            const cuotasRestantes = totalCuotas - cuotasPagadas;
            resultado = `Te quedan ${cuotasRestantes} cuotas por pagar.`;
            registrarInteraccion('Consulta', `Cuotas restantes: ${cuotasRestantes}`);
            break;
        
        default:
            Swal.fire('Error', 'Acción no reconocida.', 'error');
            return;
        }
    Swal.fire('Resultado', resultado, 'success');
    extraValue.value = '';
}

// Evento para procesar formulario
form.addEventListener('submit', procesarAccion);

// Cargar clientes y actualizar historial inicio
cargarClientes();
actualizarHistorialDOM();
