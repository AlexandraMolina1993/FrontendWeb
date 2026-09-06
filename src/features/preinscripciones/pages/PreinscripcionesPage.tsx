import { useState } from "react";
import { ClipboardCheck, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useCarreras } from "../../carreras/hooks/useCarreras";
import { crearPreinscripcion, type PreinscripcionInput } from "../services/preinscripcion.api";

const initialForm: PreinscripcionInput = { nombre: "", apellido: "", email: "", telefono: "", carreraId: "" };

export default function PreinscripcionesPage() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const carreras = useCarreras();
  const mutation = useMutation({ mutationFn: crearPreinscripcion });
  const update = (field: keyof PreinscripcionInput, value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await mutation.mutateAsync(form);
      setSent(true);
      setForm(initialForm);
    } catch {
      setSent(false);
    }
  }

  return <main><section className="bg-[#171717] px-5 py-16 text-white sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#FFD21A]"><ClipboardCheck size={17} /> Admisiones</p><h1 className="mt-3 max-w-2xl text-4xl font-black sm:text-5xl">Preinscribite en el instituto.</h1><p className="mt-5 max-w-xl text-lg leading-8 text-white/70">Completá tus datos y te contactaremos para acompañarte en el proceso de ingreso.</p></div></section><section className="mx-auto max-w-3xl px-5 py-14 sm:px-8"><div className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">{sent ? <div className="border border-emerald-200 bg-emerald-50 p-8 text-center"><ClipboardCheck className="mx-auto text-emerald-600" size={42} /><h2 className="mt-4 text-2xl font-black text-emerald-950">Preinscripción recibida</h2><p className="mt-2 text-emerald-800">Gracias por completar tus datos. El instituto se pondrá en contacto con vos.</p><button type="button" onClick={() => { setSent(false); mutation.reset(); }} className="mt-6 border border-emerald-700 px-4 py-2 font-bold text-emerald-800">Enviar otra preinscripción</button></div> : <form onSubmit={submit}><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-[#171717]">Nombre<input required value={form.nombre} onChange={(event) => update("nombre", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label><label className="text-sm font-bold text-[#171717]">Apellido<input required value={form.apellido} onChange={(event) => update("apellido", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label><label className="text-sm font-bold text-[#171717]">Correo electrónico<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label><label className="text-sm font-bold text-[#171717]">Teléfono <span className="font-normal text-slate-500">(opcional)</span><input value={form.telefono} onChange={(event) => update("telefono", event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-3 font-normal outline-none focus:border-[#C49200]" /></label></div><label className="mt-5 block text-sm font-bold text-[#171717]">Carrera<select required value={form.carreraId} onChange={(event) => update("carreraId", event.target.value)} className="mt-2 w-full border border-slate-300 bg-white px-3 py-3 font-normal outline-none focus:border-[#C49200]"><option value="">Seleccioná una carrera</option>{carreras.carreras.map((carrera) => <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>)}</select></label>{carreras.cargando && <p className="mt-3 text-sm text-slate-500">Cargando carreras...</p>}{carreras.error && <p className="mt-3 text-sm text-amber-700">No pudimos cargar las carreras. Intentá nuevamente más tarde.</p>}{mutation.isError && <p role="alert" className="mt-4 border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800">No pudimos enviar la preinscripción. Revisá los datos e intentá nuevamente.</p>}<button type="submit" disabled={mutation.isPending} className="mt-6 inline-flex items-center gap-2 bg-[#171717] px-5 py-3 font-bold text-white hover:bg-[#C49200] disabled:opacity-60">{mutation.isPending ? "Enviando..." : "Enviar preinscripción"}<Send size={17} /></button></form>}</div></section></main>;
}
