import { CircleCheck } from "lucide-react";

import Card from "../../../components/ui/card";
import EmptyState from "../../../components/ui/emptyState";

interface RequisitosIngresoProps {
  items: string[];
  titulo?: string;
  descripcion?: string;
  className?: string;
}

export default function RequisitosIngreso({
  items,
  titulo = "Requisitos de ingreso",
  descripcion = "Condiciones necesarias para inscribirse a la carrera.",
  className = "",
}: RequisitosIngresoProps) {
  return (
    <Card titulo={titulo} descripcion={descripcion} className={className}>
      {items.length === 0 ? (
        <EmptyState
          title="Requisitos no disponibles"
          description="Todavía no se cargaron los requisitos de ingreso."
          icon={<CircleCheck size={26} />}
        />
      ) : (
        <ol className="space-y-3">
          {items.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#171717] text-xs font-black text-[#FFD21A]">
                {index + 1}
              </span>
              <p className="pt-1 text-sm leading-6 text-slate-700">{item}</p>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
