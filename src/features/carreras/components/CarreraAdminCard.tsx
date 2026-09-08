import { BookOpen, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import Card from "../../../components/ui/card";
import DropdownMenu from "../../../components/ui/dropdownMenu";
import StatusBadge from "../../../components/ui/statusBadge";

import type { Carrera } from "../types/carrera.types";
import {
  CARRERA_MODALIDAD_LABELS,
  completitudCarrera,
  duracionCarrera,
  formatearActualizacion,
} from "../types/carrera.types";

interface CarreraAdminCardProps {
  carrera: Carrera;
  onAdministrar?: (carrera: Carrera) => void;
  onEditar?: (carrera: Carrera) => void;
  onVistaPrevia?: (carrera: Carrera) => void;
  onDarDeBaja?: (carrera: Carrera) => void;
  className?: string;
}

export default function CarreraAdminCard({
  carrera,
  onAdministrar,
  onEditar,
  onVistaPrevia,
  onDarDeBaja,
  className = "",
}: CarreraAdminCardProps) {
  const porcentaje = completitudCarrera(carrera);
  const abrirEdicion = onEditar ?? onAdministrar;
  const acciones = [
    abrirEdicion && {
      id: "editar",
      label: "Editar",
      icon: <Pencil size={16} />,
      onClick: () => abrirEdicion(carrera),
    },
    onVistaPrevia && {
      id: "preview",
      label: "Vista previa",
      icon: <Eye size={16} />,
      onClick: () => onVistaPrevia(carrera),
    },
    onDarDeBaja && {
      id: "baja",
      label: "Dar de baja",
      icon: <Trash2 size={16} />,
      danger: true,
      separatorBefore: Boolean(abrirEdicion || onVistaPrevia),
      onClick: () => onDarDeBaja(carrera),
    },
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <Card
      interactiva
      className={`flex h-full flex-col ${className}`}
      contenidoClassName="flex flex-1 flex-col"
      pie={
        onAdministrar ? (
          <button
            type="button"
            onClick={() => onAdministrar(carrera)}
            className="w-full text-center text-sm font-semibold text-slate-700 transition hover:text-[#171717]"
          >
            Administrar carrera →
          </button>
        ) : undefined
      }
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#FFD21A] text-[#171717]">
          <BookOpen size={18} aria-hidden="true" />
        </span>

        {acciones.length > 0 && (
          <DropdownMenu
            ariaLabel={`Acciones de ${carrera.nombre}`}
            trigger={
              <span className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#171717]">
                <MoreHorizontal size={20} />
              </span>
            }
            items={acciones}
          />
        )}
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#C49200]">
        {CARRERA_MODALIDAD_LABELS[carrera.modalidad]}
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight text-[#171717]">
        {carrera.nombre}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {duracionCarrera(carrera)}
        {carrera.tituloOtorgado ? ` · ${carrera.tituloOtorgado}` : ""}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-500">
          {formatearActualizacion(carrera.updatedAt)}
        </p>
        <StatusBadge
          status={carrera.activa ? "activo" : "inactivo"}
          label={carrera.activa ? "Publicada" : "Inactiva"}
          mostrarPunto={false}
        />
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-600">Información completa</span>
          <span className="font-bold text-[#171717]">{porcentaje}%</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuenow={porcentaje}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Información completa"
        >
          <div
            className="h-full rounded-full bg-[#FFD21A]"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
