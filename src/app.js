const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const indexRouter = require('./routes/index.routes');

const app = express();

app.use(cors());
app.use(cookies());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Configura el motor de plantillas y el directorio de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

// Define las rutas
app.use('/', indexRouter);

// Manejo de errores




// Inicia el servidor
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Levantando un servidor con Express en el puerto ${puerto}`);
});

module.exports = app; // Exportar la aplicación para pruebas u otros usos
