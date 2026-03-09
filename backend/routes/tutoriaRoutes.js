const express = require('express');
const router = express.Router();
const { crearSlot, getSlotsDisponibles, getAllSlotsList, crearReserva, getMisReservas, getAllReservasList } = require('../controllers/tutoriaController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas de slots
router.post('/slots', verifyToken, isAdmin, crearSlot);
router.get('/slots/disponibles', verifyToken, getSlotsDisponibles);
router.get('/slots', verifyToken, isAdmin, getAllSlotsList);

// Rutas de reservas
router.post('/reservas', verifyToken, crearReserva);
router.get('/reservas/mias', verifyToken, getMisReservas);
router.get('/reservas', verifyToken, isAdmin, getAllReservasList);

module.exports = router;