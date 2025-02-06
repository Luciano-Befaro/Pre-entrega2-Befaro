// Referencias del DOM
const registerForm = document.getElementById('registerForm');
const clientNameInput = document.getElementById('clientName');
const clientEmailInput = document.getElementById('clientEmail');

// guardar los datos del cliente 
function registrarCliente(event) {
    event.preventDefault();

    const clientName = clientNameInput.value.trim();
    const clientEmail = clientEmailInput.value.trim();

    if (clientName === '' || clientEmail === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Guardar los datos en localStorage
    const cliente = { nombre: clientName, email: clientEmail };
    localStorage.setItem('cliente', JSON.stringify(cliente));

    // Redirigir al simulador
    window.location.href = './html/simulador.html';
}

//  manejar el registro del cliente
registerForm.addEventListener('submit', registrarCliente);