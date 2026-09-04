import StatusBadge from "../../../components/ui/statusBadge";

import type { Carrera } from "../types/carrera.types";
import { formatearActualizacion } from "../types/carrera.types";

import CarreraHeader from "./CarreraHeader";

interface CarreraPreviewProps {
  carrera: Carrera;
  className?: string;
}

export default function CarreraPreview({
  carrera,
  className = "",
}: CarreraPreviewProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-[#F5F5F6] ${className}`}
      aria-label="Vista previa de la carrera"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#B78700]">
            Vista previa pública
          </p>
          <p className="text-sm font-semibold text-slate-700">
            {formatearActualizacion(carrera.updatedAt)}
          </p>
        </div>
        <StatusBadge
          status={carrera.activa ? "publicado" : "inactivo"}
          label={carrera.activa ? "Publicada" : "Inactiva"}
          mostrarPunto={false}
        />
      </div>

      <div className="p-4 sm:p-6">
        <CarreraHeader carrera={carrera} />
      </div>
    </section>
  );
}
