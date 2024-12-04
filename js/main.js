alert("Bienvendios al simulador de atención al cliente");

let continuar = true;

//opciones
while (continuar)
{
let opciones = prompt("Elegi lo que deseas hacer:\n1. Saldo restante\n2. Completar pago\n3. Hablar con un asesor\n4. Calcular cuotas\n5. Finalizar");

if(opciones == 1)
{
    alert ("Tu saldo restante es de 30.000$")
}
else if(opciones == 2)
{
    let monto = prompt("Indica el monto a abonar")

    alert (`¡Tu pago de ${monto}$ se completo con exito!`)
}
else if (opciones == 3)
{
    alert ("Aguardanos un momento, hay demora de 5 minutos")
}
else if (opciones == 4) 
{
let totalCuotas = parseInt(prompt("Ingresa la cantidad total de cuotas de tu plan:"));
let cuotasPagadas = parseInt(prompt("Ingresa cuántas cuotas ya has pagado:"));

    //Funcion cuotas restantes
    
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
}
} 
else if (opciones == 5) 
{
alert("Hasta pronto, gracias por visitar este simulador <3");
continuar = false
} 
else 
{
alert("Opción no válida, por favor intenta nuevamente");
}
}
