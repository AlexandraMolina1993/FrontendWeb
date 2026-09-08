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
      return data.message;
    }

    if (error.code === "ERR_NETWORK" || !error.response) {
      return "No se pudo conectar con el servidor. Intentá de nuevo.";
    }

    return error.message;
  }

  return "Ocurrió un error inesperado.";
}
