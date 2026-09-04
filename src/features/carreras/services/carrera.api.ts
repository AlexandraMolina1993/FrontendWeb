import { apiClient } from "../../../shared/lib/api/client";
import { validateResponse } from "../../../shared/lib/validation/validate-response";

import { isCarrera, isCarreraList, validarFiltros } from "../schemas/carrera.schema";
import type { Carrera, CarreraListParams } from "../types/carrera.types";

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
    if (!id.trim()) {
      throw new Error("El identificador de la carrera no es válido.");
    }

    const response = await apiClient.get<unknown>(`/carreras/${id}`, { signal });

    return validateResponse(
      response.data,
      isCarrera,
      "El detalle de la carrera no tiene el formato esperado.",
    );
  },
};
