import { Clock3, GraduationCap } from "lucide-react";

import Badge from "../../../components/ui/badge";
import Button from "../../../components/ui/button";
import Card from "../../../components/ui/card";

import type { Carrera } from "../types/carrera.types";
import { CARRERA_MODALIDAD_LABELS, duracionCarrera } from "../types/carrera.types";

interface CarreraCardProps {
  carrera: Carrera;
  onSelect?: (carrera: Carrera) => void;
  className?: string;
}

export default function CarreraCard({
  carrera,
  onSelect,
  className = "",
}: CarreraCardProps) {
  const esClickable = Boolean(onSelect);

  return (
    <Card
      interactiva={esClickable}
      className={className}
      onClick={esClickable ? () => onSelect?.(carrera) : undefined}
      role={esClickable ? "button" : undefined}
      tabIndex={esClickable ? 0 : undefined}
      onKeyDown={
        esClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect?.(carrera);
              }
            }
          : undefined
      }
      pie={
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Clock3 size={14} aria-hidden="true" />
            {duracionCarrera(carrera)}
          </span>
          {onSelect && (
            <Button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(carrera);
              }}
            >
              Ver carrera
            </Button>
          )}
        </div>
      }
    >
      <div className="-mx-5 -mt-5 mb-5 flex h-40 items-center justify-center bg-[#171717] text-[#FFD21A]">
        <GraduationCap size={42} aria-hidden="true" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="primary">{CARRERA_MODALIDAD_LABELS[carrera.modalidad]}</Badge>
        {carrera.tituloOtorgado && (
          <Badge variant="secondary">{carrera.tituloOtorgado}</Badge>
        )}
      </div>

      <h3 className="mt-4 text-lg font-black tracking-tight text-[#171717]">
        {carrera.nombre}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
        {carrera.descripcion || "Esta carrera todavía no tiene una descripción."}
      </p>
    </Card>
  );
}
