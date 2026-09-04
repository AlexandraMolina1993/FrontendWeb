import type { Sede, SedeFormValues } from "../schemas/sede.schema";

export function sedeAFormulario(sede?: Partial<Sede> | null): SedeFormValues {
  return {
    nombre: sede?.nombre ?? "", slug: sede?.slug ?? "", direccion: sede?.direccion ?? "",
    ciudad: sede?.ciudad ?? "", provincia: sede?.provincia ?? "", telefono: sede?.telefono ?? "",
    email: sede?.email ?? "", descripcion: sede?.descripcion ?? "", imagenUrl: sede?.imagenUrl ?? "",
    latitud: sede?.latitud != null ? String(sede.latitud) : "", longitud: sede?.longitud != null ? String(sede.longitud) : "",
    horario: sede?.horario ?? "", activa: sede?.activa ?? true,
  };
}

export function formularioASede(values: SedeFormValues, id = ""): Sede {
  return { id, nombre: values.nombre.trim(), slug: values.slug.trim(), direccion: values.direccion.trim(), ciudad: values.ciudad.trim(), provincia: values.provincia.trim(), telefono: values.telefono.trim() || null, email: values.email.trim() || null, descripcion: values.descripcion.trim() || null, imagenUrl: values.imagenUrl.trim() || null, latitud: values.latitud ? Number(values.latitud) : null, longitud: values.longitud ? Number(values.longitud) : null, horario: values.horario.trim() || null, activa: values.activa };
}