const express = require('express');
const router = express.Router();
const { getLecciones, getLeccionById, getLeccionesByNivel, createLeccion, updateLeccion, deleteLeccion } = require('../controllers/leccionController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas públicas (solo necesitan token, cualquier rol)
router.get('/', verifyToken, getLecciones);
router.get('/nivel/:nivel', verifyToken, getLeccionesByNivel);
router.get('/:id', verifyToken, getLeccionById);

// Rutas solo para admin
router.post('/', verifyToken, isAdmin, createLeccion);
router.put('/:id', verifyToken, isAdmin, updateLeccion);
router.delete('/:id', verifyToken, isAdmin, deleteLeccion);

module.exports = router;