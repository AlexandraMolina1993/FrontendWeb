import { useEffect, useState } from "react";
import type { ContactInformation } from "../../types/contact.types";

const empty: ContactInformation = { email: "", telefono: "", direccion: "", horario: "", mapaUrl: "", instagram: "", facebook: "", whatsapp: "" };
export default function ContactDataForm({ value, saving, onSave }: { value?: ContactInformation; saving?: boolean; onSave: (value: ContactInformation) => Promise<void> }) {
  const [form, setForm] = useState<ContactInformation>(value ?? empty);
  useEffect(() => { if (value) setForm({ ...empty, ...value }); }, [value]);
  const update = (field: keyof ContactInformation, next: string) => setForm((current) => ({ ...current, [field]: next }));
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); await onSave(form); }
  return <form onSubmit={submit} className="border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#171717]">Datos públicos de contacto</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{(["email", "telefono", "direccion", "horario", "mapaUrl", "instagram", "facebook", "whatsapp"] as const).map((field) => <label key={field} className="text-sm font-bold capitalize text-[#171717]">{field === "mapaUrl" ? "URL del mapa" : field}<input value={form[field] ?? ""} onChange={(event) => update(field, event.target.value)} className="mt-2 w-full border border-slate-300 px-3 py-2 font-normal outline-none focus:border-[#C49200]" /></label>)}</div><button type="submit" disabled={saving} className="mt-5 bg-[#171717] px-4 py-2 text-sm font-bold text-white hover:bg-[#C49200] disabled:opacity-50">{saving ? "Guardando..." : "Guardar datos"}</button></form>;
}
