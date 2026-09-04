import axios from 'axios';

// Creamos la instancia principal con la URL del backend
export const apiClient = axios.create({
  baseURL: 'https://api-instituto.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Petición (Request): 
// Se ejecuta ANTES de que cualquier petición salga hacia el servidor.
apiClient.interceptors.request.use(
  (config) => {
    // Buscamos el token de seguridad guardado en el navegador
    const token = localStorage.getItem('token'); 
    
    // Si existe, se lo "inyectamos" a la cabecera para que el backend nos deje pasar
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta (Response):
// Se ejecuta CUANDO el servidor nos responde.
apiClient.interceptors.response.use(
  (response) => {
    // Si todo salió bien, devolvemos la respuesta tal cual
    return response;
  },
  (error) => {
    // Si el backend nos da un error 401 (No autorizado / Token vencido)
    if (error.response?.status === 401) {
      console.error("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
      // Aquí más adelante conectaremos la lógica de /api/Auth/Refresh
    }
    return Promise.reject(error);
  }
);