import { useState } from "react";
import { useParams } from "react-router-dom";

import EmptyState from "../../../../components/ui/emptyState";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import { useAlbum } from "../../hooks/useAlbum";
import { ImageLightbox } from "../../components/public/ImageLightbox";

export default function AlbumDetallePage() {
  const { id } = useParams<{ id: string }>();
  const { data: album, isLoading, isError, refetch } = useAlbum(id ?? "");
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);

  if (isLoading) {
    return <LoadingSpinner text="Cargando álbum..." />;
  }

  if (isError || !album) {
    return (
      <ErrorState
        title="No pudimos cargar este álbum"
        description="Puede que haya sido eliminado o que el enlace no sea válido."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-black text-zinc-950">{album.titulo}</h1>
      <p className="mb-6 text-zinc-600">{album.descripcion}</p>

      {album.imagenes.length === 0 ? (
        <EmptyState
          title="Este álbum todavía no tiene fotos"
          description="Volvé más adelante para ver las imágenes."
        />
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {album.imagenes.map((imagen, i) => (
            <li key={imagen.id}>
              <button
                type="button"
                onClick={() => setIndiceAbierto(i)}
                className="aspect-square w-full overflow-hidden rounded-xl focus:outline-none focus:ring-4 focus:ring-[#FFD21A]/30"
                aria-label={`Ver foto ${i + 1} de ${album.imagenes.length}`}
              >
                <img
                  src={imagen.url}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {indiceAbierto !== null && (
        <ImageLightbox
          imagenes={album.imagenes}
          indiceInicial={indiceAbierto}
          onClose={() => setIndiceAbierto(null)}
        />
      )}
    </div>
  );
}
