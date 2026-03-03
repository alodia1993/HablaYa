const pool = require('../config/db');

// Guardar resultado de un ejercicio
const saveEjercicioResult = async (usuarioId, leccionId, ejercicioId, puntuacion) => {
    const result = await pool.query(
        `INSERT INTO progreso (usuario_id, leccion_id, ejercicio_id, puntuacion, intentos, updated_at)
         VALUES ($1, $2, $3, $4, 1, CURRENT_TIMESTAMP)
         ON CONFLICT (usuario_id, leccion_id, ejercicio_id)
         DO UPDATE SET puntuacion = $4, intentos = progreso.intentos + 1, updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [usuarioId, leccionId, ejercicioId, puntuacion]
    );
    return result.rows[0];
};

// Marcar lección como completada
const completarLeccion = async (usuarioId, leccionId) => {
    const result = await pool.query(
        `INSERT INTO progreso (usuario_id, leccion_id, completado, updated_at)
         VALUES ($1, $2, true, CURRENT_TIMESTAMP)
         ON CONFLICT (usuario_id, leccion_id, ejercicio_id)
         DO UPDATE SET completado = true, updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [usuarioId, leccionId]
    );
    return result.rows[0];
};

// Obtener progreso completo del usuario
const getProgresoByUsuario = async (usuarioId) => {
    const result = await pool.query(
        `SELECT p.*, l.titulo as leccion_titulo, l.nivel, e.titulo as ejercicio_titulo
         FROM progreso p
         JOIN lecciones l ON p.leccion_id = l.id
         LEFT JOIN ejercicios e ON p.ejercicio_id = e.id
         WHERE p.usuario_id = $1
         ORDER BY l.nivel, l.orden`,
        [usuarioId]
    );
    return result.rows;
};

// Obtener resumen de progreso para gráficas
const getResumen = async (usuarioId) => {
    const result = await pool.query(
        `SELECT 
            l.nivel,
            COUNT(DISTINCT l.id) as total_lecciones,
            COUNT(DISTINCT CASE WHEN p.completado = true THEN l.id END) as lecciones_completadas,
            ROUND(AVG(p.puntuacion)) as puntuacion_media
         FROM lecciones l
         LEFT JOIN progreso p ON l.id = p.leccion_id AND p.usuario_id = $1
         GROUP BY l.nivel
         ORDER BY l.nivel`,
        [usuarioId]
    );
    return result.rows;
};

module.exports = { saveEjercicioResult, completarLeccion, getProgresoByUsuario, getResumen };