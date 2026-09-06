import { Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return <main className="grid min-h-[70vh] place-items-center px-5 py-16"><div className="max-w-md text-center"><SearchX className="mx-auto text-[#C49200]" size={52} /><p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]">Error 404</p><h1 className="mt-2 text-4xl font-black text-[#171717]">Página no encontrada</h1><p className="mt-4 leading-7 text-slate-600">La dirección que buscás no existe o fue movida.</p><Link to="/" className="mt-7 inline-flex items-center gap-2 bg-[#171717] px-5 py-3 font-bold text-white hover:bg-[#C49200]"><Home size={18} /> Volver al inicio</Link></div></main>;
}
