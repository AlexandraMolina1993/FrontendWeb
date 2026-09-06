import { X } from "lucide-react";
import type { ContactMessage, ContactMessageStatus } from "../../types/contact.types";
import MessageStatusSelector from "./MessageStatusSelector";
import ReplyForm from "./ReplyForm";

interface Props { message: ContactMessage | null; busy?: boolean; onClose: () => void; onStatus: (status: ContactMessageStatus) => void; onReply: (reply: string) => Promise<void>; }
export default function MessageDetailDrawer({ message, busy, onClose, onStatus, onReply }: Props) {
  if (!message) return null;
  return <div className="fixed inset-0 z-50 flex justify-end bg-[#171717]/40" role="dialog" aria-modal="true" aria-label="Detalle del mensaje"><button type="button" aria-label="Cerrar detalle" onClick={onClose} className="absolute inset-0 cursor-default" /><aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"><button type="button" onClick={onClose} aria-label="Cerrar detalle" className="absolute right-5 top-5 text-slate-500 hover:text-[#171717]"><X size={22} /></button><p className="pr-8 text-sm font-bold uppercase tracking-[0.16em] text-[#C49200]">Mensaje recibido</p><h2 className="mt-2 pr-8 text-2xl font-black text-[#171717]">{message.asunto}</h2><div className="mt-6 space-y-2 border-y border-slate-200 py-5 text-sm"><p><strong>Nombre:</strong> {message.nombre}</p><p><strong>Correo:</strong> {message.email}</p>{message.telefono && <p><strong>Teléfono:</strong> {message.telefono}</p>}<p><strong>Fecha:</strong> {new Date(message.createdAt).toLocaleString("es-AR")}</p></div><p className="mt-6 whitespace-pre-wrap leading-7 text-slate-700">{message.mensaje}</p><div className="mt-7"><MessageStatusSelector value={message.estado} disabled={busy} onChange={onStatus} /></div><div className="mt-7"><ReplyForm disabled={busy} onSubmit={onReply} /></div></aside></div>;
}
