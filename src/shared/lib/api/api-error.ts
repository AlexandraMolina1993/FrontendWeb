import { AxiosError } from "axios";

import { ValidationError } from "../validation/validate-response";

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  details?: Record<string, unknown>;
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.message) {
      if (data.details) {
        const detalles = Array.isArray(data.details)
          ? data.details
          : Object.entries(data.details).map(([campo, valor]) => `${campo}: ${String(valor)}`);
        const textoDetalles = detalles
          .map((detalle) => (typeof detalle === "string" ? detalle : JSON.stringify(detalle)))
          .filter(Boolean)
          .join("; ");
        return textoDetalles ? `${data.message} ${textoDetalles}` : data.message;
      }
      return data.message;
    }

    if (error.code === "ERR_NETWORK" || !error.response) {
      return "No se pudo conectar con el servidor. Intentá de nuevo.";
    }

    return error.message;
  }

  return "Ocurrió un error inesperado.";
}
