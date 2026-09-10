import { useState } from "react";
import { Newspaper, Plus } from "lucide-react";

import AdminLayout from "../../../../components/layouts/applayout";
import { getApiErrorMessage } from "../../../../shared/lib/api/api-error";
import Button from "../../../../components/ui/button";
import Modal from "../../../../components/ui/modal";
import { usePublicaciones } from "../../hooks/usePublicaciones";
import { useCrearPublicacion } from "../../hooks/useCrearPublicacion";
import { useActualizarPublicacion } from "../../hooks/useActualizarPublicacion";
import { useEliminarPublicacion } from "../../hooks/useEliminarPublicacion";
import { PublicacionTable } from "../../components/admin/PublicacionTable";
import { PublicacionForm } from "../../components/admin/PublicacionForm";
import { PublicacionDeleteDialog } from "../../components/admin/PublicacionDeleteDialog";
import type { Publicacion } from "../../types/publicacion.types";
import type { CrearPublicacionFormValues } from "../../schemas/publicacion.schema";
import { aFechaInput } from "../../utils/fecha";

const FORM_ID = "publicacion-form";

/**
 * Toma sólo los campos que edita el formulario. Mandar la publicación entera
 * arrastraría id, slug, autor y timestamps al payload del PATCH.
 */
function aValoresFormulario(
  publicacion: Publicacion,
): Partial<CrearPublicacionFormValues> {
  return {
    titulo: publicacion.titulo,
    resumen: publicacion.resumen,
    contenido: publicacion.contenido,
    tipo: publicacion.tipo,
    imagenUrl: publicacion.imagenUrl,
    fechaEvento: aFechaInput(publicacion.fechaEvento),
    destacada: publicacion.destacada,
  };
}

export default function PublicacionesAdminPage() {
  const { data, isLoading, isError, refetch } = usePublicaciones();
  const crear = useCrearPublicacion();
  const actualizar = useActualizarPublicacion();
  const eliminar = useEliminarPublicacion();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [publicacionEditar, setPublicacionEditar] =
    useState<Publicacion | null>(null);
  const [publicacionEliminar, setPublicacionEliminar] =
    useState<Publicacion | null>(null);

  const guardando = crear.isPending || actualizar.isPending;
  const errorAlGuardar = crear.error ?? actualizar.error;

  function abrirCrear() {
    crear.reset();
    actualizar.reset();
    setPublicacionEditar(null);
    setMostrarForm(true);
  }

  function abrirEditar(publicacion: Publicacion) {
    crear.reset();
    actualizar.reset();
    setPublicacionEditar(publicacion);
    setMostrarForm(true);
  }

  function cerrarForm() {
    if (guardando) return;
    setMostrarForm(false);
    setPublicacionEditar(null);
  }

  function handleSubmit(valores: CrearPublicacionFormValues) {
    if (publicacionEditar) {
      actualizar.mutate(
        { id: publicacionEditar.id, input: valores },
        {
          onSuccess: () => {
            setMostrarForm(false);
            setPublicacionEditar(null);
          },
        },
      );
      return;
    }

    crear.mutate(valores, {
      onSuccess: () => setMostrarForm(false),
    });
  }

  function handleConfirmarEliminar() {
    if (!publicacionEliminar) return;
    eliminar.mutate(publicacionEliminar.id, {
      onSuccess: () => setPublicacionEliminar(null),
    });
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-950 sm:text-4xl">
              Noticias y actividades
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Administrá las publicaciones que se muestran en el sitio y en la
              aplicación móvil.
            </p>
          </div>
          <Button onClick={abrirCrear}>
            <Plus aria-hidden="true" />
            Nueva publicación
          </Button>
        </header>

        {eliminar.isError && (
          <p role="alert" className="text-sm font-semibold text-red-600">
            No pudimos eliminar la publicación: {getApiErrorMessage(eliminar.error)}
          </p>
        )}

        <PublicacionTable
          publicaciones={data}
          isLoading={isLoading}
          isError={isError}
          onReintentar={() => void refetch()}
          onEditar={abrirEditar}
          onEliminar={setPublicacionEliminar}
          onCrear={abrirCrear}
        />
      </div>

      <Modal
        abierto={mostrarForm}
        titulo={publicacionEditar ? "Editar publicación" : "Nueva publicación"}
        descripcion={
          publicacionEditar
            ? "Actualizá los datos de la publicación."
            : "Completá los datos de la nueva noticia o evento."
        }
        icono={<Newspaper size={20} />}
        cerrar={cerrarForm}
        cerrarAlHacerClickFuera={!guardando}
        mostrarBotonCerrar={!guardando}
        pie={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={cerrarForm} disabled={guardando}>
              Cancelar
            </Button>
            <Button type="submit" form={FORM_ID} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar publicación"}
            </Button>
          </div>
        }
      >
        {errorAlGuardar && (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            No pudimos guardar la publicación: {getApiErrorMessage(errorAlGuardar)}
          </p>
        )}

        <PublicacionForm
          key={publicacionEditar?.id ?? "nueva"}
          formId={FORM_ID}
          valoresIniciales={
            publicacionEditar
              ? aValoresFormulario(publicacionEditar)
              : undefined
          }
          onSubmit={handleSubmit}
        />
      </Modal>

      <PublicacionDeleteDialog
        publicacion={publicacionEliminar}
        onConfirmar={handleConfirmarEliminar}
        onCancelar={() => setPublicacionEliminar(null)}
        isDeleting={eliminar.isPending}
      />
    </AdminLayout>
  );
}
