// controllers/productController.js

const saleService = require('../data/saleService'); // Importamos el servicio
const db = require('../model/database/models');  // Importamos la base de datos

const productController = {

    
    // Renderiza la vista principal (index) con el listado de productos
    index: async (req, res) => {
        try {
            const productos = await db.Producto.findAll(); // Obtenemos todos los productos
            res.render('index', { productos }); // Enviamos los productos a la vista 'index.ejs'
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Error al obtener los productos');
        }
    },

    agregar : async (req,res) => {
        try {
            res.render("formProduct");
        } catch (error) {
            
        }
    },

    GuardarProducto : async (req,res) =>{
        try {
            const { producto, precio, stock, codigo } = req.body;
    
            // Si no se ingresó un código, generamos uno automáticamente
            const codigoFinal = codigo || `P-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
            const nuevoProducto = await db.Producto.create({
                nombre: producto,
                precio: parseFloat(precio),
                stock: parseInt(stock),
                codigo: codigoFinal
            });
    
            return res.redirect("/")
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el producto', error: error.message });
        }
    },

    EliminarProducto : async (req,res) =>{
        const { id } = req.params;  // Obtenemos el id del producto desde la URL

    try {
        // Buscamos el producto por id
        const producto = await db.Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminamos el producto
        await producto.destroy();

        return res.redirect("/")
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
    },

    // Renderiza la vista para cobrar
    cobrar: async (req, res) => {
        res.render('cobrar'); // Renderizamos la vista 'cobrar' inicialmente
    },

    // Esta función recibe un código de producto y devuelve sus detalles
    getProductDetails: async (req, res) => {
        const codigo = req.params.codigo; // Obtener el código desde los parámetros de la URL
        try {
            const product = await saleService.getProductByCode(codigo); // Llamar al service

            if (product) {
                // Producto encontrado
                console.log('Producto encontrado:', product);

                // Si el producto se encuentra, se responde con su nombre y precio
                res.json({
                    nombre: product.nombre,
                    precio: product.precio // Asegúrate de enviar el precio correctamente
                });
            } else {
                // Si no se encuentra el producto
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    editarProducto : async (req, res) => {
        const { id } = req.params;
        try {
            const producto = await db.Producto.findByPk(id);
            res.render("editProduct",{producto});
        } catch (error) {
            
        }
    },

    EnviarInfoEditada : async (req, res) => {
        const { id } = req.params;
        try {
            const productos = await db.Producto.findByPk(id);
            const { nombre, precio, stock } = req.body;
            await productos.update({
                nombre,
                precio,
                stock
            });
            return res.redirect("/");

        } catch (error) {
            
        }
    }
};

module.exports = productController;
