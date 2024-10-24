const mongoose = require('mongoose');

// Crear un esquema para el documento (tabla)
const mangaSchema = new mongoose.Schema({
    NomManga: { type: String, required: true },
    Autor: { type: String, required: true },
    Genero: { type: String, required: true },
    Precio: { type: Number, required: true },
    Disponibilidad: { type: String, required: true },
}, {
    versionKey: false // Elimina el campo __v
});

// Exportar el modelo según el esquema
module.exports = mongoose.model('Manga', mangaSchema);
