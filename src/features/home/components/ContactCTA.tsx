import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactCTA() {
  return <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"><div className="flex flex-col gap-6 bg-[#FFD21A] p-7 sm:p-10 md:flex-row md:items-center md:justify-between"><div className="flex gap-4"><MessageCircle className="mt-1 shrink-0 text-[#171717]" size={30} /><div><h2 className="text-2xl font-black text-[#171717]">¿Querés saber más?</h2><p className="mt-2 max-w-xl text-[#171717]/75">Estamos para ayudarte a elegir tu próxima oportunidad de formación.</p></div></div><Link to="/contacto" className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#171717] px-5 py-3 font-bold text-white hover:bg-white hover:text-[#171717]">Escribinos <ArrowRight size={18} /></Link></div></section>;
}
