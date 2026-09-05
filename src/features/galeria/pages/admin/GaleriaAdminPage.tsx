import { useState } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { useCrearAlbum } from "../../hooks/useCrearAlbum";
import { useActualizarAlbum } from "../../hooks/useActualizarAlbum";
import { useEliminarAlbum } from "../../hooks/useEliminarAlbum";
import { useAlbum } from "../../hooks/useAlbum";
import { AlbumsTable } from "../../components/admin/AlbumsTable";
import { AlbumForm } from "../../components/admin/AlbumForm";
import { AlbumDeleteDialog } from "../../components/admin/AlbumDeleteDialog";
import { GalleryUploader } from "../../components/admin/GalleryUploader";
import type { Album } from "../../types/album.types";
import type { CrearAlbumFormValues } from "../../schemas/album.schema";

export default function GaleriaAdminPage() {
  const { data, isLoading, isError } = useAlbums();
  const crear = useCrearAlbum();
  const actualizar = useActualizarAlbum();
  const eliminar = useEliminarAlbum();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [albumEditar, setAlbumEditar] = useState<Album | null>(null);
  const [albumEliminar, setAlbumEliminar] = useState<Album | null>(null);
  const [albumGestionarId, setAlbumGestionarId] = useState<string | null>(
    null
  );

  const { data: albumGestionar } = useAlbum(albumGestionarId ?? "");

  function abrirCrear() {
    setAlbumEditar(null);
    setMostrarForm(true);
  }

  function abrirEditar(album: Album) {
    setAlbumEditar(album);
    setMostrarForm(true);
  }

  function cerrarForm() {
    setMostrarForm(false);
    setAlbumEditar(null);
  }

  function handleSubmit(valores: CrearAlbumFormValues) {
    if (albumEditar) {
      actualizar.mutate(
        { id: albumEditar.id, input: valores },
        { onSuccess: cerrarForm }
      );
    } else {
      crear.mutate(valores, { onSuccess: cerrarForm });
    }
  }

  function handleConfirmarEliminar() {
    if (!albumEliminar) return;
    eliminar.mutate(albumEliminar.id, {
      onSuccess: () => setAlbumEliminar(null),
    });
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Galería</h1>
        <button
          onClick={abrirCrear}
          className="bg-yellow-500 text-black font-medium px-4 py-2 rounded-md"
        >
          Nuevo álbum
        </button>
      </div>

      <AlbumsTable
        albums={data}
        isLoading={isLoading}
        isError={isError}
        onEditar={abrirEditar}
        onEliminar={setAlbumEliminar}
        onGestionarFotos={(album) => setAlbumGestionarId(album.id)}
      />

      {mostrarForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-semibold mb-4">
              {albumEditar ? "Editar álbum" : "Nuevo álbum"}
            </h2>
            <AlbumForm
              valoresIniciales={albumEditar ?? undefined}
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

      {albumGestionarId && albumGestionar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
              Fotos de {albumGestionar.titulo}
            </h2>

            <GalleryUploader albumId={albumGestionarId} />

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
              {albumGestionar.imagenes.map((imagen) => (
                <img
                  key={imagen.id}
                  src={imagen.url}
                  alt=""
                  className="aspect-square object-cover rounded-md"
                />
              ))}
            </div>

            <button
              onClick={() => setAlbumGestionarId(null)}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {albumEliminar && (
        <AlbumDeleteDialog
          album={albumEliminar}
          onConfirmar={handleConfirmarEliminar}
          onCancelar={() => setAlbumEliminar(null)}
          isDeleting={eliminar.isPending}
        />
      )}
    </div>
  );
}