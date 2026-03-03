const pool = require('../config/db');

// Crear redacción (alumno)
const create = async (usuarioId, leccionId, titulo, contenido) => {
    const result = await pool.query(
        'INSERT INTO redacciones (usuario_id, leccion_id, titulo, contenido) VALUES ($1, $2, $3, $4) RETURNING *',
        [usuarioId, leccionId, titulo, contenido]
    );
    return result.rows[0];
};

// Ver redacciones del alumno
const getByUsuario = async (usuarioId) => {
    const result = await pool.query(
        'SELECT * FROM redacciones WHERE usuario_id = $1 ORDER BY created_at DESC',
        [usuarioId]
    );
    return result.rows;
};

// Ver todas las redacciones pendientes (admin)
const getPendientes = async () => {
    const result = await pool.query(
        "SELECT r.*, u.nombre as nombre_alumno FROM redacciones r JOIN usuarios u ON r.usuario_id = u.id WHERE r.estado = 'pendiente' ORDER BY r.created_at ASC"
    );
    return result.rows;
};

// Ver todas las redacciones (admin)
const getAll = async () => {
    const result = await pool.query(
        'SELECT r.*, u.nombre as nombre_alumno FROM redacciones r JOIN usuarios u ON r.usuario_id = u.id ORDER BY r.created_at DESC'
    );
    return result.rows;
};

// Añadir corrección (admin)
const addCorreccion = async (id, feedback, puntuacion) => {
    const result = await pool.query(
        "UPDATE redacciones SET feedback = $1, puntuacion = $2, estado = 'revisada' WHERE id = $3 RETURNING *",
        [feedback, puntuacion, id]
    );
    return result.rows[0];
};

module.exports = { create, getByUsuario, getPendientes, getAll, addCorreccion };