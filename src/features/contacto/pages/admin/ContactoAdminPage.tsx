import { useMemo, useState } from "react";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import { useContactAdminActions, useContactInformation, useContactMessages } from "../../hooks/useContact";
import type { ContactMessage, ContactMessageStatus } from "../../types/contact.types";
import MessageDetailDrawer from "../../components/admin/MessageDetailDrawer";
import MessageFilters from "../../components/admin/MessageFilters";
import MessageTable from "../../components/admin/MessageTable";
import ContactDataForm from "../../components/admin/ContactDataForm";

export default function ContactoAdminPage() {
  const messagesQuery = useContactMessages();
  const informationQuery = useContactInformation();
  const actions = useContactAdminActions();
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ContactMessageStatus | "TODOS">("TODOS");
  const messages = useMemo(() => (messagesQuery.data ?? []).filter((message) => { const term = search.toLowerCase().trim(); const matchesSearch = !term || [message.nombre, message.email, message.asunto].some((field) => field.toLowerCase().includes(term)); return matchesSearch && (status === "TODOS" || message.estado === status); }), [messagesQuery.data, search, status]);
  if (messagesQuery.isLoading || informationQuery.isLoading) return <div className="grid min-h-[60vh] place-items-center"><LoadingSpinner text="Cargando bandeja de contacto..." /></div>;
  if (messagesQuery.isError) return <main className="mx-auto max-w-7xl px-5 py-12"><ErrorState title="No pudimos cargar los mensajes" onRetry={() => void messagesQuery.refetch()} /></main>;
  async function changeStatus(next: ContactMessageStatus) { if (!selected) return; await actions.status.mutateAsync({ id: selected.id, estado: next }); setSelected({ ...selected, estado: next }); }
  async function reply(respuesta: string) { if (!selected) return; await actions.reply.mutateAsync({ id: selected.id, input: { respuesta } }); setSelected({ ...selected, estado: "RESPONDIDO" }); }
  return <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-12"><header><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C49200]">Administración</p><h1 className="mt-2 text-3xl font-black text-[#171717]">Contacto</h1><p className="mt-2 text-slate-600">Gestioná consultas recibidas y los datos que ve el público.</p></header><section className="space-y-4"><MessageFilters search={search} status={status} onSearch={setSearch} onStatus={setStatus} /><MessageTable messages={messages} onSelect={setSelected} /></section><ContactDataForm value={informationQuery.data} saving={actions.saveInformation.isPending} onSave={async (value) => { await actions.saveInformation.mutateAsync(value); }} /><MessageDetailDrawer message={selected} busy={actions.status.isPending || actions.reply.isPending} onClose={() => setSelected(null)} onStatus={(value) => void changeStatus(value)} onReply={reply} /></main>;
}
