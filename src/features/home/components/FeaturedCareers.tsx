import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCarreras } from "../../carreras/hooks/useCarreras";

export default function FeaturedCareers() {
  const { carreras, cargando, error } = useCarreras();
  const destacadas = carreras.filter((carrera) => carrera.activa).slice(0, 3);
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]">Elegí tu camino</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Carreras destacadas</h2></div><Link to="/carreras" className="inline-flex items-center gap-2 font-bold text-[#171717] hover:text-[#C49200]">Ver todas <ArrowRight size={17} /></Link></div>
      {cargando && <p className="mt-8 text-slate-500">Cargando carreras...</p>}
      {error && <p className="mt-8 border-l-4 border-[#C49200] bg-[#fff8db] p-4 text-slate-700">No pudimos cargar las carreras en este momento.</p>}
      {!cargando && !error && destacadas.length === 0 && <p className="mt-8 text-slate-500">Todavía no hay carreras publicadas.</p>}
      <div className="mt-8 grid gap-5 md:grid-cols-3">{destacadas.map((carrera) => <article key={carrera.id} className="border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#FFD21A] hover:shadow-lg"><div className="flex size-11 items-center justify-center bg-[#171717] text-[#FFD21A]"><GraduationCap size={22} /></div><h3 className="mt-6 text-xl font-black text-[#171717]">{carrera.nombre}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{carrera.descripcion || "Una propuesta de formación pensada para tu futuro profesional."}</p><p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#C49200]">{carrera.modalidad}</p></article>)}</div>
    </section>
  );
}
