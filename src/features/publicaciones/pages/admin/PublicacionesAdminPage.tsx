import { useState } from "react";
import { usePublicaciones } from "../../hooks/usePublicaciones";
import { useCrearPublicacion } from "../../hooks/useCrearPublicacion";
import { useActualizarPublicacion } from "../../hooks/useActualizarPublicacion";
import { useEliminarPublicacion } from "../../hooks/useEliminarPublicacion";
import { PublicacionTable } from "../../components/admin/PublicacionTable";
import { PublicacionForm } from "../../components/admin/PublicacionForm";
import { PublicacionDeleteDialog } from "../../components/admin/PublicacionDeleteDialog";
import type { Publicacion } from "../../types/publicacion.types";
import type { CrearPublicacionFormValues } from "../../schemas/publicacion.schema";

export default function PublicacionesAdminPage() {
  const { data, isLoading, isError } = usePublicaciones();
  const crear = useCrearPublicacion();
  const actualizar = useActualizarPublicacion();
  const eliminar = useEliminarPublicacion();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [publicacionEditar, setPublicacionEditar] =
    useState<Publicacion | null>(null);
  const [publicacionEliminar, setPublicacionEliminar] =
    useState<Publicacion | null>(null);

  function abrirCrear() {
    setPublicacionEditar(null);
    setMostrarForm(true);
  }

  function abrirEditar(publicacion: Publicacion) {
    setPublicacionEditar(publicacion);
    setMostrarForm(true);
  }

  function cerrarForm() {
    setMostrarForm(false);
    setPublicacionEditar(null);
  }

  function handleSubmit(valores: CrearPublicacionFormValues) {
    if (publicacionEditar) {
      actualizar.mutate(
        { id: publicacionEditar.id, input: valores },
        { onSuccess: cerrarForm }
      );
    } else {
      crear.mutate(valores, { onSuccess: cerrarForm });
    }
  }

  function handleConfirmarEliminar() {
    if (!publicacionEliminar) return;
    eliminar.mutate(publicacionEliminar.id, {
      onSuccess: () => setPublicacionEliminar(null),
    });
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Noticias y actividades</h1>
        <button
          onClick={abrirCrear}
          className="bg-yellow-500 text-black font-medium px-4 py-2 rounded-md"
        >
          Nueva publicación
        </button>
      </div>

      <PublicacionTable
        publicaciones={data}
        isLoading={isLoading}
        isError={isError}
        onEditar={abrirEditar}
        onEliminar={setPublicacionEliminar}
      />

      {mostrarForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
              {publicacionEditar ? "Editar publicación" : "Nueva publicación"}
            </h2>
            <PublicacionForm
  valoresIniciales={
    publicacionEditar
      ? {
          ...publicacionEditar,
          fechaEvento: publicacionEditar.fechaEvento ?? undefined,
        }
      : undefined
  }
  onSubmit={handleSubmit}
  isSubmitting={crear.isPending || actualizar.isPending}
/>
            <button
              onClick={cerrarForm}
              className="mt-3 text-sm text-gray-500 underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {publicacionEliminar && (
        <PublicacionDeleteDialog
          publicacion={publicacionEliminar}
          onConfirmar={handleConfirmarEliminar}
          onCancelar={() => setPublicacionEliminar(null)}
          isDeleting={eliminar.isPending}
        />
      )}
    </div>
  );
}