import type { Sede, SedeFormValues } from "../schemas/sede.schema";

export function sedeAFormulario(sede?: Partial<Sede> | null): SedeFormValues {
  return {
    nombre: sede?.nombre ?? "", direccion: sede?.direccion ?? "",
    ciudad: sede?.ciudad ?? "", provincia: sede?.provincia ?? "", telefono: sede?.telefono ?? "",
    email: sede?.email ?? "",
  };
}

export function formularioASede(values: SedeFormValues, id = ""): Sede {
  return { id, nombre: values.nombre.trim(), direccion: values.direccion.trim(), ciudad: values.ciudad.trim(), provincia: values.provincia.trim(), telefono: values.telefono.trim(), email: values.email.trim() };
}