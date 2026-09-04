import { Plus, Trash2 } from "lucide-react";

import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Select from "../../../components/ui/select";

import type { MateriaPlan } from "../types/carrera.types";

interface PlanEstudioEditorProps {
  value: MateriaPlan[];
  onChange: (materias: MateriaPlan[]) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const ANIO_OPCIONES = [1, 2, 3, 4, 5, 6].map((anio) => ({
  value: String(anio),
  label: `${anio}.° año`,
}));

const CUATRIMESTRE_OPCIONES = [
  { value: "", label: "Anual" },
  { value: "1", label: "1.° cuatrimestre" },
  { value: "2", label: "2.° cuatrimestre" },
];

function crearMateria(): MateriaPlan {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    anio: 1,
    cuatrimestre: 1,
  };
}

export default function PlanEstudioEditor({
  value,
  onChange,
  error,
  disabled = false,
  className = "",
}: PlanEstudioEditorProps) {
  function actualizar(id: string, cambios: Partial<MateriaPlan>) {
    onChange(
      value.map((materia) =>
        materia.id === id ? { ...materia, ...cambios } : materia,
      ),
    );
  }

  function eliminar(id: string) {
    onChange(value.filter((materia) => materia.id !== id));
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Plan de estudio
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Agregá las materias por año y cuatrimestre.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => onChange([...value, crearMateria()])}
          disabled={disabled}
        >
          <Plus />
          Agregar materia
        </Button>
      </div>

      {value.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
          Todavía no hay materias cargadas.
        </p>
      ) : (
        <ul className="space-y-3">
          {value.map((materia, index) => (
            <li
              key={materia.id}
              className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_8rem_11rem_7rem_auto]"
            >
              <Input
                label={index === 0 ? "Materia" : undefined}
                placeholder="Nombre de la materia"
                value={materia.nombre}
                disabled={disabled}
                onChange={(event) =>
                  actualizar(materia.id, { nombre: event.target.value })
                }
              />

              <Select
                label={index === 0 ? "Año" : undefined}
                value={String(materia.anio)}
                opciones={ANIO_OPCIONES}
                placeholder=""
                disabled={disabled}
                onChange={(event) =>
                  actualizar(materia.id, { anio: Number(event.target.value) })
                }
              />

              <Select
                label={index === 0 ? "Cursada" : undefined}
                value={materia.cuatrimestre ? String(materia.cuatrimestre) : ""}
                opciones={CUATRIMESTRE_OPCIONES}
                placeholder=""
                disabled={disabled}
                onChange={(event) =>
                  actualizar(materia.id, {
                    cuatrimestre: event.target.value
                      ? (Number(event.target.value) as 1 | 2)
                      : undefined,
                  })
                }
              />

              <Input
                label={index === 0 ? "Horas" : undefined}
                type="number"
                min={0}
                placeholder="0"
                value={materia.cargaHoraria ?? ""}
                disabled={disabled}
                onChange={(event) =>
                  actualizar(materia.id, {
                    cargaHoraria: event.target.value
                      ? Number(event.target.value)
                      : undefined,
                  })
                }
              />

              <div className={index === 0 ? "sm:pt-7" : ""}>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => eliminar(materia.id)}
                  disabled={disabled}
                  aria-label={`Eliminar ${materia.nombre || "materia"}`}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
