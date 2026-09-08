import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Edit3, Eye, Plus, Search, X } from "lucide-react";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import {
  actualizarMensaje,
  enviarMensaje,
  obtenerMensaje,
  obtenerMensajes,
} from "../../services/contact.api";
import type {
  ContactMessage,
  ContactMessageInput,
} from "../../types/contact.types";

const emptyForm: ContactMessageInput = {
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
};

type ContactFilter = "TODOS" | "PENDIENTE" | "RESPONDIDO";

export default function ContactoAdminPage() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLDivElement>(null);
  const messagesQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: obtenerMensajes,
  });
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [editing, setEditing] = useState<ContactMessage | null>(null);
  const [form, setForm] = useState<ContactMessageInput>(emptyForm);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ContactFilter>("TODOS");
  const detailQuery = useQuery({
    queryKey: ["contact-message", selected?.id],
    queryFn: () => obtenerMensaje(selected!.id),
    enabled: Boolean(selected),
  });
  const saveMutation = useMutation({
    mutationFn: () =>
      editing ? actualizarMensaje(editing.id, form) : enviarMensaje(form),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      resetForm();
    },
  });
  const messages = (messagesQuery.data ?? []).filter((message) => {
    const term = search.toLowerCase().trim();
    const matchesSearch =
      !term ||
      [message.nombre, message.email, message.asunto].some((field) =>
        field.toLowerCase().includes(term),
      );
    const matchesStatus =
      status === "TODOS" ||
      (status === "RESPONDIDO"
        ? message.estado === "RESPONDIDO"
        : message.estado !== "RESPONDIDO");
    return matchesSearch && matchesStatus;
  });

  function resetForm() {
    setForm(emptyForm);
    setEditing(null);
  }

  function startNew() {
    resetForm();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startEditing(message: ContactMessage) {
    setEditing(message);
    setForm({
      nombre: message.nombre,
      email: message.email,
      asunto: message.asunto,
      mensaje: message.mensaje,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function update(field: keyof ContactMessageInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveMutation.mutateAsync();
  }

  if (messagesQuery.isLoading)
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <LoadingSpinner text="Cargando bandeja de contacto..." />
      </div>
    );
  if (messagesQuery.isError) {
    const unauthorized =
      (messagesQuery.error as AxiosError).response?.status === 401;
    return (
      <main className="mx-auto max-w-7xl px-5 py-12">
        <ErrorState
          title={
            unauthorized
              ? "Sesión no autorizada"
              : "No pudimos cargar los contactos"
          }
          description={
            unauthorized
              ? "Iniciá sesión para consultar las consultas recibidas."
              : undefined
          }
          onRetry={() => void messagesQuery.refetch()}
        />
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-8 lg:px-12">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B78700]">
            Comunicación
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#1F2937] sm:text-4xl">
            Gestión de Contactos
          </h1>
          <p className="mt-2 text-slate-500">
            Administra las consultas enviadas por estudiantes y futuros
            ingresantes.
          </p>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4EA14] px-4 py-3 text-sm font-black text-[#232323] shadow-sm transition hover:bg-[#e3d900]"
        >
          <Plus size={18} /> Nuevo contacto
        </button>
      </header>

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(280px,35%)_minmax(0,65%)]">
        <div
          ref={formRef}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black text-[#1F2937]">
              Formulario de contacto
            </h2>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-bold text-slate-500 hover:text-[#232323]"
              >
                Cancelar edición
              </button>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {editing
              ? "Editando contacto seleccionado."
              : "Crea un nuevo contacto institucional."}
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-bold text-[#1F2937]">
              Nombre completo
              <input
                required
                value={form.nombre}
                onChange={(event) => update("nombre", event.target.value)}
                className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 font-normal outline-none transition focus:border-[#B78700] focus:ring-2 focus:ring-[#F4EA14]/40"
              />
            </label>
            <label className="block text-sm font-bold text-[#1F2937]">
              Correo electrónico
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 font-normal outline-none transition focus:border-[#B78700] focus:ring-2 focus:ring-[#F4EA14]/40"
              />
            </label>
            <label className="block text-sm font-bold text-[#1F2937]">
              Asunto
              <input
                required
                value={form.asunto}
                onChange={(event) => update("asunto", event.target.value)}
                className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 font-normal outline-none transition focus:border-[#B78700] focus:ring-2 focus:ring-[#F4EA14]/40"
              />
            </label>
            <label className="block text-sm font-bold text-[#1F2937]">
              Mensaje
              <textarea
                required
                rows={7}
                value={form.mensaje}
                onChange={(event) => update("mensaje", event.target.value)}
                className="mt-2 w-full resize-y rounded-lg border border-[#E5E7EB] px-3 py-2.5 font-normal outline-none transition focus:border-[#B78700] focus:ring-2 focus:ring-[#F4EA14]/40"
              />
            </label>
            {saveMutation.isError && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                No pudimos guardar el contacto. Revisá los datos e intentá
                nuevamente.
              </p>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-lg bg-[#F4EA14] px-4 py-2.5 text-sm font-black text-[#232323] transition hover:bg-[#e3d900] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saveMutation.isPending ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-[#E5E7EB] bg-[#F5F6FA] px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        <div className="min-w-0 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-[#1F2937]">
                Consultas recibidas
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {messages.length} contactos
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex min-w-0 items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2 text-slate-400 sm:w-64">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar contacto..."
                  aria-label="Buscar contacto"
                  className="min-w-0 flex-1 text-sm text-[#1F2937] outline-none placeholder:text-slate-400"
                />
              </label>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as ContactFilter)
                }
                aria-label="Filtrar por estado"
                className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-[#B78700]"
              >
                <option value="TODOS">Todos</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="RESPONDIDO">Respondido</option>
              </select>
            </div>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-[#E5E7EB] text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-3 font-bold">ID</th>
                  <th className="px-3 py-3 font-bold">Nombre</th>
                  <th className="px-3 py-3 font-bold">Email</th>
                  <th className="px-3 py-3 font-bold">Asunto</th>
                  <th className="px-3 py-3 font-bold">Estado</th>
                  <th className="px-3 py-3 text-right font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-12 text-center text-slate-500"
                    >
                      No hay contactos que coincidan con los filtros.
                    </td>
                  </tr>
                ) : (
                  messages.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b border-slate-100 transition hover:bg-[#fffef0]"
                    >
                      <td className="px-3 py-4 font-bold text-slate-500">
                        #{message.id}
                      </td>
                      <td className="px-3 py-4 font-bold text-[#1F2937]">
                        {message.nombre}
                      </td>
                      <td className="px-3 py-4 text-slate-600">
                        {message.email}
                      </td>
                      <td className="max-w-[180px] truncate px-3 py-4 text-slate-600">
                        {message.asunto}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${message.estado === "RESPONDIDO" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}
                        >
                          {message.estado === "RESPONDIDO"
                            ? "Respondido"
                            : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => startEditing(message)}
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                            title="Editar contacto"
                          >
                            <Edit3 size={14} /> Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelected(message)}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                            title="Ver contacto"
                          >
                            <Eye size={14} /> Ver
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {selected && (
        <ContactDetailModal
          message={detailQuery.data ?? selected}
          loading={detailQuery.isLoading}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}

function ContactDetailModal({
  message,
  loading,
  onClose,
}: {
  message: ContactMessage;
  loading: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#232323]/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-detail-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Cerrar detalle"
      />
      <article className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-[#232323]"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#B78700]">
          Detalle del contacto
        </p>
        <h2
          id="contact-detail-title"
          className="mt-2 pr-8 text-2xl font-black text-[#1F2937]"
        >
          {message.asunto}
        </h2>
        {loading ? (
          <LoadingSpinner text="Cargando contacto..." />
        ) : (
          <>
            <dl className="mt-6 grid gap-4 border-y border-[#E5E7EB] py-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-bold text-slate-500">Nombre</dt>
                <dd className="mt-1 text-[#1F2937]">{message.nombre}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-500">Email</dt>
                <dd className="mt-1 break-all text-[#1F2937]">
                  {message.email}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-500">Fecha de creación</dt>
                <dd className="mt-1 text-[#1F2937]">
                  {new Date(message.createdAt).toLocaleString("es-AR")}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-500">Estado</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${message.estado === "RESPONDIDO" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}
                  >
                    {message.estado === "RESPONDIDO"
                      ? "Respondido"
                      : "Pendiente"}
                  </span>
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <p className="text-sm font-bold text-slate-500">Mensaje</p>
              <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">
                {message.mensaje}
              </p>
            </div>
          </>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-7 rounded-lg bg-[#232323] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#3a3a3a]"
        >
          Cerrar
        </button>
      </article>
    </div>
  );
}
