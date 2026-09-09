import { apiClient } from "../../../shared/lib/api/client";
import { validateResponse } from "../../../shared/lib/validation/validate-response";
import axios from "axios";
import { isAutoridad, isAutoridadList, isInformacionInstitucional } from "../schemas/institucional.schema";
import type { Autoridad, InformacionInstitucional, InstitucionalFormValues } from "../schemas/institucional.schema";

export const institucionalApi = {
  obtener: async (sedeId: string, signal?: AbortSignal) => {
    try {
      const response = await apiClient.get<unknown>(`/sedes/${encodeURIComponent(sedeId)}/informacion-institucional`, { signal });
      return validateResponse(response.data, isInformacionInstitucional, "La información institucional no tiene un formato válido.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  },
  actualizar: async (sedeId: string, data: InformacionInstitucional) => {
    const response = await apiClient.put<unknown>(`/sedes/${encodeURIComponent(sedeId)}/informacion-institucional`, data);
    return validateResponse(response.data, isInformacionInstitucional, "La respuesta institucional no tiene un formato válido.");
  },
  crear: async (sedeId: string, data: InstitucionalFormValues) => {
    const response = await apiClient.post<unknown>(`/sedes/${encodeURIComponent(sedeId)}/informacion-institucional`, data);
    return validateResponse(response.data, isInformacionInstitucional, "La información institucional no tiene un formato válido.");
  },
  listarAutoridades: async (signal?: AbortSignal) => {
    const response = await apiClient.get<unknown>("/Authority", { signal });
    return validateResponse(response.data, isAutoridadList, "El listado de autoridades no tiene un formato válido.");
  },
  crearAutoridad: async (data: Omit<Autoridad, "id">) => {
    const response = await apiClient.post<unknown>("/Authority", data);
    return validateResponse(response.data, isAutoridad, "La autoridad creada no tiene un formato válido.");
  },
  actualizarAutoridad: async (id: string, data: Omit<Autoridad, "id">) => {
    const response = await apiClient.put<unknown>(`/Authority/${id}`, data);
    return validateResponse(response.data, isAutoridad, "La autoridad actualizada no tiene un formato válido.");
  },
  eliminarAutoridad: async (id: string) => {
    await apiClient.delete(`/Authority/${id}`);
  },
};