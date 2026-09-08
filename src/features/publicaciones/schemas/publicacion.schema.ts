import { z } from "zod";

export const AutorSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido: z.string(),
});

export const TipoPublicacionSchema = z.enum(["NOTICIA", "EVENTO"]);

export const PublicacionSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  slug: z.string(),
  resumen: z.string(),
  contenido: z.string(),
  tipo: TipoPublicacionSchema,
  imagenUrl: z.string(),
  fechaEvento: z.string().nullable(),
  destacada: z.boolean(),
  autorId: z.string(),
  autor: AutorSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PublicacionesResponseSchema = z.array(PublicacionSchema);

export const CrearPublicacionSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  resumen: z.string().min(1, "El resumen es obligatorio"),
  contenido: z.string().min(1, "El contenido es obligatorio"),
  tipo: TipoPublicacionSchema,
  imagenUrl: z.string().url("Debe ser una URL válida"),
  fechaEvento: z.string().optional(),
  destacada: z.boolean().optional(),
});

export type CrearPublicacionFormValues = z.infer<typeof CrearPublicacionSchema>;