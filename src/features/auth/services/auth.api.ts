import { apiClient } from '../../../shared/lib/api/client';
import type { LoginInput, LoginResponse, Usuario } from '../types/auth.types';

export const authApi = {
  /**
   * Envía las credenciales al backend para iniciar sesión.
   * POST /api/usuarios/login
   */
  login: async (credentials: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/usuarios/login', credentials);
    return response.data;
  },

  /**
   * Obtiene los datos del perfil del usuario logueado.
   * GET /api/usuarios/perfil
   */
  getMe: async (): Promise<Usuario> => {
    const response = await apiClient.get<Usuario>('/usuarios/perfil');
    return response.data;
  },

  /**
   * Invalida la sesión actual en el backend.
   * POST /api/usuarios/logout
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/usuarios/logout');
  }
};