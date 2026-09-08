import type { Album } from "../../types/album.types";

interface Props {
  album: Album;
}

export function AlbumCard({ album }: Props) {
  const fecha = new Date(album.fecha).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <img
        src={album.portada?.url ?? ""}
        alt={album.titulo}
        className="w-full h-48 object-cover bg-gray-100"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{album.titulo}</h3>
        <p className="text-sm text-gray-600 mb-2">{album.descripcion}</p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{fecha}</span>
          <span>{album.cantidadImagenes} fotos</span>
        </div>
      </div>
    </article>
  );
}