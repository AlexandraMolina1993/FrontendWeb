import { Star, Trash2 } from "lucide-react";

import Button from "../../../../components/ui/button";
import EmptyState from "../../../../components/ui/emptyState";
import { getApiErrorMessage } from "../../../../shared/lib/api/api-error";
import { useElegirPortada } from "../../hooks/useElegirPortada";
import { useEliminarImagen } from "../../hooks/useEliminarImagen";
import type { AlbumDetalle } from "../../types/album.types";
import { GalleryUploader } from "./GalleryUploader";

interface Props {
  album: AlbumDetalle;
}

export function AlbumImagesManager({ album }: Props) {
  const eliminarImagen = useEliminarImagen();
  const elegirPortada = useElegirPortada();

  const error = elegirPortada.error ?? eliminarImagen.error;

  return (
    <div className="space-y-4">
      {album.activo ? (
        <GalleryUploader albumId={album.id} />
      ) : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          Este álbum está dado de baja. Reactivalo para poder subirle fotos.
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          No pudimos aplicar el cambio: {getApiErrorMessage(error)}
        </p>
      )}

      {album.imagenes.length === 0 ? (
        <EmptyState
          title="Este álbum todavía no tiene fotos"
          description="Subí las primeras imágenes para poder elegir una portada."
        />
      ) : (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {album.imagenes.map((imagen) => {
            const esPortada = imagen.id === album.portadaId;

            return (
              <li key={imagen.id} className="group relative">
                <img
                  src={imagen.url}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full rounded-xl object-cover"
                />

                {esPortada && (
                  <span className="absolute left-1 top-1 rounded-full bg-[#FFD21A] px-2 py-0.5 text-[10px] font-bold text-[#171717]">
                    Portada
                  </span>
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl bg-black/60 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                  <Button
                    className="h-8 px-2 text-xs"
                    disabled={esPortada || elegirPortada.isPending}
                    onClick={() =>
                      elegirPortada.mutate({
                        albumId: album.id,
                        imagenId: imagen.id,
                      })
                    }
                  >
                    <Star aria-hidden="true" />
                    Portada
                  </Button>
                  <Button
                    variant="danger"
                    className="h-8 px-2 text-xs"
                    disabled={eliminarImagen.isPending}
                    onClick={() =>
                      eliminarImagen.mutate({
                        albumId: album.id,
                        imagenId: imagen.id,
                      })
                    }
                  >
                    <Trash2 aria-hidden="true" />
                    Eliminar
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
