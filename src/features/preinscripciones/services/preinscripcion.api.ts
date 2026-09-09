import { apiClient } from "../../../shared/lib/api/client";

export interface CarreraPreinscripcion {
  id?: string | number | null;
  nombre?: string | null;
}

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
  estado?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  carrera?: CarreraPreinscripcion | string | null;
}

export async function crearPreinscripcion(input: PreinscripcionInput) {
  const payload = {
    ...input,
    documento: input.documento.trim(),
    email: input.email.trim(),
    telefono: input.telefono.trim(),
  };

  const { data } = await apiClient.post("/preinscripciones", payload);
  return data;
}

export async function obtenerPreinscripciones() {
  const { data } = await apiClient.get<Preinscripcion[]>("/preinscripciones");
  return data;
}
