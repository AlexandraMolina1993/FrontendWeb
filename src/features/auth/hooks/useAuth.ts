import { useState } from 'react';
import { useAuthStore } from '../../../app/stores/auth.store';
import { authApi } from '../services/auth.api';
import type { LoginInput } from '../types/auth.types';
import { AxiosError } from 'axios';

export const useAuth = () => {
  // Extraemos las funciones de nuestro "cerebro" (el store)
  const { usuario, isAuthenticated, setCredentials, logout } = useAuthStore();
  
  // Estados locales para manejar la carga y los mensajes de error en la pantalla
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Llamamos a la API
      const response = await authApi.login(credentials);
      // 2. Si todo sale bien, guardamos el token y el usuario en el estado global
      setCredentials(response.usuario, response.token);
    } catch (err) {
      // 3. Si falla, capturamos el mensaje de error del backend
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message || 'Error al iniciar sesión');
      } else {
        setError('Ocurrió un error de conexión inesperado');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Opcional: avisarle al backend que cerramos sesión
      await authApi.logout();
    } catch (error) {
      console.error("Error en el logout del servidor", error);
    } finally {
      // Siempre borramos los datos locales, sin importar si el backend respondió bien o mal
      logout(); 
    }
  };

  return {
    usuario,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: handleLogout,
  };
};