import { useState, type FormEvent } from "react";

import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Select from "../../../components/ui/select";
import Textarea from "../../../components/ui/textarea";

import { validarCarreraForm } from "../schemas/carrera.schema";
import type {
  Carrera,
  CarreraFormValues,
  CarreraModalidad,
  SedeOpcion,
} from "../types/carrera.types";
import {
  CARRERA_DURACION_MAX,
  CARRERA_DURACION_MIN,
  CARRERA_FORM_VACIO,
  CARRERA_MODALIDAD_LABELS,
  carreraAFormulario,
} from "../types/carrera.types";

interface CarreraFormProps {
  carrera?: Partial<Carrera> | null;
  onSubmit: (values: CarreraFormValues) => void;
  onCancel?: () => void;
  cargando?: boolean;
  errores?: Partial<Record<keyof CarreraFormValues, string>>;
  sedesOpciones?: SedeOpcion[];
  cargandoSedes?: boolean;
  errorSedes?: string | null;
  onReintentarSedes?: () => void;
  className?: string;
}

const MODALIDAD_OPCIONES = (
  Object.entries(CARRERA_MODALIDAD_LABELS) as [CarreraModalidad, string][]
).map(([value, label]) => ({ value, label }));

export default function CarreraForm({
  carrera,
  onSubmit,
  onCancel,
  cargando = false,
  errores = {},
  sedesOpciones = [],
  cargandoSedes = false,
  errorSedes = null,
  onReintentarSedes,
  className = "",
}: CarreraFormProps) {
  const [values, setValues] = useState<CarreraFormValues>(() =>
    carrera ? carreraAFormulario(carrera) : CARRERA_FORM_VACIO,
  );
  const [erroresLocales, setErroresLocales] = useState<
    Partial<Record<keyof CarreraFormValues, string>>
  >({});

  const erroresVisibles = { ...erroresLocales, ...errores };

  function actualizar<K extends keyof CarreraFormValues>(
    campo: K,
    valor: CarreraFormValues[K],
  ) {
    setValues((actual) => ({ ...actual, [campo]: valor }));
    setErroresLocales((actual) => ({ ...actual, [campo]: undefined }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validacion = validarCarreraForm(values);
    setErroresLocales(validacion);

    if (Object.keys(validacion).length > 0) {
      return;
    }

    onSubmit(values);
  }

  const sedeSeleccionada = values.sedes[0] ?? "";
  const opcionesSede = sedesOpciones.map((sede) => ({
    value: sede.id,
    label: sede.ciudad ? `${sede.nombre} · ${sede.ciudad}` : sede.nombre,
  }));

  const ayudaSedes = cargandoSedes
    ? "Cargando sedes..."
    : errorSedes
      ? undefined
      : sedesOpciones.length === 0
        ? "Todavía no hay sedes publicadas."
        : undefined;

  return (
    <form onSubmit={handleSubmit} className={`space-y-8 ${className}`} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Nombre de la carrera"
          value={values.nombre}
          required
          disabled={cargando}
          error={erroresVisibles.nombre}
          onChange={(event) => actualizar("nombre", event.target.value)}
        />
        <Input
          label="Título que otorga"
          value={values.tituloOtorgado}
          disabled={cargando}
          error={erroresVisibles.tituloOtorgado}
          onChange={(event) => actualizar("tituloOtorgado", event.target.value)}
        />
        <Input
          label="Duración en años"
          type="number"
          min={CARRERA_DURACION_MIN}
          max={CARRERA_DURACION_MAX}
          placeholder="Ej. 3"
          value={values.duracionAnios}
          disabled={cargando}
          error={erroresVisibles.duracionAnios}
          onChange={(event) => actualizar("duracionAnios", event.target.value)}
        />
        <Select
          label="Modalidad"
          value={values.modalidad}
          opciones={MODALIDAD_OPCIONES}
          placeholder=""
          disabled={cargando}
          error={erroresVisibles.modalidad}
          onChange={(event) =>
            actualizar("modalidad", event.target.value as CarreraModalidad)
          }
        />
        <div className="sm:col-span-2">
          <Select
            label="Sede"
            value={sedeSeleccionada}
            opciones={opcionesSede}
            placeholder={
              cargandoSedes ? "Cargando sedes..." : "Seleccionar una sede"
            }
            disabled={cargando || cargandoSedes || opcionesSede.length === 0}
            error={erroresVisibles.sedes ?? errorSedes ?? undefined}
            ayuda={ayudaSedes}
            onChange={(event) =>
              actualizar(
                "sedes",
                event.target.value ? [event.target.value] : [],
              )
            }
          />
          {errorSedes && onReintentarSedes && (
            <button
              type="button"
              onClick={onReintentarSedes}
              className="mt-2 text-sm font-semibold text-[#C49200] underline"
            >
              Reintentar sedes
            </button>
          )}
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Descripción"
            rows={5}
            value={values.descripcion}
            disabled={cargando}
            error={erroresVisibles.descripcion}
            onChange={(event) => actualizar("descripcion", event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={cargando}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar carrera"}
        </Button>
      </div>
    </form>
  );
}
