import { useRef, useState } from "react";
import { Upload } from "lucide-react";

import Button from "../../../../components/ui/button";
import { getApiErrorMessage } from "../../../../shared/lib/api/api-error";
import { useSubirImagenes } from "../../hooks/useSubirImagenes";

interface Props {
  albumId: string;
}

// Límites que impone la API en POST /albums/{id}/imagenes.
const MAXIMO_ARCHIVOS = 5;
const FORMATOS_ACEPTADOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export function GalleryUploader({ albumId }: Props) {
  const [archivosSeleccionados, setArchivosSeleccionados] = useState<File[]>(
    []
  );
  const [errorLocal, setErrorLocal] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const subirImagenes = useSubirImagenes();

  function limpiarInput() {
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleSeleccionarArchivos(e: React.ChangeEvent<HTMLInputElement>) {
    const archivos = e.target.files ? Array.from(e.target.files) : [];
    subirImagenes.reset();

    if (archivos.length > MAXIMO_ARCHIVOS) {
      setErrorLocal(
        `Podés subir hasta ${MAXIMO_ARCHIVOS} fotos por vez. Seleccionaste ${archivos.length}.`,
      );
      setArchivosSeleccionados([]);
      limpiarInput();
      return;
    }

    const invalido = archivos.find(
      (archivo) => !FORMATOS_ACEPTADOS.includes(archivo.type),
    );

    if (invalido) {
      setErrorLocal(
        `"${invalido.name}" no es un formato permitido. Se aceptan JPG, PNG, WebP y AVIF.`,
      );
      setArchivosSeleccionados([]);
      limpiarInput();
      return;
    }

    setErrorLocal(null);
    setArchivosSeleccionados(archivos);
  }

  function handleSubir() {
    if (archivosSeleccionados.length === 0) return;

    subirImagenes.mutate(
      { id: albumId, archivos: archivosSeleccionados },
      {
        onSuccess: () => {
          setArchivosSeleccionados([]);
          limpiarInput();
        },
      }
    );
  }

  const error = errorLocal ?? (subirImagenes.isError ? getApiErrorMessage(subirImagenes.error) : null);

  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-4">
      <input
        ref={inputRef}
        type="file"
        accept={FORMATOS_ACEPTADOS.join(",")}
        multiple
        onChange={handleSeleccionarArchivos}
        aria-label="Seleccionar fotografías"
        className="mb-3 block w-full text-sm text-zinc-600 file:mr-3 file:rounded-xl file:border file:border-zinc-300 file:bg-zinc-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-700"
      />

      <p className="mb-3 text-xs text-zinc-500">
        Hasta {MAXIMO_ARCHIVOS} fotos por vez, en JPG, PNG, WebP o AVIF.
      </p>

      {archivosSeleccionados.length > 0 && (
        <p className="mb-3 text-sm text-zinc-600">
          {archivosSeleccionados.length} imagen(es) seleccionada(s)
        </p>
      )}

      <Button
        onClick={handleSubir}
        disabled={archivosSeleccionados.length === 0 || subirImagenes.isPending}
      >
        <Upload aria-hidden="true" />
        {subirImagenes.isPending ? "Subiendo..." : "Subir fotos"}
      </Button>

      {error && (
        <p role="alert" className="mt-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
