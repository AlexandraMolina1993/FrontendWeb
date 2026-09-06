export interface Autoridad {
  id: string;
  nombre: string;
  cargo: string;
  descripcion: string | null;
  imagenUrl: string | null;
  orden: number;
  activa: boolean;
}

export interface InformacionInstitucional {
  id?: string;
  nombreInstitucion: string;
  lema: string;
  historia: string;
  mision: string;
  vision: string;
  valores: string[];
  autoridades: Autoridad[];
}

export interface InstitucionalFormValues {
  nombreInstitucion: string;
  lema: string;
  historia: string;
  mision: string;
  vision: string;
  valores: string[];
}

export interface AutoridadFormValues {
  nombre: string;
  cargo: string;
  descripcion: string;
  imagenUrl: string;
  orden: string;
  activa: boolean;
}

export const INFORMACION_INSTITUCIONAL_VACIA: InformacionInstitucional = {
  nombreInstitucion: "Instituto Superior Villa del Rosario",
  lema: "Educación que transforma",
  historia: "",
  mision: "",
  vision: "",
  valores: [],
  autoridades: [],
};

export const AUTORIDAD_FORM_VACIO: AutoridadFormValues = {
  nombre: "",
  cargo: "",
  descripcion: "",
  imagenUrl: "",
  orden: "1",
  activa: true,
};

export function isAutoridad(value: unknown): value is Autoridad {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.nombre === "string" &&
    typeof item.cargo === "string" &&
    (item.descripcion === null || typeof item.descripcion === "string") &&
    (item.imagenUrl === null || typeof item.imagenUrl === "string") &&
    typeof item.orden === "number" &&
    typeof item.activa === "boolean"
  );
}

export function isAutoridadList(value: unknown): value is Autoridad[] {
  return Array.isArray(value) && value.every(isAutoridad);
}

export function isInformacionInstitucional(value: unknown): value is InformacionInstitucional {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.nombreInstitucion === "string" &&
    typeof item.lema === "string" &&
    typeof item.historia === "string" &&
    typeof item.mision === "string" &&
    typeof item.vision === "string" &&
    Array.isArray(item.valores) &&
    item.valores.every((valor) => typeof valor === "string")
  );
}

export function validarInstitucional(values: InstitucionalFormValues) {
  const errores: Partial<Record<keyof InstitucionalFormValues, string>> = {};
  if (!values.nombreInstitucion.trim()) errores.nombreInstitucion = "El nombre es obligatorio.";
  if (!values.historia.trim()) errores.historia = "La historia es obligatoria.";
  if (!values.mision.trim()) errores.mision = "La misión es obligatoria.";
  if (!values.vision.trim()) errores.vision = "La visión es obligatoria.";
  if (values.valores.filter((valor) => valor.trim()).length === 0) {
    errores.valores = "Agregá al menos un valor institucional.";
  }
  return errores;
}

export function validarAutoridad(values: AutoridadFormValues) {
  const errores: Partial<Record<keyof AutoridadFormValues, string>> = {};
  if (!values.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!values.cargo.trim()) errores.cargo = "El cargo es obligatorio.";
  return errores;
}