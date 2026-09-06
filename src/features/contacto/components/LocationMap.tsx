import type { ContactInformation } from "../types/contact.types";

export default function LocationMap({ information }: { information: ContactInformation }) {
  const source = information.mapaUrl || `https://www.google.com/maps?q=${encodeURIComponent(information.direccion || "Instituto Superior Villa del Rosario")}&output=embed`;
  return <div className="min-h-64 overflow-hidden border border-slate-200 bg-slate-100"><iframe title="Ubicación del instituto" src={source} loading="lazy" className="h-72 w-full border-0" /></div>;
}
