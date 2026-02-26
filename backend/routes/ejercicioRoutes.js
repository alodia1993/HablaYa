const express = require('express');
const router = express.Router();
const { getEjerciciosByLeccion, getEjercicioById, createEjercicio, updateEjercicio, deleteEjercicio, corregirEjercicio } = require('../controllers/ejercicioController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas (cualquier rol autenticado)
router.get('/leccion/:leccionId', verifyToken, getEjerciciosByLeccion);
router.get('/:id', verifyToken, getEjercicioById);

// Corrección automática (cualquier alumno autenticado)
router.post('/:id/corregir', verifyToken, corregirEjercicio);

// Rutas solo para admin
router.post('/', verifyToken, isAdmin, createEjercicio);
router.put('/:id', verifyToken, isAdmin, updateEjercicio);
router.delete('/:id', verifyToken, isAdmin, deleteEjercicio);

module.exports = router;