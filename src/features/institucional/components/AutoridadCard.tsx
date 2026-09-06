import { UserRound } from "lucide-react";
import Card from "../../../components/ui/card";
import type { Autoridad } from "../schemas/institucional.schema";
export default function AutoridadCard({ autoridad }: { autoridad: Autoridad }) {
  return <Card className="flex items-center gap-4"><div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#171717] text-[#FFD21A]">{autoridad.imagenUrl ? <img src={autoridad.imagenUrl} alt={autoridad.nombre} className="h-full w-full object-cover" /> : <UserRound size={24} />}</div><div><h3 className="font-black text-[#171717]">{autoridad.nombre}</h3><p className="mt-1 text-sm font-semibold text-[#C49200]">{autoridad.cargo}</p>{autoridad.descripcion && <p className="mt-2 text-sm text-slate-500">{autoridad.descripcion}</p>}</div></Card>;
}