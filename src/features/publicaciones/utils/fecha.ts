/**
 * Convierte una fecha ISO de la API ("2026-08-15T18:00:00.000Z") al formato
 * que espera un <input type="date"> ("2026-08-15"). Sin esta conversión el
 * input queda vacío al editar, porque sólo acepta yyyy-MM-dd.
 */
export function aFechaInput(fecha: string | null | undefined) {
  if (!fecha) return undefined;
  return fecha.slice(0, 10);
}

/**
 * Convierte el valor de un <input type="date"> a ISO para enviarlo a la API.
 * Devuelve undefined si el campo quedó vacío, para no mandar "" en el payload.
 */
export function aFechaApi(fecha: string | null | undefined) {
  if (!fecha) return undefined;

  const parseada = new Date(fecha);
  if (Number.isNaN(parseada.getTime())) return undefined;

  return parseada.toISOString();
}
