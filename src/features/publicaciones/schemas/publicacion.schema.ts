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
  fechaEvento: z
    .string()
    .optional()
    .refine(
      (valor) => !valor || !Number.isNaN(new Date(valor).getTime()),
      "La fecha del evento no es válida",
    ),
  destacada: z.boolean().optional(),
}).superRefine((valores, ctx) => {
  // La API exige fechaEvento cuando el tipo es EVENTO, y la rechaza cuando
  // es NOTICIA. Lo validamos acá para no depender del 400 del servidor.
  if (valores.tipo === "EVENTO" && !valores.fechaEvento) {
    ctx.addIssue({
      code: "custom",
      path: ["fechaEvento"],
      message: "La fecha es obligatoria para los eventos",
    });
  }
});

export type CrearPublicacionFormValues = z.infer<typeof CrearPublicacionSchema>;