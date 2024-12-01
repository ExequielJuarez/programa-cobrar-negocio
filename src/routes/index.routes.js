// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Ruta del controlador

// Ruta para la vista principal
router.get('/', productController.index);

// Ruta para la vista de cobrar
router.get('/cobrar', productController.cobrar);

// Ruta para la vista de agregar
router.get('/agregar', productController.agregar);

//ruta para enviar datos a la bd
router.post('/agregar', productController.GuardarProducto);

router.post('/eliminar/:id', productController.EliminarProducto);

router.get('/editar/:id', productController.editarProducto);

router.post('/editar/:id', productController.EnviarInfoEditada);

// Ruta para mostrar todos los productos
router.get('/productos', productController.index); // Usamos el mismo controlador para mostrar los productos

// Ruta para buscar un producto por su código
router.get('/producto/:codigo', productController.getProductDetails);

// Ruta para guardar la venta (si fuera necesario)
module.exports = router;
