import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function InstitutionalPreview() {
  return <section className="bg-[#f4f1e8]"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-12"><div className="flex size-20 items-center justify-center bg-[#FFD21A] text-[#171717]"><Building2 size={38} /></div><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]">Quiénes somos</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Una institución con raíces y mirada al futuro.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-700">Conocé nuestra historia, nuestro equipo y el compromiso que sostiene cada propuesta educativa.</p><Link to="/institucional" className="mt-6 inline-flex items-center gap-2 font-bold text-[#171717] hover:text-[#C49200]">Conocé el instituto <ArrowRight size={17} /></Link></div></div></section>;
}
