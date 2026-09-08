import { HeartHandshake } from "lucide-react";
import Card from "../../../components/ui/card";
export default function ValoresInstitucionales({ valores }: { valores: string[] }) {
  return <Card><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#FFD21A] text-[#171717]"><HeartHandshake size={19} /></span><h2 className="text-2xl font-black text-[#171717]">Nuestros valores</h2></div><div className="mt-6 flex flex-wrap gap-3">{valores.length ? valores.map((valor) => <span key={valor} className="rounded-full border border-[#E4B600] bg-[#FFF8D6] px-4 py-2 text-sm font-semibold text-[#5D4800]">{valor}</span>) : <p className="text-slate-500">Información en actualización.</p>}</div></Card>;
}