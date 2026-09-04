import { UsersRound } from "lucide-react";
import EmptyState from "../../../components/ui/emptyState";
import type { Autoridad } from "../schemas/institucional.schema";
import AutoridadCard from "./AutoridadCard";
export default function AutoridadesGrid({ autoridades }: { autoridades: Autoridad[] }) {
  if (!autoridades.length) return <EmptyState title="Autoridades en actualización" description="Próximamente publicaremos las autoridades institucionales." icon={<UsersRound size={26} />} />;
  return <div className="grid gap-5 md:grid-cols-2">{autoridades.filter((autoridad) => autoridad.activa).sort((a, b) => a.orden - b.orden).map((autoridad) => <AutoridadCard key={autoridad.id} autoridad={autoridad} />)}</div>;
}