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
const createUser = async (nombre, email, passwordHash, rol = 'alumno', apellido = null, pais = null, ciudad = null, codigoPostal = null) => {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password_hash, rol, apellido, pais, ciudad, codigo_postal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, nombre, apellido, email, rol',
        [nombre, email, passwordHash, rol, apellido, pais, ciudad, codigoPostal]
    );
    return result.rows[0];
};

module.exports = { findUserByEmail, createUser };