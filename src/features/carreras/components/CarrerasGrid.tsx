import { GraduationCap } from "lucide-react";

import EmptyState from "../../../components/ui/emptyState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";

import type { Carrera } from "../types/carrera.types";

import CarreraAdminCard from "./CarreraAdminCard";
import CarreraCard from "./CarreraCard";

interface CarrerasGridProps {
  carreras: Carrera[];
  variante?: "publica" | "admin";
  cargando?: boolean;
  onSelect?: (carrera: Carrera) => void;
  onAdministrar?: (carrera: Carrera) => void;
  onVistaPrevia?: (carrera: Carrera) => void;
  tituloVacio?: string;
  descripcionVacia?: string;
  className?: string;
}

export default function CarrerasGrid({
  carreras,
  variante = "publica",
  cargando = false,
  onSelect,
  onAdministrar,
  onVistaPrevia,
  tituloVacio = "No hay carreras para mostrar",
  descripcionVacia = "Probá con otra búsqueda o cambiá los filtros.",
  className = "",
}: CarrerasGridProps) {
  if (cargando) {
    return (
      <div className={`flex min-h-64 items-center justify-center ${className}`}>
        <LoadingSpinner size="mediano" text="Cargando carreras..." />
      </div>
    );
  }

  if (carreras.length === 0) {
    return (
      <EmptyState
        title={tituloVacio}
        description={descripcionVacia}
        icon={<GraduationCap size={26} />}
        className={className}
      />
    );
  }

  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 ${className}`}
      role="list"
      aria-label="Listado de carreras"
    >
      {carreras.map((carrera) => (
        <div key={carrera.id} role="listitem">
          {variante === "admin" ? (
            <CarreraAdminCard
              carrera={carrera}
              onAdministrar={onAdministrar}
              onVistaPrevia={onVistaPrevia}
            />
          ) : (
            <CarreraCard carrera={carrera} onSelect={onSelect} />
          )}
        </div>
      ))}
    </div>
  );
}
