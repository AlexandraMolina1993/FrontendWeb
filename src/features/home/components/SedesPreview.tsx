import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSedes } from "../../sedes/hooks/useSedes";

export default function SedesPreview() {
  const { sedes, cargando, error } = useSedes();
  return <section className="bg-[#f4f1e8]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]">Encontranos</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Nuestras sedes</h2></div><Link to="/sedes" className="inline-flex items-center gap-2 font-bold text-[#171717] hover:text-[#C49200]">Ver sedes <ArrowRight size={17} /></Link></div>{cargando && <p className="mt-8 text-slate-500">Cargando sedes...</p>}{error && <p className="mt-8 text-slate-500">No pudimos cargar las sedes.</p>}{!cargando && !error && sedes.length === 0 && <p className="mt-8 text-slate-500">Todavía no hay sedes publicadas.</p>}<div className="mt-8 grid gap-5 md:grid-cols-3">{sedes.slice(0, 3).map((sede) => <Link key={sede.id} to={`/sedes/${sede.slug}`} className="border border-slate-200 bg-white p-5 transition hover:border-[#FFD21A]"><MapPin className="text-[#C49200]" size={24} /><h3 className="mt-4 text-xl font-black text-[#171717]">{sede.nombre}</h3><p className="mt-2 text-sm text-slate-600">{sede.direccion}, {sede.ciudad}</p></Link>)}</div></div></section>;
}
