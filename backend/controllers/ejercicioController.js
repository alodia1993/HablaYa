const { getByLeccion, getById, create, update, remove } = require('../models/ejercicioModel');

// GET /api/ejercicios/leccion/:leccionId
const getEjerciciosByLeccion = async (req, res) => {
    try {
        const ejercicios = await getByLeccion(req.params.leccionId);
        res.json(ejercicios);
    } catch (error) {
        console.error('Error en getEjerciciosByLeccion:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/ejercicios/:id
const getEjercicioById = async (req, res) => {
    try {
        const ejercicio = await getById(req.params.id);
        if (!ejercicio) {
            return res.status(404).json({ error: 'Ejercicio no encontrado' });
        }
        res.json(ejercicio);
    } catch (error) {
        console.error('Error en getEjercicioById:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/ejercicios
const createEjercicio = async (req, res) => {
    try {
        const { leccion_id, titulo, tipo, contenido, orden } = req.body;
        if (!leccion_id || !titulo || !tipo || !contenido || !orden) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const ejercicio = await create(leccion_id, titulo, tipo, contenido, orden);
        res.status(201).json(ejercicio);
    } catch (error) {
        console.error('Error en createEjercicio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/ejercicios/:id
const updateEjercicio = async (req, res) => {
    try {
        const { titulo, tipo, contenido, orden } = req.body;
        const ejercicio = await update(req.params.id, titulo, tipo, contenido, orden);
        if (!ejercicio) {
            return res.status(404).json({ error: 'Ejercicio no encontrado' });
        }
        res.json(ejercicio);
    } catch (error) {
        console.error('Error en updateEjercicio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// DELETE /api/ejercicios/:id
const deleteEjercicio = async (req, res) => {
    try {
        const ejercicio = await remove(req.params.id);
        if (!ejercicio) {
            return res.status(404).json({ error: 'Ejercicio no encontrado' });
        }
        res.json({ mensaje: 'Ejercicio eliminado correctamente' });
    } catch (error) {
        console.error('Error en deleteEjercicio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/ejercicios/:id/corregir
const corregirEjercicio = async (req, res) => {
    try {
        const ejercicio = await getById(req.params.id);
        if (!ejercicio) {
            return res.status(404).json({ error: 'Ejercicio no encontrado' });
        }

        const { respuesta } = req.body;
        const contenido = ejercicio.contenido;
        let correcto = false;

        if (ejercicio.tipo === 'opcion_multiple') {
            // La respuesta correcta está en contenido.respuesta_correcta
            correcto = respuesta === contenido.respuesta_correcta;
        } else if (ejercicio.tipo === 'ordenar_frases') {
            // La respuesta es un array que debe coincidir con contenido.orden_correcto
            correcto = JSON.stringify(respuesta) === JSON.stringify(contenido.orden_correcto);
        }

        res.json({
            correcto,
            mensaje: correcto ? '✅ ¡Respuesta correcta!' : '❌ Respuesta incorrecta',
            respuesta_correcta: contenido.respuesta_correcta || contenido.orden_correcto
        });

    } catch (error) {
        console.error('Error en corregirEjercicio:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getEjerciciosByLeccion, getEjercicioById, createEjercicio, updateEjercicio, deleteEjercicio, corregirEjercicio };