const pool = require('../config/db');

// Crear slot (admin)
const create = async (adminId, fecha, horaInicio, horaFin) => {
    const result = await pool.query(
        'INSERT INTO slots_tutoria (admin_id, fecha, hora_inicio, hora_fin) VALUES ($1, $2, $3, $4) RETURNING *',
        [adminId, fecha, horaInicio, horaFin]
    );
    return result.rows[0];
};

// Ver todos los slots disponibles
const getDisponibles = async () => {
    const result = await pool.query(
        'SELECT * FROM slots_tutoria WHERE disponible = true ORDER BY fecha, hora_inicio'
    );
    return result.rows;
};

// Ver todos los slots (admin)
const getAll = async () => {
    const result = await pool.query(
        'SELECT * FROM slots_tutoria ORDER BY fecha, hora_inicio'
    );
    return result.rows;
};

// Marcar slot como no disponible
const marcarNoDisponible = async (id) => {
    const result = await pool.query(
        'UPDATE slots_tutoria SET disponible = false WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

// Obtener slot por ID
const getById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM slots_tutoria WHERE id = $1',
        [id]
    );
    return result.rows[0];
};

module.exports = { create, getDisponibles, getAll, marcarNoDisponible, getById };