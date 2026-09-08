import ContactForm from "../../components/ContactForm";
import ContactInfo from "../../components/ContactInfo";
import LocationMap from "../../components/LocationMap";

const information = { email: "", telefono: "", direccion: "", horario: "" };

export default function ContactoPage() {
  return <main><section className="bg-[#171717] px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFD21A]">Contacto</p><h1 className="mt-3 max-w-2xl text-4xl font-black sm:text-5xl">Estamos para escucharte.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-white/70">Consultas sobre carreras, inscripciones, sedes o cualquier propuesta del instituto.</p></div></section><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><ContactInfo information={information} /><ContactForm /></div><div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12"><LocationMap information={information} /></div></main>;
}
