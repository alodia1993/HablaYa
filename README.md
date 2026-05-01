# HablaYa! — Plataforma de Aprendizaje de Español

Aplicación web desarrollada como Proyecto Final del Ciclo Superior de Desarrollo de Aplicaciones Web (DAW).

HablaYa! es una plataforma para aprender español como lengua extranjera, diseñada para la profesora nativa certificada **Alodía H.**, con más de 7 años de experiencia y valoración ⭐ 5.0 en Preply.

---

## Demo en producción

| Servicio | URL |
|---|---|
| Frontend (Vercel) | https://habla-ya-gamma.vercel.app |
| Backend (Render) | https://hablaya-backend.onrender.com |

> El backend usa el plan gratuito de Render. La primera petición puede tardar ~50 segundos si el servidor está inactivo.

---

## Funcionalidades

- Registro e inicio de sesión con autenticación JWT
- Roles diferenciados: **alumno** y **admin**
- Catálogo de lecciones filtradas por nivel (A1 / A2 / B1 / B2)
- Ejercicios interactivos: opción múltiple, ordenar frases y comprensión lectora
- Corrección automática y registro de progreso
- Envío y corrección de redacciones (writing)
- Reserva de tutorías individuales con confirmación por email
- Panel de administración para gestionar lecciones, ejercicios, redacciones y slots
- Gráficas de progreso del alumno con Recharts

---

## Stack tecnológico

**Backend**
- Node.js + Express
- PostgreSQL (Neon) — patrón MVC
- JWT para autenticación
- Nodemailer (Gmail) para envío de emails
- bcrypt para cifrado de contraseñas

**Frontend**
- React + Vite
- React Router DOM
- Axios
- Recharts

---

## Estructura del proyecto

```
hablaya/
├── backend/
│   ├── config/          # Conexión a la base de datos
│   ├── controllers/     # Lógica de negocio
│   ├── middlewares/     # Verificación de token y roles
│   ├── models/          # Consultas SQL
│   ├── routes/          # Definición de endpoints
│   ├── services/        # Envío de emails
│   └── index.js         # Entrada del servidor
└── frontend/
    └── src/
        ├── components/  # Componentes reutilizables
        ├── context/     # Estado global de autenticación
        ├── pages/       # Vistas de la aplicación
        └── services/    # Cliente Axios
```

---

## Instalación local

### Requisitos previos
- Node.js 18+
- Cuenta en [Neon](https://neon.tech) con la base de datos creada

### Backend

```bash
cd backend
npm install
```

Crea el archivo `backend/.env` con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=<connection string de Neon>
JWT_SECRET=hablaya_clave_secreta_2024
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<tu email de Gmail>
EMAIL_PASS=<contraseña de aplicación de Gmail>
EMAIL_ADMIN=<tu email de Gmail>
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crea el archivo `frontend/.env` con:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Base de datos

Las tablas principales son:

| Tabla | Descripción |
|---|---|
| `usuarios` | Registro de alumnos y administradores |
| `lecciones` | Contenido por niveles (A1–B2) |
| `ejercicios` | Actividades interactivas en formato JSONB |
| `redacciones` | Textos enviados por alumnos y su corrección |
| `progreso` | Puntuaciones e intentos por ejercicio |
| `slots_tutoria` | Disponibilidad horaria de la profesora |
| `reservas` | Reservas de tutoría por alumno |

---

## API — Principales endpoints

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/lecciones
GET    /api/lecciones/:id
POST   /api/ejercicios/:id/corregir

POST   /api/redacciones
GET    /api/redacciones/mias

GET    /api/progreso
GET    /api/progreso/resumen

GET    /api/slots/disponibles
POST   /api/reservas
```

---

## Credenciales de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin2@hablaya.com | 123456 |
| Alumno | alodia@gmail.com | 123456 |

---

## Autora

Desarrollado por **Alodía H.** como proyecto final del Ciclo Superior de DAW.
