export interface Autor {
  id: string;
  nombre: string;
  apellido: string;
}

export type TipoPublicacion = "NOTICIA" | "EVENTO";

export interface Publicacion {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  tipo: TipoPublicacion;
  imagenUrl: string;
  fechaEvento: string | null;
  destacada: boolean;
  autorId: string;
  autor: Autor;
  createdAt: string;
  updatedAt: string;
}

export interface CrearPublicacionInput {
  titulo: string;
  resumen: string;
  contenido: string;
  tipo: TipoPublicacion;
  imagenUrl: string;
  fechaEvento?: string;
  destacada?: boolean;
}

export type ActualizarPublicacionInput = Partial<CrearPublicacionInput>;