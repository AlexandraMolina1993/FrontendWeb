import { useState } from "react";
import { useSubirImagenes } from "../../hooks/useSubirImagenes";

interface Props {
  albumId: string;
}

export function GalleryUploader({ albumId }: Props) {
  const [archivosSeleccionados, setArchivosSeleccionados] = useState<File[]>(
    []
  );
  const subirImagenes = useSubirImagenes();

  function handleSeleccionarArchivos(e: React.ChangeEvent<HTMLInputElement>) {
    const archivos = e.target.files ? Array.from(e.target.files) : [];
    setArchivosSeleccionados(archivos);
  }

  function handleSubir() {
    if (archivosSeleccionados.length === 0) return;

    subirImagenes.mutate(
      { id: albumId, archivos: archivosSeleccionados },
      {
        onSuccess: () => setArchivosSeleccionados([]),
      }
    );
  }

  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleSeleccionarArchivos}
        className="mb-3 block w-full text-sm"
      />

      {archivosSeleccionados.length > 0 && (
        <p className="text-sm text-gray-600 mb-3">
          {archivosSeleccionados.length} imagen(es) seleccionada(s)
        </p>
      )}

      <button
        onClick={handleSubir}
        disabled={
          archivosSeleccionados.length === 0 || subirImagenes.isPending
        }
        className="bg-yellow-500 text-black font-medium px-4 py-2 rounded-md text-sm disabled:opacity-50"
      >
        {subirImagenes.isPending ? "Subiendo..." : "Subir fotos"}
      </button>

      {subirImagenes.isError && (
        <p className="text-sm text-red-500 mt-2">
          Ocurrió un error al subir las fotos.
        </p>
      )}
    </div>
  );
}