
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ message: '🗣️ HablaYa! API funcionando correctamente' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/lecciones', require('./routes/leccionRoutes'));
app.use('/api/ejercicios', require('./routes/ejercicioRoutes'));

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});