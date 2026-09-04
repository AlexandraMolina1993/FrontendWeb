import Card from "../../../components/ui/card";
export default function HistoriaSection({ historia }: { historia: string }) {
  return <Card><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49200]">Nuestra historia</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Una institución con raíces</h2><p className="mt-4 whitespace-pre-line leading-8 text-slate-600">{historia || "Próximamente compartiremos la historia de nuestro instituto."}</p></Card>;
}