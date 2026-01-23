# Arkadia Game Portal - Backend

Backend API para Arkadia Game Portal construido con **Express.js** y **MongoDB**. Proporciona autenticación (JWT + Google OAuth), gestión de juegos (CRUD) y sistema de reviews.

## Demo
- **Frontend:** https://arkadia-game-portal-project-frontend.vercel.app/
- **Backend API:** https://arkadia-game-portal-project-backend.vercel.app/

## Configuración Rápida

### 1. Instalación
```bash
npm install
```

### 2. Variables de Entorno
Crea un archivo `.env`:
```env
PORT=5005
ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/arkadia-gamePortal-project-backend
TOKEN_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Ejecutar
```bash
npm run dev
```
Servidor corriendo en `http://localhost:5005`

Servidor corriendo en `http://localhost:5005`

## Principales Endpoints

### Autenticación
- `POST /api/auth/signup` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión (devuelve JWT)
- `GET /api/auth/verify` - Verificar token (requiere auth)
- `POST /api/auth/google` - Login con Google OAuth

### Juegos
- `GET /api/games` - Listar juegos (opcional: `?platform=PC`)
- `GET /api/games/:id` - Obtener juego específico
- `POST /api/games` - Crear juego (admin)
- `PUT /api/games/:id` - Actualizar juego (admin)
- `DELETE /api/games/:id` - Eliminar juego (admin)

### Reviews
- `GET /api/reviews/game/:gameId` - Reviews de un juego
- `POST /api/reviews/game/:gameId` - Crear review (requiere auth)
- `PUT /api/reviews/:id` - Editar review (propietario/admin)
- `DELETE /api/reviews/:id` - Eliminar review (propietario/admin)

### Admin
- `GET /api/auth/admin/users` - Listar usuarios (admin)
- `PUT /api/auth/admin/users/:id` - Actualizar usuario (admin)
- `DELETE /api/auth/admin/users/:id` - Eliminar usuario (admin)

## Tecnologías
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- Google OAuth
- Cloudinary (imágenes)

## Estructura del Proyecto
```
backend/
├── models/          # Esquemas Mongoose
├── routes/          # Endpoints API
├── middleware/      # Auth y admin
├── config/          # Configuración
├── db/              # Conexión MongoDB
└── error-handling/  # Manejo de errores
```

---

Desarrollado como proyecto del Bootcamp Ironhack
