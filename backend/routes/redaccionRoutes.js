const express = require('express');
const router = express.Router();
const { createRedaccion, getMisRedacciones, getRedaccionesPendientes, getAllRedacciones, corregirRedaccion } = require('../controllers/redaccionController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas para alumnos
router.post('/', verifyToken, createRedaccion);
router.get('/mias', verifyToken, getMisRedacciones);

// Rutas solo para admin
router.get('/pendientes', verifyToken, isAdmin, getRedaccionesPendientes);
router.get('/', verifyToken, isAdmin, getAllRedacciones);
router.put('/:id', verifyToken, isAdmin, corregirRedaccion);

module.exports = router;