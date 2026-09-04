import { apiClient } from '../../../shared/lib/api/client';
import type { Usuario } from '../../auth/types/auth.types';

export const usuarioApi = {
  /**
   * Obtiene la lista completa de todos los usuarios registrados.
   * GET /api/usuarios
   */
  obtenerTodos: async (): Promise<Usuario[]> => {
    const response = await apiClient.get<Usuario[]>('/usuarios');
    return response.data;
  },

  /**
   * Busca usuarios según un criterio específico.
   * GET /api/usuarios/buscar?query=...
   */
  buscar: async (query: string): Promise<Usuario[]> => {
    const response = await apiClient.get<Usuario[]>('/usuarios/buscar', {
      params: { query }
    });
    return response.data;
  },

  /**
   * Cambia el rol de un usuario específico.
   * PATCH /api/usuarios/{id}/rol
   */
  cambiarRol: async (id: string, nuevoRol: string): Promise<void> => {
    await apiClient.patch(`/usuarios/${id}/rol`, { rol: nuevoRol });
  },

  /**
   * Desactiva un usuario en el sistema.
   * PATCH /api/usuarios/{id}/desactivar
   */
  desactivar: async (id: string): Promise<void> => {
    await apiClient.patch(`/usuarios/${id}/desactivar`);
  }
};