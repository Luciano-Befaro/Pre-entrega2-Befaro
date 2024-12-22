alert("Bienvendios al simulador de atención al cliente");



// Historial de interacciones
let historialInteracciones = [];

// Función para registrar interacciones en el historial
function registrarInteraccion(tipo, detalle) 
{
  historialInteracciones.push({ tipo, detalle, fecha: new Date() });
}

// Función para mostrar el historial de interacciones
function mostrarHistorial() {
  if (historialInteracciones.length === 0) 
    {
        alert("No hay interacciones en el historial.");
        return;
    }

  let historialTexto = "Historial de interacciones:\n";
  historialInteracciones.forEach((interaccion, index) => 
    {
        historialTexto += `${index + 1}. [${interaccion.fecha.toLocaleString()}] ${interaccion.tipo}: ${interaccion.detalle}\n`;
    });

  alert(historialTexto);
}

let continuar = true;

//opciones
while (continuar)
{
let opciones = prompt("Elegi lo que deseas hacer:\n1. Saldo restante\n2. Completar pago\n3. Hablar con un asesor\n4. Calcular cuotas\n5. Mostrar historial de interacciones\n6. Finalizar");

if (opciones == 1) 
{
    alert("Tu saldo restante es de 30.000$");
    registrarInteraccion("Consulta", "Saldo restante: 30.000$");
} 
else if (opciones == 2) 
{
    let monto = prompt("Indica el monto a abonar:");
    if (!isNaN(parseFloat(monto))) 
    {
      alert(`¡Tu pago de ${monto}$ se completó con éxito!`);
      registrarInteraccion("Pago", `Monto abonado: ${monto}$`);
    } 
    else 
    {
      alert("Por favor, ingresa un monto válido.");
    }
} 
else if (opciones == 3) 
{
    alert("Aguarda un momento, hay una demora de 5 minutos.");
    registrarInteraccion("Consulta", "Contacto con asesor");
} 
else if (opciones == 4) 
{
    let totalCuotas = parseInt(prompt("Ingresa la cantidad total de cuotas de tu plan:"));
    let cuotasPagadas = parseInt(prompt("Ingresa cuántas cuotas ya has pagado:"));

    if (isNaN(totalCuotas) || isNaN(cuotasPagadas)) 
    {
      alert("Por favor, ingresa números válidos.");
    } 
else if (cuotasPagadas > totalCuotas) 
    {
      alert("No puedes haber pagado más cuotas que las totales. Por favor verifica.");
    } 
    else 
    {
      let cuotasRestantes = totalCuotas - cuotasPagadas;
      alert(`Te quedan ${cuotasRestantes} cuotas por pagar.`);
      registrarInteraccion("Consulta", `Cuotas restantes: ${cuotasRestantes}`);
    }
} 
else if (opciones == 5) 
{
    mostrarHistorial();
} 
else if (opciones == 6) 
{
    alert("Hasta pronto, gracias por visitar este simulador <3");
    continuar = false;
} 
else 
{
    alert("Opción no válida, por favor intenta nuevamente.");
}
}
