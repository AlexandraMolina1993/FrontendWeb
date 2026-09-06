import { CheckCircle2 } from "lucide-react";

export default function ContactSuccess({ onReset }: { onReset: () => void }) {
  return <div className="border border-emerald-200 bg-emerald-50 p-8 text-center"><CheckCircle2 className="mx-auto text-emerald-600" size={42} /><h2 className="mt-4 text-2xl font-black text-emerald-950">Mensaje enviado</h2><p className="mx-auto mt-2 max-w-md text-emerald-800">Gracias por escribirnos. Nuestro equipo se pondrá en contacto con vos pronto.</p><button type="button" onClick={onReset} className="mt-6 border border-emerald-700 px-4 py-2 font-bold text-emerald-800 hover:bg-emerald-100">Enviar otro mensaje</button></div>;
}
