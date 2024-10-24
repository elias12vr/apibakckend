const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mangaController = require('./controllers/mangaController');
const methodOverride = require('method-override');
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para analizar los datos del formulario
app.use(methodOverride('_method')); // Para soportar métodos PUT y DELETE en formularios

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/TiendadeMangas')
    .then(() => console.log('Conectado a la base de datos TiendaDeMangas'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

// Motor de plantilla
app.set('view engine', 'ejs');

// Ruta para la raíz
app.get('/', (req, res) => {
    res.redirect('/mangas'); // Redirige a la ruta de mangas
});

// Usar el controlador de mangas
app.use('/', mangaController);

// Iniciar servidor en puerto 3000
app.listen(3000, function(){
    console.log('Servidor corriendo en el puerto 3000');
});
