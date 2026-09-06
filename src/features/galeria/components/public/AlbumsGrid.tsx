import type { Album } from "../../types/album.types";
import { AlbumCard } from "./AlbumCard";

interface Props {
  albums: Album[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function AlbumsGrid({ albums, isLoading, isError }: Props) {
  if (isLoading) {
    return <p className="text-center text-gray-500 py-12">Cargando...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-12">
        No pudimos cargar la información.
      </p>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        Todavía no hay álbumes cargados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}