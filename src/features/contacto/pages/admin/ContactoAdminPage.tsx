import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Plus } from "lucide-react";
import AdminLayout from "../../../../components/layouts/applayout";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import {
  actualizarMensaje,
  enviarMensaje,
  obtenerMensajes,
} from "../../services/contact.api";
import type { ContactMessage, ContactMessageInput } from "../../types/contact.types";

const emptyForm: ContactMessageInput = {
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
};

export default function ContactoAdminPage() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLDivElement>(null);
  const messagesQuery = useQuery({
    queryKey: ["contact-messages"],
    queryFn: obtenerMensajes,
  });
  const [editing, setEditing] = useState<ContactMessage | null>(null);
  const [form, setForm] = useState<ContactMessageInput>(emptyForm);

  const saveMutation = useMutation({
    mutationFn: () =>
      editing ? actualizarMensaje(editing.id, form) : enviarMensaje(form),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      resetForm();
    },
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
      <AdminLayout>
        <div className="grid min-h-[60vh] place-items-center">
          <LoadingSpinner text="Cargando bandeja de contacto..." />
        </div>
      </AdminLayout>
    );
  if (messagesQuery.isError) {
    const unauthorized =
      (messagesQuery.error as AxiosError).response?.status === 401;
    return (
      <AdminLayout>
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
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-12">
        <header className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B78700]">
            Comunicación
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#1F2937] sm:text-4xl">
            Gestión de Contactos
          </h1>
          <p className="mt-2 text-slate-500">
            Cargá y administrá la información del formulario de contacto.
          </p>
        </header>

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
                No pudimos guardar el contacto. Revisá los datos e intentá nuevamente.
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
      </main>
    </AdminLayout>
  );
}
