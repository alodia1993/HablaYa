const { create, getByUsuario, getPendientes, getAll, addCorreccion } = require('../models/redaccionModel');

// POST /api/redacciones - alumno envía redacción
const createRedaccion = async (req, res) => {
    try {
        const { leccion_id, titulo, contenido } = req.body;
        if (!titulo || !contenido) {
            return res.status(400).json({ error: 'titulo y contenido son obligatorios' });
        }
        const redaccion = await create(req.usuario.id, leccion_id, titulo, contenido);
        res.status(201).json(redaccion);
    } catch (error) {
        console.error('Error en createRedaccion:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/redacciones/mias - alumno ve sus redacciones
const getMisRedacciones = async (req, res) => {
    try {
        const redacciones = await getByUsuario(req.usuario.id);
        res.json(redacciones);
    } catch (error) {
        console.error('Error en getMisRedacciones:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/redacciones/pendientes - admin ve redacciones pendientes
const getRedaccionesPendientes = async (req, res) => {
    try {
        const redacciones = await getPendientes();
        res.json(redacciones);
    } catch (error) {
        console.error('Error en getRedaccionesPendientes:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/redacciones - admin ve todas las redacciones
const getAllRedacciones = async (req, res) => {
    try {
        const redacciones = await getAll();
        res.json(redacciones);
    } catch (error) {
        console.error('Error en getAllRedacciones:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/redacciones/:id - admin añade corrección
const corregirRedaccion = async (req, res) => {
    try {
        const { feedback, puntuacion } = req.body;
        if (!feedback || puntuacion === undefined) {
            return res.status(400).json({ error: 'feedback y puntuacion son obligatorios' });
        }
        const redaccion = await addCorreccion(req.params.id, feedback, puntuacion);
        if (!redaccion) {
            return res.status(404).json({ error: 'Redacción no encontrada' });
        }
        res.json(redaccion);
    } catch (error) {
        console.error('Error en corregirRedaccion:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { createRedaccion, getMisRedacciones, getRedaccionesPendientes, getAllRedacciones, corregirRedaccion };