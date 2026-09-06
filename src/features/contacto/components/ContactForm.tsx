import { useState } from "react";
import ContactSuccess from "./ContactSuccess";
import { useSendContactMessage } from "../hooks/useContact";
import type { ContactMessageInput } from "../types/contact.types";

const initialForm: ContactMessageInput = { nombre: "", email: "", telefono: "", asunto: "", mensaje: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const mutation = useSendContactMessage();
  const update = (field: keyof ContactMessageInput, value: string) => setForm((current) => ({ ...current, [field]: value }));
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await mutation.mutateAsync(form);
    setForm(initialForm);
    setSent(true);
  }
  if (sent) return <ContactSuccess onReset={() => { setSent(false); mutation.reset(); }} />;
  return <form onSubmit={submit} className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-[#171717]">Nombre completo<input required value={form.nombre} onChange={(event) => update("nombre", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label><label className="text-sm font-bold text-[#171717]">Correo electrónico<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label><label className="text-sm font-bold text-[#171717]">Teléfono <span className="font-normal text-slate-500">(opcional)</span><input value={form.telefono} onChange={(event) => update("telefono", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label><label className="text-sm font-bold text-[#171717]">Asunto<input required value={form.asunto} onChange={(event) => update("asunto", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label></div><label className="mt-5 block text-sm font-bold text-[#171717]">Mensaje<textarea required minLength={10} rows={6} value={form.mensaje} onChange={(event) => update("mensaje", event.target.value)} className="mt-2 w-full resize-y border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label>{mutation.isError && <p role="alert" className="mt-4 border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">No pudimos enviar el mensaje. Revisá los datos e intentá nuevamente.</p>}<button disabled={mutation.isPending} type="submit" className="mt-6 bg-[#171717] px-5 py-3 font-bold text-white hover:bg-[#C49200] disabled:cursor-not-allowed disabled:opacity-60">{mutation.isPending ? "Enviando..." : "Enviar mensaje"}</button></form>;
}
