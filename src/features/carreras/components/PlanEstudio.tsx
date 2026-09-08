import { BookOpen } from "lucide-react";

import Card from "../../../components/ui/card";
import EmptyState from "../../../components/ui/emptyState";

import type { MateriaPlan } from "../types/carrera.types";

interface PlanEstudioProps {
  materias: MateriaPlan[];
  titulo?: string;
  descripcion?: string;
  className?: string;
}

function etiquetaCuatrimestre(cuatrimestre?: 1 | 2) {
  if (cuatrimestre === 1) return "1.° cuatrimestre";
  if (cuatrimestre === 2) return "2.° cuatrimestre";
  return "Anual";
}

export default function PlanEstudio({
  materias,
  titulo = "Plan de estudio",
  descripcion = "Materias organizadas por año.",
  className = "",
}: PlanEstudioProps) {
  const anios = [...new Set(materias.map((materia) => materia.anio))].sort(
    (a, b) => a - b,
  );

  return (
    <Card titulo={titulo} descripcion={descripcion} className={className}>
      {materias.length === 0 ? (
        <EmptyState
          title="Plan de estudio no disponible"
          description="Todavía no se cargaron materias para esta carrera."
          icon={<BookOpen size={26} />}
        />
      ) : (
        <div className="space-y-6">
          {anios.map((anio) => {
            const materiasDelAnio = materias.filter(
              (materia) => materia.anio === anio,
            );

            return (
              <section key={anio} aria-labelledby={`plan-anio-${anio}`}>
                <h3
                  id={`plan-anio-${anio}`}
                  className="mb-3 text-sm font-bold uppercase tracking-wide text-[#B78700]"
                >
                  {anio}.° año
                </h3>

                <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                  {materiasDelAnio.map((materia) => (
                    <li
                      key={materia.id}
                      className="flex flex-col gap-1 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="font-semibold text-[#171717]">
                        {materia.nombre}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        {etiquetaCuatrimestre(materia.cuatrimestre)}
                        {materia.cargaHoraria
                          ? ` · ${materia.cargaHoraria} h`
                          : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </Card>
  );
}
