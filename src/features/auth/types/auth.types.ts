// --- 1. DATOS DEL USUARIO ---
// Molde basado en el schema 'Usuario' del Swagger
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo?: boolean;
}

// --- 2. PETICIONES (REQUESTS) ---
// Lo que enviamos al backend cuando el usuario llena el formulario (LoginInput)
export interface LoginInput {
  email: string;
  password: string;
}

// Lo que enviamos si queremos recuperar la contraseña (RecuperarPasswordInput)
export interface RecuperarPasswordInput {
  email: string;
}

// --- 3. RESPUESTAS (RESPONSES) ---
// Lo que nos devuelve el backend al iniciar sesión con éxito (LoginResponse)
export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

// --- 4. MANEJO DE ERRORES ---
// El formato exacto definido por el backend en src/middlewares/error.middleware.js
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  details?: Record<string, any>;
}