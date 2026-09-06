import { ArrowRight, Images } from "lucide-react";
import { Link } from "react-router-dom";
import { useAlbums } from "../../galeria/hooks/useAlbums";

export default function GalleryPreview() {
  const { data, isLoading, isError } = useAlbums();
  const albums = data?.slice(0, 3) ?? [];
  return <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]"><Images size={16} /> Comunidad</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Momentos del instituto</h2></div><Link to="/galeria" className="inline-flex items-center gap-2 font-bold text-[#171717] hover:text-[#C49200]">Ver galería <ArrowRight size={17} /></Link></div>{isLoading && <p className="mt-8 text-slate-500">Cargando galería...</p>}{isError && <p className="mt-8 text-slate-500">No pudimos cargar la galería.</p>}{!isLoading && !isError && albums.length === 0 && <p className="mt-8 text-slate-500">Todavía no hay álbumes publicados.</p>}<div className="mt-8 grid gap-5 md:grid-cols-3">{albums.map((album) => <Link key={album.id} to={`/galeria/${album.slug}`} className="group overflow-hidden border border-slate-200 bg-white"><div className="h-52 overflow-hidden bg-slate-100">{album.portada?.url ? <img src={album.portada.url} alt={album.titulo} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-slate-400"><Images size={40} /></div>}</div><div className="p-5"><h3 className="font-black text-[#171717]">{album.titulo}</h3><p className="mt-2 text-sm text-slate-600">{album.cantidadImagenes} fotografías</p></div></Link>)}</div></section>;
}
