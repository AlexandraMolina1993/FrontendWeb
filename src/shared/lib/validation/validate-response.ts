export class ValidationError extends Error {
  readonly details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

export function validateResponse<T>(
  data: unknown,
  assert: (value: unknown) => value is T,
  mensaje = "La respuesta del servidor no tiene el formato esperado.",
): T {
  if (!assert(data)) {
    throw new ValidationError(mensaje, data);
  }

  return data;
}
