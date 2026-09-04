export interface Sede {
  id: string;
  nombre: string;
  slug: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  telefono: string | null;
  email: string | null;
  descripcion: string | null;
  imagenUrl: string | null;
  latitud: number | null;
  longitud: number | null;
  horario: string | null;
  activa: boolean;
}

export interface SedeFormValues {
  nombre: string;
  slug: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  email: string;
  descripcion: string;
  imagenUrl: string;
  latitud: string;
  longitud: string;
  horario: string;
  activa: boolean;
}

export const SEDE_FORM_VACIO: SedeFormValues = {
  nombre: "", slug: "", direccion: "", ciudad: "", provincia: "",
  telefono: "", email: "", descripcion: "", imagenUrl: "", latitud: "",
  longitud: "", horario: "", activa: true,
};

export function isSede(value: unknown): value is Sede {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" && typeof item.nombre === "string" && typeof item.slug === "string" && typeof item.direccion === "string" && typeof item.ciudad === "string" && typeof item.provincia === "string" && typeof item.activa === "boolean";
}

export function isSedeList(value: unknown): value is Sede[] {
  return Array.isArray(value) && value.every(isSede);
}

export function validarSede(values: SedeFormValues) {
  const errores: Partial<Record<keyof SedeFormValues, string>> = {};
  if (!values.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!values.slug.trim()) errores.slug = "El slug es obligatorio.";
  if (!values.direccion.trim()) errores.direccion = "La dirección es obligatoria.";
  if (!values.ciudad.trim()) errores.ciudad = "La ciudad es obligatoria.";
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errores.email = "Ingresá un correo válido.";
  return errores;
}