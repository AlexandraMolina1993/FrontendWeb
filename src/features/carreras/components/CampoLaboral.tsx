import { Briefcase } from "lucide-react";

import Card from "../../../components/ui/card";
import EmptyState from "../../../components/ui/emptyState";

interface CampoLaboralProps {
  items: string[];
  titulo?: string;
  descripcion?: string;
  className?: string;
}

export default function CampoLaboral({
  items,
  titulo = "Campo laboral",
  descripcion = "Ámbitos en los que puede desempeñarse quien egrese.",
  className = "",
}: CampoLaboralProps) {
  return (
    <Card titulo={titulo} descripcion={descripcion} className={className}>
      {items.length === 0 ? (
        <EmptyState
          title="Campo laboral no disponible"
          description="Todavía no se cargaron salidas laborales para esta carrera."
          icon={<Briefcase size={26} />}
        />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#FFF0AE] text-[#9A7400]">
                <Briefcase size={16} aria-hidden="true" />
              </span>
              <p className="text-sm leading-6 text-slate-700">{item}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
