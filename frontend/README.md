# HablaYa! — Frontend

Interfaz de usuario de la plataforma HablaYa!, desarrollada con **React + Vite**.

Para la documentación completa del proyecto consulta el [README principal](../README.md).

---

## Tecnologías

- React 19
- Vite
- React Router DOM
- Axios
- Recharts

## Instalación

```bash
npm install
```

Crea el archivo `.env` en esta carpeta:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

La aplicación arranca en `http://localhost:5173`.

## Páginas principales

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/login` | Inicio de sesión |
| `/register` | Registro de nuevo alumno |
| `/dashboard` | Panel del alumno |
| `/lecciones` | Catálogo de lecciones |
| `/lecciones/:id` | Detalle de lección con ejercicios |
| `/writing` | Envío y seguimiento de redacciones |
| `/progreso` | Gráficas de progreso |
| `/tutorias` | Reserva de tutorías |
| `/admin` | Panel de administración (solo admin) |
