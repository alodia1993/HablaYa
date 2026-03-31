# HablaYa! — Contexto del Proyecto para Claude Code

## Descripción
Aplicación web para aprender español como lengua extranjera. La profesora es Alodía H., profesora nativa certificada con 7+ años de experiencia. El objetivo es captar alumnos y ofrecer una plataforma de aprendizaje interactivo.

## Stack Tecnológico
- **Backend:** Node.js + Express + PostgreSQL (Neon) — patrón MVC
- **Frontend:** React + Vite
- **Auth:** JWT con roles (alumno / admin)
- **Email:** Nodemailer con Gmail
- **Gráficas:** Recharts
- **Repositorio GitHub:** https://github.com/alodia1993/HablaYa.git

## URLs de Producción
- **Frontend (Vercel):** https://habla-ya-gamma.vercel.app
- **Backend (Render):** https://hablaya-backend.onrender.com
- **Base de datos:** PostgreSQL en Neon (ya configurada)

## Credenciales de Prueba
- **Admin:** admin2@hablaya.com / 123456
- **Alumno:** alodia@gmail.com / 123456

## Estructura del Proyecto
```
hablaya/
├── backend/
│   ├── config/
│   │   └── db.js                    # Conexión a PostgreSQL Neon
│   ├── controllers/
│   │   ├── authController.js        # register, login
│   │   ├── leccionController.js     # CRUD lecciones
│   │   ├── ejercicioController.js   # CRUD ejercicios + corrección automática
│   │   ├── redaccionController.js   # Writing + corrección admin
│   │   ├── progresoController.js    # Progreso alumno + resumen gráficas
│   │   └── tutoriaController.js     # Slots + reservas + emails
│   ├── middlewares/
│   │   └── authMiddleware.js        # verifyToken, isAdmin
│   ├── models/
│   │   ├── userModel.js
│   │   ├── leccionModel.js
│   │   ├── ejercicioModel.js
│   │   ├── redaccionModel.js
│   │   ├── progresoModel.js
│   │   ├── slotModel.js
│   │   └── reservaModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leccionRoutes.js
│   │   ├── ejercicioRoutes.js
│   │   ├── redaccionRoutes.js
│   │   ├── progresoRoutes.js
│   │   └── tutoriaRoutes.js         # monta /api/slots y /api/reservas
│   ├── services/
│   │   └── emailService.js          # sendConfirmacionAlumno, sendAvisoProfesor
│   ├── .env                         # Variables locales (NO subir a GitHub)
│   ├── .gitignore
│   └── index.js                     # Entrada del servidor
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AdminRoute.jsx        # Redirige si no es admin
    │   │   ├── PrivateRoute.jsx      # Redirige si no hay sesión
    │   │   ├── Navbar.jsx            # Menú de navegación por rol
    │   │   ├── EjercicioOpcionMultiple.jsx
    │   │   ├── EjercicioOrdenarFrases.jsx
    │   │   └── EjercicioReading.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx       # Estado global de autenticación + JWT
    │   ├── pages/
    │   │   ├── Home.jsx              # ⚠️ CREADO PERO NO INTEGRADO AÚN
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx         # Panel alumno (básico)
    │   │   ├── Lecciones.jsx         # Lista lecciones con filtro por nivel
    │   │   ├── LeccionDetalle.jsx    # Detalle + ejercicios interactivos
    │   │   ├── Writing.jsx           # Enviar/ver redacciones
    │   │   ├── Progreso.jsx          # Gráficas Recharts
    │   │   ├── Tutorias.jsx          # Reservar slots disponibles
    │   │   └── admin/
    │   │       ├── AdminLecciones.jsx
    │   │       ├── AdminRedacciones.jsx
    │   │       └── AdminTutorias.jsx
    │   ├── services/
    │   │   └── api.js                # Axios con baseURL y token JWT
    │   ├── App.jsx                   # Router principal
    │   └── main.jsx
    ├── .env                          # VITE_API_URL=https://hablaya-backend.onrender.com/api
    └── vite.config.js
```

## Base de Datos (Neon PostgreSQL)
### Tablas creadas:
- **usuarios** — id, nombre, email, password_hash, rol (alumno/admin), activo, created_at
- **lecciones** — id, titulo, descripcion, nivel (A1/A2/B1/B2), orden, activo, created_at
- **ejercicios** — id, leccion_id, titulo, tipo (opcion_multiple/ordenar_frases/reading), contenido (JSONB), orden, created_at
- **redacciones** — id, usuario_id, leccion_id, titulo, contenido, feedback, puntuacion, estado (pendiente/revisada), created_at
- **progreso** — id, usuario_id, leccion_id, ejercicio_id, completado, puntuacion, intentos, updated_at
- **slots_tutoria** — id, admin_id, fecha, hora_inicio, hora_fin, disponible, created_at
- **reservas** — id, usuario_id, slot_id, estado (confirmada/cancelada), created_at

