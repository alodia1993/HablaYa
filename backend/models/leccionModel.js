const pool = require('../config/db');

// Obtener todas las lecciones
const getAll = async () => {
    const result = await pool.query(
        'SELECT * FROM lecciones WHERE activo = true ORDER BY nivel, orden'
    );
    return result.rows;
};

// Obtener lección por ID
const getById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM lecciones WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

// Obtener lecciones por nivel (A1, A2, B1, B2)
const getByNivel = async (nivel) => {
    const result = await pool.query(
        'SELECT * FROM lecciones WHERE nivel = $1 AND activo = true ORDER BY orden',
        [nivel]
    );
    return result.rows;
};

// Crear lección
const create = async (titulo, descripcion, nivel, orden) => {
    const result = await pool.query(
        'INSERT INTO lecciones (titulo, descripcion, nivel, orden) VALUES ($1, $2, $3, $4) RETURNING *',
        [titulo, descripcion, nivel, orden]
    );
    return result.rows[0];
};

// Actualizar lección
const update = async (id, titulo, descripcion, nivel, orden) => {
    const result = await pool.query(
        'UPDATE lecciones SET titulo = $1, descripcion = $2, nivel = $3, orden = $4 WHERE id = $5 RETURNING *',
        [titulo, descripcion, nivel, orden, id]
    );
    return result.rows[0];
};

// Eliminar lección (borrado lógico)
const remove = async (id) => {
    const result = await pool.query(
        'UPDATE lecciones SET activo = false WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = { getAll, getById, getByNivel, create, update, remove };