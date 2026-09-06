import { apiClient } from "../../../shared/lib/api/client";
import {
  PublicacionSchema,
  PublicacionesResponseSchema,
} from "../schemas/publicacion.schema";
import type {
  CrearPublicacionInput,
  ActualizarPublicacionInput,
} from "../types/publicacion.types";

export async function obtenerPublicaciones() {
  const { data } = await apiClient.get("/publicaciones");
  return PublicacionesResponseSchema.parse(data);
}

export async function obtenerPublicacionPorId(id: string) {
  const { data } = await apiClient.get(`/publicaciones/${id}`);
  return PublicacionSchema.parse(data);
}

export async function crearPublicacion(input: CrearPublicacionInput) {
  const { data } = await apiClient.post("/publicaciones", input);
  return PublicacionSchema.parse(data);
}

export async function actualizarPublicacion(
  id: string,
  input: ActualizarPublicacionInput
) {
  const { data } = await apiClient.patch(`/publicaciones/${id}`, input);
  return PublicacionSchema.parse(data);
}

export async function eliminarPublicacion(id: string) {
  await apiClient.delete(`/publicaciones/${id}`);
}