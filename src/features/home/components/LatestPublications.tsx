import { ArrowRight, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicaciones } from "../../publicaciones/hooks/usePublicaciones";
import { PublicacionCard } from "../../publicaciones/components/public/PublicacionCard";

export default function LatestPublications() {
  const { data, isLoading, isError } = usePublicaciones("NOTICIA");
  const publicaciones = data?.slice(0, 3) ?? [];
  return <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]"><Newspaper size={16} /> Actualidad</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Últimas publicaciones</h2></div><Link to="/noticias" className="inline-flex items-center gap-2 font-bold text-[#171717] hover:text-[#C49200]">Ver noticias <ArrowRight size={17} /></Link></div>{isLoading && <p className="mt-8 text-slate-500">Cargando publicaciones...</p>}{isError && <p className="mt-8 border-l-4 border-[#C49200] bg-[#fff8db] p-4 text-slate-700">No pudimos cargar las publicaciones.</p>}{!isLoading && !isError && publicaciones.length === 0 && <p className="mt-8 text-slate-500">Todavía no hay publicaciones.</p>}<div className="mt-8 grid gap-5 md:grid-cols-3">{publicaciones.map((publicacion) => <PublicacionCard key={publicacion.id} publicacion={publicacion} />)}</div></section>;
}
