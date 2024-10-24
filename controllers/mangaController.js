const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga');

// Obtener todos los mangas y renderizar la vista con la tabla
router.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.render('mangas', { mangas });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al obtener los mangas' });
  }
});

// Crear un nuevo manga
router.post('/mangas', async (req, res) => {
  try {
    const { NomManga, Autor, Genero, Precio, Disponibilidad } = req.body;
    const existingManga = await Manga.findOne({ NomManga: NomManga });
    if (existingManga) {
      return res.status(409).json({ error: 'Ya existe un manga con ese nombre' });
    }

    const nuevoManga = new Manga({
      NomManga,
      Autor,
      Genero,
      Precio,
      Disponibilidad,
    });
    await nuevoManga.save();
    res.redirect('/mangas');
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al crear el manga' });
  }
});

// Obtener un manga por NomManga para editar
router.get('/mangas/:nombre/edit', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const manga = await Manga.findOne({ NomManga: nombre });
    if (!manga) {
      return res.status(404).send('El manga no fue encontrado');
    }
    res.render('editManga', { manga });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al obtener el manga' });
  }
});

// Actualizar un manga por NomManga
router.put('/mangas/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const mangaActualizado = await Manga.findOneAndUpdate({ NomManga: nombre }, req.body, { new: true });
    if (!mangaActualizado) {
      return res.status(404).json({ error: 'El manga no fue encontrado' });
    }
    res.redirect('/mangas');
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al actualizar el manga' });
  }
});

// Eliminar un manga por NomManga
router.delete('/mangas/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const mangaEliminado = await Manga.findOneAndDelete({ NomManga: nombre });
    if (!mangaEliminado) {
      return res.status(404).send('El manga no fue encontrado para eliminar');
    }
    res.redirect('/mangas');
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al eliminar el manga' });
  }
});

module.exports = router;
