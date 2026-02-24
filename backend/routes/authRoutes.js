const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);


const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Ruta protegida solo para admin (prueba)
router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json({ mensaje: 'Bienvenido admin', usuario: req.usuario });
});

module.exports = router;