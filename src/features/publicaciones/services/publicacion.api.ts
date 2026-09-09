import { apiClient } from "../../../shared/lib/api/client";
import {
  PublicacionSchema,
  PublicacionesResponseSchema,
} from "../schemas/publicacion.schema";
import type {
  CrearPublicacionInput,
  ActualizarPublicacionInput,
} from "../types/publicacion.types";
import { aFechaApi } from "../utils/fecha";

/**
 * Normaliza el payload antes de enviarlo. La API es estricta con la fecha:
 * la exige cuando tipo=EVENTO y la rechaza cuando tipo=NOTICIA, así que el
 * campo se manda sólo para eventos. En el PATCH hay que mandar null para
 * borrar la fecha de una publicación que pasa de evento a noticia.
 */
function normalizarPayload<T extends ActualizarPublicacionInput>(
  input: T,
  { esActualizacion = false } = {},
) {
  const { fechaEvento, ...resto } = input;

  if (resto.tipo === "NOTICIA") {
    return esActualizacion ? { ...resto, fechaEvento: null } : resto;
  }

  const fechaNormalizada = aFechaApi(fechaEvento);

  return fechaNormalizada
    ? { ...resto, fechaEvento: fechaNormalizada }
    : resto;
}

export async function obtenerPublicaciones() {
  const { data } = await apiClient.get("/publicaciones");
  return PublicacionesResponseSchema.parse(data);
}

export async function obtenerPublicacionPorId(id: string) {
  const { data } = await apiClient.get(`/publicaciones/${id}`);
  return PublicacionSchema.parse(data);
}

export async function crearPublicacion(input: CrearPublicacionInput) {
  const { data } = await apiClient.post(
    "/publicaciones",
    normalizarPayload(input),
  );
  return PublicacionSchema.parse(data);
}

export async function actualizarPublicacion(
  id: string,
  input: ActualizarPublicacionInput
) {
  const { data } = await apiClient.patch(
    `/publicaciones/${id}`,
    normalizarPayload(input, { esActualizacion: true }),
  );
  return PublicacionSchema.parse(data);
}

export async function eliminarPublicacion(id: string) {
  await apiClient.delete(`/publicaciones/${id}`);
}