## API Endpoints
```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/lecciones
GET    /api/lecciones/:id
GET    /api/lecciones/nivel/:nivel
POST   /api/lecciones              (admin)
PUT    /api/lecciones/:id          (admin)
DELETE /api/lecciones/:id          (admin)

GET    /api/ejercicios/leccion/:id
GET    /api/ejercicios/:id
POST   /api/ejercicios/:id/corregir
POST   /api/ejercicios              (admin)
PUT    /api/ejercicios/:id          (admin)
DELETE /api/ejercicios/:id          (admin)

POST   /api/redacciones
GET    /api/redacciones/mias
GET    /api/redacciones/pendientes  (admin)
GET    /api/redacciones             (admin)
PUT    /api/redacciones/:id         (admin)

POST   /api/progreso
PUT    /api/progreso/leccion/:id
GET    /api/progreso
GET    /api/progreso/resumen

POST   /api/slots                   (admin)
GET    /api/slots/disponibles
GET    /api/slots                   (admin)
POST   /api/reservas
GET    /api/reservas/mias
GET    /api/reservas                (admin)
```

## Rutas del Frontend (App.jsx)
```
/                → redirige a /home
/home            → ⚠️ PENDIENTE DE INTEGRAR (Home.jsx creado)
/login           → Login.jsx
/register        → Register.jsx
/dashboard       → Dashboard.jsx (privado)
/lecciones       → Lecciones.jsx (privado)
/lecciones/:id   → LeccionDetalle.jsx (privado)
/writing         → Writing.jsx (privado)
/progreso        → Progreso.jsx (privado)
/tutorias        → Tutorias.jsx (privado)
/admin           → Admin.jsx con menú lateral (solo admin)
```

## ⚠️ TAREA PENDIENTE — Lo que hay que hacer ahora

### 1. Integrar Home.jsx en App.jsx
El archivo `Home.jsx` ya está creado pero NO está registrado como ruta en `App.jsx`.

Hay que:
1. Añadir el import en `App.jsx`: `import Home from './pages/Home';`
2. Cambiar la ruta `/` de `<Navigate to="/login" />` a `<Home />`
3. En `Navbar.jsx`, ocultar la navbar en la ruta `/home` o `/` para que no aparezca sobre la landing

### 2. Ajustes en Navbar.jsx
La Navbar actual aparece en todas las páginas incluida la landing. Hay que ocultarla en `/` y `/home` para que la landing tenga su propio menú integrado (ya incluido en Home.jsx).

### 3. Ajustes visuales pendientes
- La página se ve con una franja blanca en móvil (falta añadir `margin: 0` al body en `index.css`)
- El Dashboard del alumno está muy básico, mejorar con accesos directos a lecciones, progreso, etc.
- Añadir foto de la profesora en el Hero de Home.jsx cuando esté disponible

## Información de la Profesora (para contenido)
- **Nombre:** Alodía H.
- **Perfil Preply:** https://preply.com/es/profesor/816658
- **Enlace reserva Preply:** https://preply.in/ALOD%C3%8DA6ES301407710?ts=17746130
- **Valoración:** ⭐ 5.0 — 17 reseñas — 897 clases
- **Especialidades:** DELE/SIELE, conversación, gramática, niños, español de negocios, intensivo
- **Precio:** 30$ por clase de 50 minutos

## Variables de Entorno Backend (.env)
```
PORT=3000
NODE_ENV=development
DATABASE_URL=<connection string de Neon>
JWT_SECRET=hablaya_clave_secreta_2024
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<email de Gmail>
EMAIL_PASS=<contraseña de aplicación de Gmail>
EMAIL_ADMIN=<email de Gmail>
```

## Variables de Entorno Frontend (.env)
```
VITE_API_URL=https://hablaya-backend.onrender.com/api
```

## CORS configurado en backend/index.js
```javascript
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://habla-ya-gamma.vercel.app',
        /\.vercel\.app$/
    ],
    credentials: true
}));
```

## Notas Importantes
- El `.gitignore` de la raíz excluye `node_modules/`, `package.json` y `package-lock.json`
- El backend tiene un `.gitignore` propio que excluye `.env`
- Render usa plan Free: el servidor se duerme tras inactividad (primera petición tarda ~50s)
- Cada `git push` a main actualiza automáticamente Render y Vercel
