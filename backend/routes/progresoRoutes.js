const express = require('express');
const router = express.Router();
const { saveProgreso, marcarLeccionCompletada, getProgreso, getResumenProgreso } = require('../controllers/progresoController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Todas las rutas requieren token pero cualquier rol puede acceder
router.post('/', verifyToken, saveProgreso);
router.put('/leccion/:id', verifyToken, marcarLeccionCompletada);
router.get('/', verifyToken, getProgreso);
router.get('/resumen', verifyToken, getResumenProgreso);

module.exports = router;