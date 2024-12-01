document.addEventListener('DOMContentLoaded', function () {
    const inputCodigo = document.getElementById('codigo');

    // Variable para detectar si se ha escaneado un código
    let codigoEscaneado = false;

    // Función que se activa cuando el campo de código recibe una entrada
    inputCodigo.addEventListener('input', function (event) {
        // Detecta si el campo tiene contenido y se está escribiendo manualmente
        if (inputCodigo.value.trim() !== '') {
            codigoEscaneado = false;  // Se marca como ingreso manual
        }
    });

    // Si el lector de código de barras escanea algo, el campo será llenado automáticamente
    inputCodigo.addEventListener('change', function () {
        // Si el campo está vacío y se escaneó un código, el código se registra
        if (!codigoEscaneado && inputCodigo.value.trim() !== '') {
            console.log('Código leído o ingresado:', inputCodigo.value);
        }
    });

    // Aquí puedes agregar la lógica para enviar el formulario o cualquier validación adicional
});
