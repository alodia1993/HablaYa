const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Email de confirmación al alumno
const sendConfirmacionAlumno = async (emailAlumno, nombreAlumno, slot) => {
    await transporter.sendMail({
        from: `"HablaYa!" <${process.env.EMAIL_USER}>`,
        to: emailAlumno,
        subject: '✅ Confirmación de tutoría - HablaYa!',
        html: `
            <h2>¡Tutoría confirmada!</h2>
            <p>Hola <strong>${nombreAlumno}</strong>,</p>
            <p>Tu tutoría ha sido reservada correctamente:</p>
            <ul>
                <li><strong>Fecha:</strong> ${slot.fecha}</li>
                <li><strong>Hora:</strong> ${slot.hora_inicio} - ${slot.hora_fin}</li>
            </ul>
            <p>¡Nos vemos pronto!</p>
            <p>El equipo de <strong>HablaYa!</strong></p>
        `,
    });
};

// Email de aviso a la profesora
const sendAvisoProfesor = async (nombreAlumno, emailAlumno, slot) => {
    await transporter.sendMail({
        from: `"HablaYa!" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_ADMIN,
        subject: '📅 Nueva reserva de tutoría - HablaYa!',
        html: `
            <h2>Nueva reserva de tutoría</h2>
            <p>El alumno <strong>${nombreAlumno}</strong> (${emailAlumno}) ha reservado una tutoría:</p>
            <ul>
                <li><strong>Fecha:</strong> ${slot.fecha}</li>
                <li><strong>Hora:</strong> ${slot.hora_inicio} - ${slot.hora_fin}</li>
            </ul>
        `,
    });
};

module.exports = { sendConfirmacionAlumno, sendAvisoProfesor };