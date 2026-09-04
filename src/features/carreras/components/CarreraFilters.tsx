import Button from "../../../components/ui/button";
import Select from "../../../components/ui/select";

import type { CarreraFiltros, CarreraModalidad } from "../types/carrera.types";
import { CARRERA_MODALIDAD_LABELS } from "../types/carrera.types";

interface CarreraFiltersProps {
  filtros: CarreraFiltros;
  onChange: (filtros: CarreraFiltros) => void;
  onReset?: () => void;
  className?: string;
}

const MODALIDAD_OPCIONES = (
  Object.entries(CARRERA_MODALIDAD_LABELS) as [CarreraModalidad, string][]
).map(([value, label]) => ({ value, label }));

export default function CarreraFilters({
  filtros,
  onChange,
  onReset,
  className = "",
}: CarreraFiltersProps) {
  const hayFiltrosActivos = filtros.modalidad !== "";

  return (
    <div className={`grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end ${className}`}>
      <Select
        label="Modalidad"
        value={filtros.modalidad}
        placeholder="Todas las modalidades"
        opciones={MODALIDAD_OPCIONES}
        onChange={(event) =>
          onChange({
            ...filtros,
            modalidad: event.target.value as CarreraModalidad | "",
          })
        }
      />

      {onReset && (
        <Button
          variant="secondary"
          onClick={onReset}
          disabled={!hayFiltrosActivos}
        >
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
