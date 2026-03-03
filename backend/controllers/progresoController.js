const { saveEjercicioResult, completarLeccion, getProgresoByUsuario, getResumen } = require('../models/progresoModel');

// POST /api/progreso - guardar resultado de ejercicio
const saveProgreso = async (req, res) => {
    try {
        const { leccion_id, ejercicio_id, puntuacion } = req.body;
        if (!leccion_id || !ejercicio_id || puntuacion === undefined) {
            return res.status(400).json({ error: 'leccion_id, ejercicio_id y puntuacion son obligatorios' });
        }
        const progreso = await saveEjercicioResult(req.usuario.id, leccion_id, ejercicio_id, puntuacion);
        res.status(201).json(progreso);
    } catch (error) {
        console.error('Error en saveProgreso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// PUT /api/progreso/leccion/:id - marcar lección como completada
const marcarLeccionCompletada = async (req, res) => {
    try {
        const progreso = await completarLeccion(req.usuario.id, req.params.id);
        res.json({ mensaje: 'Lección marcada como completada', progreso });
    } catch (error) {
        console.error('Error en marcarLeccionCompletada:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/progreso - obtener progreso completo
const getProgreso = async (req, res) => {
    try {
        const progreso = await getProgresoByUsuario(req.usuario.id);
        res.json(progreso);
    } catch (error) {
        console.error('Error en getProgreso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/progreso/resumen - obtener resumen para gráficas
const getResumenProgreso = async (req, res) => {
    try {
        const resumen = await getResumen(req.usuario.id);

        // Calcular nivel actual
        const nivelesCompletados = resumen
            .filter(r => r.lecciones_completadas > 0)
            .map(r => r.nivel);

        let nivelActual = 'A1';
        if (nivelesCompletados.includes('B2')) nivelActual = 'B2';
        else if (nivelesCompletados.includes('B1')) nivelActual = 'B1';
        else if (nivelesCompletados.includes('A2')) nivelActual = 'A2';

        res.json({ nivelActual, resumenPorNivel: resumen });
    } catch (error) {
        console.error('Error en getResumenProgreso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { saveProgreso, marcarLeccionCompletada, getProgreso, getResumenProgreso };