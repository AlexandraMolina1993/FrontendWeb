import type {
  Carrera,
  CarreraFormValues,
  CarreraInput,
  CarreraListParams,
  CarreraModalidad,
  SedeOpcion,
} from "../types/carrera.types";
import {
  CARRERA_DURACION_MAX,
  CARRERA_DURACION_MIN,
  CARRERA_MODALIDADES,
} from "../types/carrera.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

export function isCarreraModalidad(value: unknown): value is CarreraModalidad {
  return (
    typeof value === "string" &&
    CARRERA_MODALIDADES.includes(value as CarreraModalidad)
  );
}

export function isCarrera(value: unknown): value is Carrera {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.nombre === "string" &&
    value.nombre.length > 0 &&
    typeof value.slug === "string" &&
    value.slug.length > 0 &&
    (value.descripcion === null || typeof value.descripcion === "string") &&
    (value.duracionAnios === null ||
      (typeof value.duracionAnios === "number" &&
        Number.isInteger(value.duracionAnios))) &&
    (value.tituloOtorgado === null || typeof value.tituloOtorgado === "string") &&
    isCarreraModalidad(value.modalidad) &&
    typeof value.activa === "boolean" &&
    isIsoDate(value.createdAt) &&
    isIsoDate(value.updatedAt)
  );
}

export function isCarreraList(value: unknown): value is Carrera[] {
  return Array.isArray(value) && value.every(isCarrera);
}

export function isSedeOpcion(value: unknown): value is SedeOpcion {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.nombre === "string" &&
    value.nombre.length > 0 &&
    (value.ciudad === undefined ||
      value.ciudad === null ||
      typeof value.ciudad === "string")
  );
}

export function isSedeOpcionList(value: unknown): value is SedeOpcion[] {
  return Array.isArray(value) && value.every(isSedeOpcion);
}

export function validarBusqueda(buscar: string): string | undefined {
  if (buscar.length > 80) {
    return "La búsqueda no puede superar 80 caracteres.";
  }

  return undefined;
}

export function validarFiltros(
  params: CarreraListParams,
): Partial<Record<keyof CarreraListParams, string>> {
  const errores: Partial<Record<keyof CarreraListParams, string>> = {};
  const errorBusqueda = params.buscar
    ? validarBusqueda(params.buscar)
    : undefined;

  if (errorBusqueda) {
    errores.buscar = errorBusqueda;
  }

  if (params.modalidad && !isCarreraModalidad(params.modalidad)) {
    errores.modalidad = "La modalidad no es válida.";
  }

  if (params.sede && params.sede.trim().length === 0) {
    errores.sede = "El identificador de sede no es válido.";
  }

  return errores;
}

export function validarCarreraForm(
  values: CarreraFormValues,
): Partial<Record<keyof CarreraFormValues, string>> {
  const errores: Partial<Record<keyof CarreraFormValues, string>> = {};
  const nombre = values.nombre.trim();
  const descripcion = values.descripcion.trim();
  const titulo = values.tituloOtorgado.trim();

  if (!nombre) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nombre.length > 120) {
    errores.nombre = "El nombre no puede superar 120 caracteres.";
  }

  if (descripcion.length > 2000) {
    errores.descripcion = "La descripción no puede superar 2000 caracteres.";
  }

  if (titulo.length > 160) {
    errores.tituloOtorgado = "El título no puede superar 160 caracteres.";
  }

  if (values.duracionAnios.trim()) {
    const anios = Number(values.duracionAnios);

    if (
      !Number.isInteger(anios) ||
      anios < CARRERA_DURACION_MIN ||
      anios > CARRERA_DURACION_MAX
    ) {
      errores.duracionAnios = `Ingresá un número entero entre ${CARRERA_DURACION_MIN} y ${CARRERA_DURACION_MAX}.`;
    }
  }

  if (!isCarreraModalidad(values.modalidad)) {
    errores.modalidad = "Seleccioná una modalidad válida.";
  }

  if (values.sedes.some((sede) => !sede.trim())) {
    errores.sedes = "Cada sede tiene que tener un identificador válido.";
  }

  return errores;
}

export function formularioACarreraInput(values: CarreraFormValues): CarreraInput {
  const input: CarreraInput = {
    nombre: values.nombre.trim(),
    modalidad: values.modalidad,
  };

  const descripcion = values.descripcion.trim();
  const titulo = values.tituloOtorgado.trim();
  const sedes = values.sedes.map((sede) => sede.trim()).filter(Boolean);

  if (descripcion) {
    input.descripcion = descripcion;
  }

  if (titulo) {
    input.tituloOtorgado = titulo;
  }

  if (values.duracionAnios.trim()) {
    input.duracionAnios = Number(values.duracionAnios);
  }

  if (sedes.length > 0) {
    input.sedes = sedes;
  }

  return input;
}

export function formularioEsValido(values: CarreraFormValues): boolean {
  return Object.keys(validarCarreraForm(values)).length === 0;
}
