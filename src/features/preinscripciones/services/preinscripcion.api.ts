import { apiClient } from "../../../shared/lib/api/client";

export interface PreinscripcionInput {
  nombre: string;
  apellido: string;
  documento: string;
  fechaNacimiento: string;
  nacionalidad: string;
  direccion: string;
  localidad: string;
  provincia: string;
  email: string;
  telefono: string;
  carreraId: string;
}

export interface Preinscripcion extends PreinscripcionInput {
  id: string | number;
  estado?: string;
  createdAt?: string;
  carrera?: { id?: string | number; nombre?: string } | string;
}

export async function crearPreinscripcion(input: PreinscripcionInput) {
  const { data } = await apiClient.post("/preinscripciones", input);
  return data;
}

export async function obtenerPreinscripciones() {
  const { data } = await apiClient.get<Preinscripcion[]>("/preinscripciones");
  return data;
}
