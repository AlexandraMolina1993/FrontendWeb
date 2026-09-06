import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#171717] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#FFD21A] lg:block" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:py-28">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#FFD21A]"><GraduationCap size={18} /> Instituto Superior Villa del Rosario</p>
          <h1 className="text-4xl font-black leading-tight sm:text-6xl">Tu próximo paso empieza acá.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">Formación superior cercana, práctica y conectada con las oportunidades de nuestra comunidad.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/carreras" className="inline-flex items-center gap-2 bg-[#FFD21A] px-5 py-3 font-bold text-[#171717] transition hover:bg-white">Conocé nuestras carreras <ArrowRight size={18} /></Link>
            <Link to="/contacto" className="inline-flex items-center gap-2 border border-white/35 px-5 py-3 font-bold transition hover:border-white hover:bg-white/10">Contactanos</Link>
          </div>
        </div>
        <div className="relative hidden min-h-64 lg:block" aria-hidden="true"><div className="absolute right-10 top-1/2 h-64 w-64 -translate-y-1/2 rotate-6 border-[18px] border-[#171717]" /><div className="absolute bottom-0 right-0 h-24 w-72 bg-[#171717]" /></div>
      </div>
    </section>
  );
}
