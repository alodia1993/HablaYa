const { getAll, getById, getByNivel, create, update, remove } = require('../models/leccionModel');

// GET /api/lecciones
const getLecciones = async (req, res) => {
    try {
        const lecciones = await getAll();
        res.json(lecciones);
    } catch (error) {
        console.error('Error en getLecciones:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/lecciones/:id
const getLeccionById = async (req, res) => {
    try {
        const leccion = await getById(req.params.id);
        if (!leccion) {
            return res.status(404).json({ error: 'Lección no encontrada' });
        }
        res.json(leccion);
    } catch (error) {
        console.error('Error en getLeccionById:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/lecciones/nivel/:nivel
const getLeccionesByNivel = async (req, res) => {
    try {
        const lecciones = await getByNivel(req.params.nivel.toUpperCase());
        res.json(lecciones);
    } catch (error) {
        console.error('Error en getLeccionesByNivel:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/lecciones
const createLeccion = async (req, res) => {
    try {
        const { titulo, descripcion, nivel, orden } = req.body;
        if (!titulo || !nivel || !orden) {
            return res.status(400).json({ error: 'titulo, nivel y orden son obligatorios' });
        }
        const leccion = await create(titulo, descripcion, nivel, orden);
        res.status(201).json(leccion);
    } catch (error) {
        console.error('Error en createLeccion:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/lecciones/:id
const updateLeccion = async (req, res) => {
    try {
        const { titulo, descripcion, nivel, orden } = req.body;
        const leccion = await update(req.params.id, titulo, descripcion, nivel, orden);
        if (!leccion) {
            return res.status(404).json({ error: 'Lección no encontrada' });
        }
        res.json(leccion);
    } catch (error) {
        console.error('Error en updateLeccion:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// DELETE /api/lecciones/:id
const deleteLeccion = async (req, res) => {
    try {
        const leccion = await remove(req.params.id);
        if (!leccion) {
            return res.status(404).json({ error: 'Lección no encontrada' });
        }
        res.json({ mensaje: 'Lección eliminada correctamente' });
    } catch (error) {
        console.error('Error en deleteLeccion:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getLecciones, getLeccionById, getLeccionesByNivel, createLeccion, updateLeccion, deleteLeccion };