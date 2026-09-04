export type CarreraModalidad = "PRESENCIAL" | "VIRTUAL" | "HIBRIDA";

export interface MateriaPlan {
  id: string;
  nombre: string;
  anio: number;
  cuatrimestre?: 1 | 2;
  cargaHoraria?: number;
}

export interface Carrera {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  duracionAnios: number | null;
  tituloOtorgado: string | null;
  modalidad: CarreraModalidad;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarreraListParams {
  buscar?: string;
  modalidad?: CarreraModalidad;
  sede?: string;
}

export interface CarreraFiltros {
  modalidad: CarreraModalidad | "";
}

export interface CarreraFormValues {
  nombre: string;
  descripcion: string;
  duracionAnios: string;
  tituloOtorgado: string;
  modalidad: CarreraModalidad;
  activa: boolean;
}

export const CARRERA_MODALIDADES: CarreraModalidad[] = [
  "PRESENCIAL",
  "VIRTUAL",
  "HIBRIDA",
];

export const CARRERA_MODALIDAD_LABELS: Record<CarreraModalidad, string> = {
  PRESENCIAL: "Presencial",
  VIRTUAL: "Virtual",
  HIBRIDA: "Híbrida",
};

export const CARRERA_FORM_VACIO: CarreraFormValues = {
  nombre: "",
  descripcion: "",
  duracionAnios: "",
  tituloOtorgado: "",
  modalidad: "PRESENCIAL",
  activa: true,
};

export function carreraAFormulario(carrera?: Partial<Carrera> | null): CarreraFormValues {
  return {
    ...CARRERA_FORM_VACIO,
    nombre: carrera?.nombre ?? "",
    descripcion: carrera?.descripcion ?? "",
    duracionAnios:
      carrera?.duracionAnios != null ? String(carrera.duracionAnios) : "",
    tituloOtorgado: carrera?.tituloOtorgado ?? "",
    modalidad: carrera?.modalidad ?? "PRESENCIAL",
    activa: carrera?.activa ?? true,
  };
}

export function duracionCarrera(carrera: Pick<Carrera, "duracionAnios">): string {
  if (!carrera.duracionAnios) {
    return "Duración a confirmar";
  }

  return carrera.duracionAnios === 1
    ? "1 año"
    : `${carrera.duracionAnios} años`;
}

export function formatearActualizacion(iso?: string | null): string {
  if (!iso) {
    return "Sin fecha de actualización";
  }

  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) {
    return "Sin fecha de actualización";
  }

  const ahora = new Date();
  const ayer = new Date(ahora);
  ayer.setDate(ahora.getDate() - 1);
  const hora = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(fecha);

  if (fecha.toDateString() === ahora.toDateString()) {
    return `Actualizada hoy, ${hora}`;
  }

  if (fecha.toDateString() === ayer.toDateString()) {
    return `Actualizada ayer, ${hora}`;
  }

  const dia = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  }).format(fecha);

  return `Actualizada el ${dia}, ${hora}`;
}

export function completitudCarrera(carrera: Carrera): number {
  const checks = [
    Boolean(carrera.nombre?.trim()),
    Boolean(carrera.slug?.trim()),
    Boolean(carrera.descripcion?.trim()),
    Boolean(carrera.duracionAnios),
    Boolean(carrera.tituloOtorgado?.trim()),
    Boolean(carrera.modalidad),
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
