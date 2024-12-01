const db = require('../model/database/models');  // Asegúrate de que la ruta sea la correcta

const saleService = {
    // Obtener los datos de un producto por su código
    getProductByCode: async function(codigo) {
        try {
            // Buscar el producto en la base de datos por el código
            const product = await db.Producto.findOne({
                where: { codigo: codigo }
            });

            if (product) {
                // Si el producto es encontrado, retornar los datos relevantes
                return {
                    nombre: product.nombre,
                    precio: product.precio,
                    stock: product.stock,
                    codigo: product.codigo
                };
            }

            return null;  // Si no se encuentra el producto, devolver null
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;  // Si ocurre un error, devolver null
        }
    }
};

module.exports = saleService;
