const { create: createSlot, getDisponibles, getAll: getAllSlots, marcarNoDisponible, getById } = require('../models/slotModel');
const { create: createReserva, getByUsuario, getAll: getAllReservas } = require('../models/reservaModel');
const { sendConfirmacionAlumno, sendAvisoProfesor } = require('../services/emailService');
const pool = require('../config/db');

// POST /api/slots - admin crea slot
const crearSlot = async (req, res) => {
    try {
        const { fecha, hora_inicio, hora_fin } = req.body;
        if (!fecha || !hora_inicio || !hora_fin) {
            return res.status(400).json({ error: 'fecha, hora_inicio y hora_fin son obligatorios' });
        }
        const slot = await createSlot(req.usuario.id, fecha, hora_inicio, hora_fin);
        res.status(201).json(slot);
    } catch (error) {
        console.error('Error en crearSlot:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/slots/disponibles - ver slots disponibles
const getSlotsDisponibles = async (req, res) => {
    try {
        const slots = await getDisponibles();
        res.json(slots);
    } catch (error) {
        console.error('Error en getSlotsDisponibles:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/slots - admin ve todos los slots
const getAllSlotsList = async (req, res) => {
    try {
        const slots = await getAllSlots();
        res.json(slots);
    } catch (error) {
        console.error('Error en getAllSlotsList:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// POST /api/reservas - alumno reserva slot
const crearReserva = async (req, res) => {
    try {
        const { slot_id } = req.body;
        if (!slot_id) {
            return res.status(400).json({ error: 'slot_id es obligatorio' });
        }

        // Verificar que el slot existe y está disponible
        const slot = await getById(slot_id);
        if (!slot) {
            return res.status(404).json({ error: 'Slot no encontrado' });
        }
        if (!slot.disponible) {
            return res.status(400).json({ error: 'Este slot ya no está disponible' });
        }

        // Crear la reserva
        const reserva = await createReserva(req.usuario.id, slot_id);

        // Marcar slot como no disponible
        await marcarNoDisponible(slot_id);

        // Obtener datos del alumno para el email
        const usuarioResult = await pool.query(
            'SELECT nombre, email FROM usuarios WHERE id = $1',
            [req.usuario.id]
        );
        const alumno = usuarioResult.rows[0];

        // Enviar emails
        try {
            await sendConfirmacionAlumno(alumno.email, alumno.nombre, slot);
            await sendAvisoProfesor(alumno.nombre, alumno.email, slot);
        } catch (emailError) {
            console.error('Error al enviar email:', emailError.message);
        }

        res.status(201).json({
            mensaje: 'Reserva confirmada correctamente',
            reserva
        });

    } catch (error) {
        console.error('Error en crearReserva:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/reservas/mias - alumno ve sus reservas
const getMisReservas = async (req, res) => {
    try {
        const reservas = await getByUsuario(req.usuario.id);
        res.json(reservas);
    } catch (error) {
        console.error('Error en getMisReservas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// GET /api/reservas - admin ve todas las reservas
const getAllReservasList = async (req, res) => {
    try {
        const reservas = await getAllReservas();
        res.json(reservas);
    } catch (error) {
        console.error('Error en getAllReservasList:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { crearSlot, getSlotsDisponibles, getAllSlotsList, crearReserva, getMisReservas, getAllReservasList };