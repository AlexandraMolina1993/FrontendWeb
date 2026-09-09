import { z } from "zod";

export const AutorSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido: z.string(),
});

export const ImagenSchema = z.object({
  id: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  formato: z.string(),
  bytes: z.number(),
  createdAt: z.string(),
});

export const AlbumSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  slug: z.string(),
  descripcion: z.string(),
  fecha: z.string(),
  activo: z.boolean(),
  portadaId: z.string().nullable(),
  portada: ImagenSchema.nullable(),
  cantidadImagenes: z.number(),
  autorId: z.string(),
  autor: AutorSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AlbumsResponseSchema = z.array(AlbumSchema);

export const AlbumDetalleSchema = AlbumSchema.extend({
  imagenes: z.array(ImagenSchema),
});

/**
 * Respuesta del upload de imágenes. La API puede devolver el array de imágenes
 * o envolverlo en { imagenes }. Como el resultado sólo dispara la invalidación
 * de las queries, ante una forma inesperada devolvemos [] en lugar de fallar.
 */
export const ImagenesSubidasSchema = z
  .union([
    z.array(ImagenSchema),
    z.object({ imagenes: z.array(ImagenSchema) }).transform((r) => r.imagenes),
  ])
  .catch([]);

export const CrearAlbumSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  fecha: z
    .string()
    .min(1, "La fecha es obligatoria")
    .refine(
      (valor) => !Number.isNaN(new Date(valor).getTime()),
      "La fecha no es válida",
    ),
});

export type CrearAlbumFormValues = z.infer<typeof CrearAlbumSchema>;