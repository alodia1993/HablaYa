const pool = require('../config/db');

// Buscar usuario por email
const findUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

// Crear nuevo usuario
const createUser = async (nombre, email, passwordHash, rol = 'alumno') => {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
        [nombre, email, passwordHash, rol]
    );
    return result.rows[0];
};

module.exports = { findUserByEmail, createUser };