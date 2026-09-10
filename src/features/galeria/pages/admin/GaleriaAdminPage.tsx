import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Images, Plus } from "lucide-react";

import AdminLayout from "../../../../components/layouts/applayout";
import { getApiErrorMessage } from "../../../../shared/lib/api/api-error";
import Button from "../../../../components/ui/button";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import Modal from "../../../../components/ui/modal";
import { useAlbums } from "../../hooks/useAlbums";
import { useAlbum } from "../../hooks/useAlbum";
import { useCrearAlbum } from "../../hooks/useCrearAlbum";
import { useActualizarAlbum } from "../../hooks/useActualizarAlbum";
import { useEliminarAlbum } from "../../hooks/useEliminarAlbum";
import { useReactivarAlbum } from "../../hooks/useReactivarAlbum";
import { AlbumsTable } from "../../components/admin/AlbumsTable";
import { AlbumForm } from "../../components/admin/AlbumForm";
import { AlbumDeleteDialog } from "../../components/admin/AlbumDeleteDialog";
import { AlbumImagesManager } from "../../components/admin/AlbumImagesManager";
import type { Album } from "../../types/album.types";
import type { CrearAlbumFormValues } from "../../schemas/album.schema";
import { aFechaInput } from "../../utils/fecha";

const FORM_ID = "album-form";

/**
 * Toma sólo los campos que edita el formulario, y recorta la fecha ISO al
 * formato yyyy-MM-dd que necesita el <input type="date">.
 */
function aValoresFormulario(album: Album): Partial<CrearAlbumFormValues> {
  return {
    titulo: album.titulo,
    descripcion: album.descripcion,
    fecha: aFechaInput(album.fecha),
  };
}

export default function GaleriaAdminPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useAlbums();
  const crear = useCrearAlbum();
  const actualizar = useActualizarAlbum();
  const eliminar = useEliminarAlbum();
  const reactivar = useReactivarAlbum();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [albumEditar, setAlbumEditar] = useState<Album | null>(null);
  const [albumEliminar, setAlbumEliminar] = useState<Album | null>(null);
  const [albumGestionarId, setAlbumGestionarId] = useState<string | null>(null);

  const { data: albumGestionar, isLoading: cargandoAlbum } = useAlbum(
    albumGestionarId ?? "",
  );

  const guardando = crear.isPending || actualizar.isPending;
  const errorAlGuardar = crear.error ?? actualizar.error;
  const errorDeAccion = eliminar.error ?? reactivar.error;

  // El sidebar enlaza "Agregar fotografías" a /admin/galeria/nueva, que
  // renderiza esta misma pantalla: ahí abrimos directamente el formulario.
  const esRutaNueva = pathname.endsWith("/nueva");

  useEffect(() => {
    if (esRutaNueva) {
      setAlbumEditar(null);
      setMostrarForm(true);
    }
  }, [esRutaNueva]);

  function abrirCrear() {
    crear.reset();
    actualizar.reset();
    setAlbumEditar(null);
    setMostrarForm(true);
  }

  function abrirEditar(album: Album) {
    crear.reset();
    actualizar.reset();
    setAlbumEditar(album);
    setMostrarForm(true);
  }

  function cerrarForm() {
    if (guardando) return;
    setMostrarForm(false);
    setAlbumEditar(null);
    if (esRutaNueva) navigate("/admin/galeria", { replace: true });
  }

  function handleSubmit(valores: CrearAlbumFormValues) {
    if (albumEditar) {
      actualizar.mutate(
        { id: albumEditar.id, input: valores },
        {
          onSuccess: () => {
            setMostrarForm(false);
            setAlbumEditar(null);
          },
        },
      );
      return;
    }

    crear.mutate(valores, {
      onSuccess: () => {
        setMostrarForm(false);
        if (esRutaNueva) navigate("/admin/galeria", { replace: true });
      },
    });
  }

  function handleConfirmarEliminar() {
    if (!albumEliminar) return;
    eliminar.mutate(albumEliminar.id, {
      onSuccess: () => setAlbumEliminar(null),
    });
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-950 sm:text-4xl">
              Galería
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Organizá los álbumes de fotografías del instituto y elegí la
              portada de cada uno.
            </p>
          </div>
          <Button onClick={abrirCrear}>
            <Plus aria-hidden="true" />
            Nuevo álbum
          </Button>
        </header>

        {errorDeAccion && (
          <p role="alert" className="text-sm font-semibold text-red-600">
            No pudimos completar la acción: {getApiErrorMessage(errorDeAccion)}
          </p>
        )}

        <AlbumsTable
          albums={data}
          isLoading={isLoading}
          isError={isError}
          onReintentar={() => void refetch()}
          onEditar={abrirEditar}
          onEliminar={setAlbumEliminar}
          onGestionarFotos={(album) => setAlbumGestionarId(album.id)}
          onReactivar={(album) => reactivar.mutate(album.id)}
          onCrear={abrirCrear}
        />
      </div>

      <Modal
        abierto={mostrarForm}
        titulo={albumEditar ? "Editar álbum" : "Nuevo álbum"}
        descripcion={
          albumEditar
            ? "Actualizá los datos del álbum."
            : "Creá el álbum y después cargá las fotografías."
        }
        icono={<Images size={20} />}
        tamano="pequeno"
        cerrar={cerrarForm}
        cerrarAlHacerClickFuera={!guardando}
        mostrarBotonCerrar={!guardando}
        pie={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={cerrarForm} disabled={guardando}>
              Cancelar
            </Button>
            <Button type="submit" form={FORM_ID} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar álbum"}
            </Button>
          </div>
        }
      >
        {errorAlGuardar && (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            No pudimos guardar el álbum: {getApiErrorMessage(errorAlGuardar)}
          </p>
        )}

        <AlbumForm
          key={albumEditar?.id ?? "nuevo"}
          formId={FORM_ID}
          valoresIniciales={
            albumEditar ? aValoresFormulario(albumEditar) : undefined
          }
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        abierto={Boolean(albumGestionarId)}
        titulo={
          albumGestionar ? `Fotos de ${albumGestionar.titulo}` : "Fotos del álbum"
        }
        descripcion="Subí imágenes, elegí la portada o eliminá las que no vayan."
        icono={<Images size={20} />}
        cerrar={() => setAlbumGestionarId(null)}
      >
        {cargandoAlbum || !albumGestionar ? (
          <LoadingSpinner text="Cargando fotos..." />
        ) : (
          <AlbumImagesManager album={albumGestionar} />
        )}
      </Modal>

      <AlbumDeleteDialog
        album={albumEliminar}
        onConfirmar={handleConfirmarEliminar}
        onCancelar={() => setAlbumEliminar(null)}
        isDeleting={eliminar.isPending}
      />
    </AdminLayout>
  );
}
