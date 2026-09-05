export interface Autor {
  id: string;
  nombre: string;
  apellido: string;
}

export interface Imagen {
  id: string;
  url: string;
  width: number;
  height: number;
  formato: string;
  bytes: number;
  createdAt: string;
}

export interface Album {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  fecha: string;
  activo: boolean;
  portadaId: string | null;
  portada: Imagen | null;
  cantidadImagenes: number;
  autorId: string;
  autor: Autor;
  createdAt: string;
  updatedAt: string;
}

export interface AlbumDetalle extends Album {
  imagenes: Imagen[];
}

export interface CrearAlbumInput {
  titulo: string;
  descripcion: string;
  fecha: string;
}

export type ActualizarAlbumInput = Partial<CrearAlbumInput>;