export interface Autoridad {
  id: string;
  nombre: string;
  cargo: string;
  imagen?: string | null;
  orden: number;
  descripcion: string;
}

export interface InformacionInstitucional {
  id: string;
  sedeId: string;
  nombre: string;
  lema: string;
  historia: string;
  mision: string;
  vision: string;
  createdAt: string;
  updatedAt: string;
  autoridades: Autoridad[];
}

export interface InstitucionalFormValues {
  nombre: string;
  lema: string;
  historia: string;
  mision: string;
  vision: string;
}

export interface AutoridadFormValues {
  nombre: string;
  cargo: string;
  imagen: string;
  orden: number;
  descripcion: string;
}

export const INFORMACION_INSTITUCIONAL_VACIA: InformacionInstitucional = {
  id: "",
  sedeId: "",
  nombre: "Instituto Superior Villa del Rosario",
  lema: "Educación que transforma",
  historia: "",
  mision: "",
  vision: "",
  createdAt: "",
  updatedAt: "",
  autoridades: [],
};

export const AUTORIDAD_FORM_VACIO: AutoridadFormValues = {
  nombre: "",
  cargo: "",
  imagen: "",
  orden: 1,
  descripcion: "",
};

export function isAutoridad(value: unknown): value is Autoridad {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.nombre === "string" &&
    typeof item.cargo === "string" &&
    (item.imagen === undefined || item.imagen === null || typeof item.imagen === "string") &&
    typeof item.orden === "number" &&
    typeof item.descripcion === "string"
  );
}

export function isAutoridadList(value: unknown): value is Autoridad[] {
  return Array.isArray(value) && value.every(isAutoridad);
}

export function isInformacionInstitucional(value: unknown): value is InformacionInstitucional {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.sedeId === "string" &&
    typeof item.nombre === "string" &&
    typeof item.lema === "string" &&
    typeof item.historia === "string" &&
    typeof item.mision === "string" &&
    typeof item.vision === "string" &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string" &&
    isAutoridadList(item.autoridades)
  );
}

export function validarInstitucional(values: InstitucionalFormValues) {
  const errores: Partial<Record<keyof InstitucionalFormValues, string>> = {};
  if (!values.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!values.historia.trim()) errores.historia = "La historia es obligatoria.";
  if (!values.mision.trim()) errores.mision = "La misión es obligatoria.";
  if (!values.vision.trim()) errores.vision = "La visión es obligatoria.";
  return errores;
}

export function validarAutoridad(values: AutoridadFormValues) {
  const errores: Partial<Record<keyof AutoridadFormValues, string>> = {};
  if (!values.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!values.cargo.trim()) errores.cargo = "El cargo es obligatorio.";
  return errores;
}