import { apiClient } from "../../../shared/lib/api/client";
import {
  AlbumSchema,
  AlbumsResponseSchema,
  AlbumDetalleSchema,
} from "../schemas/album.schema";
import type {
  CrearAlbumInput,
  ActualizarAlbumInput,
} from "../types/album.types";

export async function obtenerAlbums() {
  const { data } = await apiClient.get("/albums");
  return AlbumsResponseSchema.parse(data);
}

export async function obtenerAlbumPorId(id: string) {
  const { data } = await apiClient.get(`/albums/${id}`);
  return AlbumDetalleSchema.parse(data);
}

export async function crearAlbum(input: CrearAlbumInput) {
  const { data } = await apiClient.post("/albums", input);
  return AlbumSchema.parse(data);
}

export async function actualizarAlbum(id: string, input: ActualizarAlbumInput) {
  const { data } = await apiClient.patch(`/albums/${id}`, input);
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

  const { data } = await apiClient.post(`/albums/${id}/imagenes`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
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