const pool = require('../config/db');

// Crear reserva
const create = async (usuarioId, slotId) => {
    const result = await pool.query(
        'INSERT INTO reservas (usuario_id, slot_id) VALUES ($1, $2) RETURNING *',
        [usuarioId, slotId]
    );
    return result.rows[0];
};

// Ver reservas del alumno
const getByUsuario = async (usuarioId) => {
    const result = await pool.query(
        `SELECT r.*, s.fecha, s.hora_inicio, s.hora_fin 
         FROM reservas r 
         JOIN slots_tutoria s ON r.slot_id = s.id 
         WHERE r.usuario_id = $1 
         ORDER BY s.fecha, s.hora_inicio`,
        [usuarioId]
    );
    return result.rows;
};

// Ver todas las reservas (admin)
const getAll = async () => {
    const result = await pool.query(
        `SELECT r.*, s.fecha, s.hora_inicio, s.hora_fin, u.nombre as nombre_alumno, u.email as email_alumno
         FROM reservas r
         JOIN slots_tutoria s ON r.slot_id = s.id
         JOIN usuarios u ON r.usuario_id = u.id
         ORDER BY s.fecha, s.hora_inicio`
    );
    return result.rows;
};

module.exports = { create, getByUsuario, getAll };