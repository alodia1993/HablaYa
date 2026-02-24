const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');

// REGISTRO
const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Comprobar si el usuario ya existe
        const usuarioExistente = await findUserByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear el usuario
        const nuevoUsuario = await createUser(nombre, email, passwordHash, rol);

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.error('Error en register:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario
        const usuario = await findUserByEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            mensaje: 'Login correcto',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error en login:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { register, login };