const pool = require('../config/db');

// Obtener todos los ejercicios de una lección
const getByLeccion = async (leccionId) => {
    const result = await pool.query(
        'SELECT * FROM ejercicios WHERE leccion_id = $1 ORDER BY orden',
        [leccionId]
    );
    return result.rows;
};

// Obtener ejercicio por ID
const getById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM ejercicios WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Crear ejercicio
const create = async (leccionId, titulo, tipo, contenido, orden) => {
    const result = await pool.query(
        'INSERT INTO ejercicios (leccion_id, titulo, tipo, contenido, orden) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [leccionId, titulo, tipo, JSON.stringify(contenido), orden]
    );
    return result.rows[0];
};

// Actualizar ejercicio
const update = async (id, titulo, tipo, contenido, orden) => {
    const result = await pool.query(
        'UPDATE ejercicios SET titulo = $1, tipo = $2, contenido = $3, orden = $4 WHERE id = $5 RETURNING *',
        [titulo, tipo, JSON.stringify(contenido), orden, id]
    );
    return result.rows[0];
};

// Eliminar ejercicio
const remove = async (id) => {
    const result = await pool.query(
        'DELETE FROM ejercicios WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = { getByLeccion, getById, create, update, remove };