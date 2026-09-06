import { useState } from "react";

export default function ReplyForm({ disabled, onSubmit }: { disabled?: boolean; onSubmit: (respuesta: string) => Promise<void> }) {
  const [respuesta, setRespuesta] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setSending(true); try { await onSubmit(respuesta); setRespuesta(""); } finally { setSending(false); } }
  return <form onSubmit={submit} className="border-t border-slate-200 pt-5"><label className="text-sm font-bold text-[#171717]">Responder<textarea required minLength={2} value={respuesta} onChange={(event) => setRespuesta(event.target.value)} rows={4} className="mt-2 w-full resize-y border border-slate-300 px-3 py-2 font-normal outline-none focus:border-[#C49200]" /></label><button type="submit" disabled={disabled || sending} className="mt-3 bg-[#171717] px-4 py-2 text-sm font-bold text-white hover:bg-[#C49200] disabled:opacity-50">{sending ? "Enviando..." : "Enviar respuesta"}</button></form>;
}
