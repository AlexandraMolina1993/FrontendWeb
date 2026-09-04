import { Building2 } from "lucide-react";
import type { InformacionInstitucional } from "../schemas/institucional.schema";

export default function InstitucionalHero({ informacion }: { informacion: InformacionInstitucional }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#171717] px-6 py-12 text-white shadow-xl sm:px-10 lg:px-14">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#FFD21A]"><Building2 size={18} /> Nuestro instituto</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">{informacion.nombreInstitucion}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">{informacion.lema}</p>
      </div>
    </section>
  );
}