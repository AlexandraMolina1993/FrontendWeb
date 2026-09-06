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
