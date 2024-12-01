const inputCodigo = document.getElementById('codigoProducto');
const botonBuscar = document.getElementById('buscarProducto');
const productoNombreContainer = document.getElementById('productoNombreContainer');
const productoPrecioContainer = document.getElementById('productoPrecioContainer');
const totalElement = document.getElementById('total');
const botonGuardar = document.getElementById('guardarVenta');
const botonReiniciar = document.getElementById('reiniciarVenta');

// Variables para el total y los productos en la venta
let total = 0;
let productosVenta = [];

// Función para actualizar el total en la interfaz
function actualizarTotal() {
    totalElement.textContent = total.toFixed(2);
}

// Función para buscar el producto por código
async function buscarProducto(codigo) {
    try {
        // Realiza una solicitud al backend para obtener el producto
        const response = await fetch(`/producto/${codigo}`);

        if (response.ok) {
            const producto = await response.json();

            // Crear los elementos para mostrar el producto (no limpiamos los contenedores)
            const nombreProducto = document.createElement('div');
            nombreProducto.textContent = producto.nombre;
            nombreProducto.classList.add('producto'); // Añadimos una clase para aplicar estilo si es necesario
            productoNombreContainer.appendChild(nombreProducto);

            const precioProducto = document.createElement('div');
            precioProducto.textContent = `$${parseFloat(producto.precio).toFixed(2)}`;
            precioProducto.classList.add('producto'); // Añadimos una clase para aplicar estilo si es necesario
            productoPrecioContainer.appendChild(precioProducto);

            // Agregar el producto a la lista de productos de la venta
            productosVenta.push({ nombre: producto.nombre, precio: parseFloat(producto.precio) });

            // Actualizar el total
            total += parseFloat(producto.precio);
            actualizarTotal();
        } else {
            alert('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error al buscar el producto');
    }
}

// Función para guardar la venta
async function guardarVenta() {
    if (productosVenta.length === 0) {
        alert('No hay productos en la venta');
        return;
    }

    try {
        const response = await fetch('/venta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                total: total,
                productos: productosVenta
            })
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.mensaje);
            
            // Limpiar la venta después de guardarla
            reiniciarVenta();
        } else {
            const result = await response.json();
            alert(result.mensaje);
        }
    } catch (error) {
        console.error('Error al guardar la venta:', error);
        alert('Error al guardar la venta');
    }
}

// Función para reiniciar la venta
function reiniciarVenta() {
    // Limpiar las variables y la interfaz de productos
    total = 0;
    productosVenta = [];
    productoNombreContainer.innerHTML = '';  // Se limpia solo la lista visual de productos
    productoPrecioContainer.innerHTML = ''; // Se limpia solo la lista visual de precios
    actualizarTotal();
}

// Event listener para el botón de búsqueda
botonBuscar.addEventListener('click', () => {
    const codigoIngresado = inputCodigo.value.trim();
    if (codigoIngresado) {
        buscarProducto(codigoIngresado);
        inputCodigo.value = ''; // Limpiar el campo de entrada después de buscar
    }
});

// Permitir presionar Enter para buscar
inputCodigo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const codigoIngresado = inputCodigo.value.trim();
        if (codigoIngresado) {
            buscarProducto(codigoIngresado);
            inputCodigo.value = ''; // Limpiar el campo de entrada después de buscar
        }
    }
});

// Event listener para el botón de "guardar venta"
botonGuardar.addEventListener('click', () => {
    guardarVenta();
});

// Event listener para el botón de "reiniciar venta"
botonReiniciar.addEventListener('click', () => {
    reiniciarVenta();
});
