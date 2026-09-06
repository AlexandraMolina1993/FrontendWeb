import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAlbum } from "../../hooks/useAlbum";
import { ImageLightbox } from "../../components/public/ImageLightbox";

export default function AlbumDetallePage() {
  const { id } = useParams<{ id: string }>();
  const { data: album, isLoading, isError } = useAlbum(id ?? "");
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);

  if (isLoading) {
    return <p className="text-center py-12">Cargando...</p>;
  }

  if (isError || !album) {
    return (
      <p className="text-center py-12 text-red-500">
        No pudimos cargar este álbum.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{album.titulo}</h1>
      <p className="text-gray-600 mb-6">{album.descripcion}</p>

      {album.imagenes.length === 0 ? (
        <p className="text-gray-500">Este álbum todavía no tiene fotos.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {album.imagenes.map((imagen, i) => (
            <button
              key={imagen.id}
              onClick={() => setIndiceAbierto(i)}
              className="aspect-square overflow-hidden rounded-md"
            >
              <img
                src={imagen.url}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </button>
          ))}
        </div>
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