import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../../components/ui/card";
import type { Sede } from "../schemas/sede.schema";
export default function SedeCard({ sede }: { sede: Sede }) {
  return <Card className="flex h-full flex-col"><div className="-mx-5 -mt-5 h-40 overflow-hidden bg-[#171717]">{sede.imagenUrl ? <img src={sede.imagenUrl} alt={sede.nombre} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[#FFD21A]"><MapPin size={42} /></div>}</div><h2 className="mt-5 text-2xl font-black text-[#171717]">{sede.nombre}</h2><p className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-600"><MapPin size={16} className="mt-1 shrink-0 text-[#C49200]" />{sede.direccion}, {sede.ciudad}</p>{sede.telefono && <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Phone size={15} />{sede.telefono}</p>}<Link to={`/sedes/${sede.slug}`} className="mt-auto pt-6 text-sm font-bold text-[#C49200] hover:text-[#171717]">Ver sede →</Link></Card>;
}