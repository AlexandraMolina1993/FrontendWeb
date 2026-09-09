export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  telefono: string | null;
  email: string | null;
}

export interface SedeFormValues {
  nombre: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  email: string;
}

export const SEDE_FORM_VACIO: SedeFormValues = {
  nombre: "", direccion: "", ciudad: "", provincia: "",
  telefono: "", email: "",
};

export function isSede(value: unknown): value is Sede {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string" && typeof item.nombre === "string" && typeof item.direccion === "string" && typeof item.ciudad === "string" && typeof item.provincia === "string";
}

export function isSedeList(value: unknown): value is Sede[] {
  return Array.isArray(value) && value.every(isSede);
}

export function validarSede(values: SedeFormValues) {
  const errores: Partial<Record<keyof SedeFormValues, string>> = {};
  if (!values.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!values.direccion.trim()) errores.direccion = "La dirección es obligatoria.";
  if (!values.ciudad.trim()) errores.ciudad = "La ciudad es obligatoria.";
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email.trim())) errores.email = "Ingresá un correo válido.";
  return errores;
}