import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { ContactInformation } from "../types/contact.types";
import SocialLinks from "./SocialLinks";

export default function ContactInfo({ information }: { information: ContactInformation }) {
  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]">Datos institucionales</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Hablemos</h2></div><div className="space-y-4 text-slate-700"><p className="flex gap-3"><MapPin className="shrink-0 text-[#C49200]" size={20} /><span>{information.direccion || "Dirección a confirmar"}</span></p><p className="flex gap-3"><Phone className="shrink-0 text-[#C49200]" size={20} /><span>{information.telefono || "Teléfono a confirmar"}</span></p><p className="flex gap-3"><Mail className="shrink-0 text-[#C49200]" size={20} /><span>{information.email || "Correo a confirmar"}</span></p><p className="flex gap-3"><Clock3 className="shrink-0 text-[#C49200]" size={20} /><span>{information.horario || "Horario a confirmar"}</span></p></div><SocialLinks information={information} /></div>;
}
