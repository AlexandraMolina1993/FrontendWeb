import { apiClient } from "../../../shared/lib/api/client";
import { validateResponse } from "../../../shared/lib/validation/validate-response";

import {
  isCarrera,
  isCarreraList,
  isSedeOpcionList,
  validarFiltros,
} from "../schemas/carrera.schema";
import type {
  Carrera,
  CarreraInput,
  CarreraListParams,
  CarreraUpdateInput,
  SedeOpcion,
} from "../types/carrera.types";

function paramsLimpios(params: CarreraListParams = {}) {
  const errores = validarFiltros(params);
  if (Object.keys(errores).length > 0) {
    throw new Error(Object.values(errores)[0]);
  }

  return {
    buscar: params.buscar?.trim() || undefined,
    modalidad: params.modalidad || undefined,
    sede: params.sede || undefined,
  };
}

function assertId(id: string) {
  if (!id.trim()) {
    throw new Error("El identificador de la carrera no es válido.");
  }
}

export const carreraApi = {
  /**
   * Lista carreras activas.
   * GET /api/carreras
   */
  listar: async (
    params: CarreraListParams = {},
    signal?: AbortSignal,
  ): Promise<Carrera[]> => {
    const response = await apiClient.get<unknown>("/carreras", {
      params: paramsLimpios(params),
      signal,
    });

    return validateResponse(
      response.data,
      isCarreraList,
      "El listado de carreras no tiene el formato esperado.",
    );
  },

  /**
   * Detalle de una carrera activa.
   * GET /api/carreras/{id}
   */
  obtenerPorId: async (id: string, signal?: AbortSignal): Promise<Carrera> => {
    assertId(id);

    const response = await apiClient.get<unknown>(`/carreras/${id}`, { signal });

    return validateResponse(
      response.data,
      isCarrera,
      "El detalle de la carrera no tiene el formato esperado.",
    );
  },

  /**
   * Crea una carrera. Requiere ADMIN.
   * POST /api/carreras
   */
  crear: async (data: CarreraInput): Promise<Carrera> => {
    const response = await apiClient.post<unknown>("/carreras", data);

    return validateResponse(
      response.data,
      isCarrera,
      "La carrera creada no tiene el formato esperado.",
    );
  },

  /**
   * Modifica una carrera. Requiere ADMIN.
   * PATCH /api/carreras/{id}
   */
  actualizar: async (
    id: string,
    data: CarreraUpdateInput,
  ): Promise<Carrera> => {
    assertId(id);

    const response = await apiClient.patch<unknown>(`/carreras/${id}`, data);

    return validateResponse(
      response.data,
      isCarrera,
      "La carrera actualizada no tiene el formato esperado.",
    );
  },

  /**
   * Baja lógica (activa: false). Requiere ADMIN.
   * DELETE /api/carreras/{id}
   */
  darDeBaja: async (id: string): Promise<void> => {
    assertId(id);
    await apiClient.delete(`/carreras/${id}`);
  },

  /**
   * Eliminación definitiva. No usar como acción principal.
   * DELETE /api/carreras/{id}/definitivo
   */
  eliminarDefinitivo: async (id: string): Promise<void> => {
    assertId(id);
    await apiClient.delete(`/carreras/${id}/definitivo`);
  },

  /**
   * Sedes activas para asignar a una carrera.
   * GET /api/sedes
   */
  listarSedes: async (signal?: AbortSignal): Promise<SedeOpcion[]> => {
    const response = await apiClient.get<unknown>("/sedes", { signal });

    return validateResponse(
      response.data,
      isSedeOpcionList,
      "El listado de sedes no tiene el formato esperado.",
    );
  },
};
