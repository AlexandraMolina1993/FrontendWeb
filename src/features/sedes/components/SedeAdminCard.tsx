import { BookOpenText, Mail, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../../../components/ui/card";

import type { Sede } from "../schemas/sede.schema";

interface SedeAdminCardProps {
  sede: Sede;
  onEdit: (sede: Sede) => void;
  onDelete: (sede: Sede) => void;
}

export default function SedeAdminCard({ sede, onEdit, onDelete }: SedeAdminCardProps) {
  return (
    <Card className="flex h-full flex-col" contenidoClassName="flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#FFD21A] text-[#171717]">
          <MapPin size={18} aria-hidden="true" />
        </span>
        <div className="flex gap-1">
          <Link
            to={`/admin/institucional?sedeId=${encodeURIComponent(sede.id)}`}
            aria-label={`Información institucional de ${sede.nombre}`}
            className="grid size-9 place-items-center rounded-lg text-[#C49200] transition hover:bg-[#FFF8D6]"
          >
            <BookOpenText size={16} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={`Editar ${sede.nombre}`}
            onClick={() => onEdit(sede)}
            className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#171717]"
          >
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Eliminar ${sede.nombre}`}
            onClick={() => onDelete(sede)}
            className="grid size-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#C49200]">
        {sede.ciudad}, {sede.provincia}
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-[#171717]">{sede.nombre}</h2>
      <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-600">
        <MapPin size={16} className="mt-1 shrink-0 text-[#C49200]" aria-hidden="true" />
        {sede.direccion}
      </p>

      <div className="mt-auto space-y-2 pt-6 text-sm text-slate-500">
        {sede.telefono && (
          <p className="flex items-center gap-2">
            <Phone size={15} aria-hidden="true" />
            {sede.telefono}
          </p>
        )}
        {sede.email && (
          <p className="flex items-center gap-2 break-all">
            <Mail size={15} aria-hidden="true" />
            {sede.email}
          </p>
        )}
      </div>
    </Card>
  );
}
