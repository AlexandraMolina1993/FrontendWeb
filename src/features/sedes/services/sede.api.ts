import { apiClient } from "../../../shared/lib/api/client";
import { validateResponse } from "../../../shared/lib/validation/validate-response";
import { isSede, isSedeList } from "../schemas/sede.schema";
import type { Sede } from "../schemas/sede.schema";

export const sedeApi = {
  listar: async (signal?: AbortSignal) => {
    const response = await apiClient.get<unknown>("/sedes", { signal });
    return validateResponse(response.data, isSedeList, "El listado de sedes no tiene un formato válido.");
  },
  obtenerPorId: async (id: string, signal?: AbortSignal) => {
    const response = await apiClient.get<unknown>(`/sedes/${id}`, { signal });
    return validateResponse(response.data, isSede, "El detalle de la sede no tiene un formato válido.");
  },
  crear: async (data: Omit<Sede, "id">) => {
    const response = await apiClient.post<unknown>("/sedes", data);
    return validateResponse(response.data, isSede, "La sede creada no tiene un formato válido.");
  },
  actualizar: async (id: string, data: Omit<Sede, "id">) => {
    const response = await apiClient.put<unknown>(`/sedes/${id}`, data);
    return validateResponse(response.data, isSede, "La sede actualizada no tiene un formato válido.");
  },
  cambiarEstado: async (id: string, activa: boolean) => {
    const response = await apiClient.patch<unknown>(`/sedes/${id}/status`, { activa });
    return validateResponse(response.data, isSede, "El estado de la sede no tiene un formato válido.");
  },
  eliminar: async (id: string) => {
    await apiClient.delete(`/sedes/${id}`);
  },
};