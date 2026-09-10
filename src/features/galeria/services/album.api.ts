import { apiClient } from "../../../shared/lib/api/client";
import {
  AlbumSchema,
  AlbumsResponseSchema,
  AlbumDetalleSchema,
  ImagenesSubidasSchema,
} from "../schemas/album.schema";
import type {
  CrearAlbumInput,
  ActualizarAlbumInput,
} from "../types/album.types";
import { aFechaApi } from "../utils/fecha";

/**
 * Pasa la fecha del <input type="date"> a ISO y descarta el campo si quedó
 * vacío, porque la API rechaza "".
 */
function normalizarPayload<T extends ActualizarAlbumInput>(input: T) {
  const { fecha, ...resto } = input;
  const fechaNormalizada = aFechaApi(fecha);

  return fechaNormalizada ? { ...resto, fecha: fechaNormalizada } : resto;
}

export async function obtenerAlbums() {
  const { data } = await apiClient.get("/albums");
  return AlbumsResponseSchema.parse(data);
}

export async function obtenerAlbumPorId(id: string) {
  const { data } = await apiClient.get(`/albums/${id}`);
  return AlbumDetalleSchema.parse(data);
}

export async function crearAlbum(input: CrearAlbumInput) {
  const { data } = await apiClient.post("/albums", normalizarPayload(input));
  return AlbumSchema.parse(data);
}

export async function actualizarAlbum(id: string, input: ActualizarAlbumInput) {
  const { data } = await apiClient.patch(
    `/albums/${id}`,
    normalizarPayload(input),
  );
  return AlbumSchema.parse(data);
}

export async function eliminarAlbum(id: string) {
  await apiClient.delete(`/albums/${id}`);
}

export async function reactivarAlbum(id: string) {
  const { data } = await apiClient.post(`/albums/${id}/reactivar`);
  return AlbumSchema.parse(data);
}

export async function subirImagenes(id: string, archivos: File[]) {
  const formData = new FormData();
  archivos.forEach((archivo) => {
    formData.append("imagenes", archivo);
  });

  // No fijamos Content-Type: el navegador tiene que generarlo junto con el
  // boundary del multipart. El default JSON del cliente rompería el upload.
  const { data } = await apiClient.post(`/albums/${id}/imagenes`, formData, {
    headers: { "Content-Type": undefined },
  });
  return ImagenesSubidasSchema.parse(data);
}

export async function eliminarImagen(albumId: string, imagenId: string) {
  await apiClient.delete(`/albums/${albumId}/imagenes/${imagenId}`);
}

export async function elegirPortada(albumId: string, imagenId: string) {
  const { data } = await apiClient.patch(`/albums/${albumId}/portada`, {
    imagenId,
  });
  return AlbumSchema.parse(data);
}
