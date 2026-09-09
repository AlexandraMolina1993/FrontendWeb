import type { ReactNode } from "react";

import { Clock3, GraduationCap } from "lucide-react";

import Badge from "../../../components/ui/badge";

import type { Carrera } from "../types/carrera.types";
import { CARRERA_MODALIDAD_LABELS, duracionCarrera } from "../types/carrera.types";

interface CarreraHeaderProps {
  carrera: Carrera;
  acciones?: ReactNode;
  mostrarNombre?: boolean;
  className?: string;
}

export default function CarreraHeader({
  carrera,
  acciones,
  mostrarNombre = true,
  className = "",
}: CarreraHeaderProps) {
  return (
    <header
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative min-h-56 overflow-hidden bg-[#171717] lg:min-h-80">
          {carrera.imagenUrl ? (
            <img
              src={carrera.imagenUrl}
              alt={carrera.nombre}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-56 items-center justify-center text-[#FFD21A] lg:min-h-80">
              <GraduationCap size={64} aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">
                {CARRERA_MODALIDAD_LABELS[carrera.modalidad]}
              </Badge>
              <Badge variant="secondary">{duracionCarrera(carrera)}</Badge>
            </div>

            {mostrarNombre && (
              <h1 className="mt-4 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
                {carrera.nombre}
              </h1>
            )}

            {carrera.tituloOtorgado && (
              <p className={`${mostrarNombre ? "mt-2" : "mt-4"} text-sm font-semibold text-[#B78700]`}>
                Título: {carrera.tituloOtorgado}
              </p>
            )}

            <p className="mt-4 max-h-56 overflow-y-auto whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base">
              {carrera.descripcion ||
                "Esta carrera todavía no tiene una descripción."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Clock3 size={18} aria-hidden="true" />
              {duracionCarrera(carrera)}
            </p>
            {acciones}
          </div>
        </div>
      </div>
    </header>
  );
}
