import { apiClient } from "../../../shared/lib/api/client";
import { validateResponse } from "../../../shared/lib/validation/validate-response";
import axios from "axios";
import { isInformacionInstitucional } from "../schemas/institucional.schema";
import type { Autoridad, InformacionInstitucional, InstitucionalFormValues } from "../schemas/institucional.schema";

type InformacionInstitucionalPayload = Omit<InformacionInstitucional, "autoridades"> & {
  autoridades: Array<Autoridad | Omit<Autoridad, "id">>;
};

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
  actualizar: async (sedeId: string, data: InformacionInstitucionalPayload) => {
    const { id: _id, sedeId: _sedeId, createdAt: _createdAt, updatedAt: _updatedAt, autoridades, ...informacion } = data;
    const payload = {
      ...informacion,
      autoridades: autoridades.map((autoridad) => {
        const { imagen, ...autoridadSinImagen } = autoridad;
        const { id: _autoridadId, ...autoridadPayload } = autoridadSinImagen as Autoridad;
        return { ...autoridadPayload, ...(imagen ? { imagen } : {}) };
      }),
    };
    const response = await apiClient.put<unknown>(`/sedes/${encodeURIComponent(sedeId)}/informacion-institucional`, payload);
    return validateResponse(response.data, isInformacionInstitucional, "La respuesta institucional no tiene un formato válido.");
  },
  crear: async (sedeId: string, data: InstitucionalFormValues) => {
    const response = await apiClient.post<unknown>(`/sedes/${encodeURIComponent(sedeId)}/informacion-institucional`, data);
    return validateResponse(response.data, isInformacionInstitucional, "La información institucional no tiene un formato válido.");
  },
};