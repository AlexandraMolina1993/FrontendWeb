import { Images } from "lucide-react";

import EmptyState from "../../../../components/ui/emptyState";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import type { Album } from "../../types/album.types";
import { AlbumCard } from "./AlbumCard";

interface Props {
  albums: Album[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onReintentar?: () => void;
}

export function AlbumsGrid({
  albums,
  isLoading,
  isError,
  onReintentar,
}: Props) {
  if (isLoading) {
    return <LoadingSpinner text="Cargando álbumes..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="No pudimos cargar la galería"
        description="Revisá tu conexión e intentá nuevamente."
        onRetry={onReintentar}
      />
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay álbumes"
        description="Cuando se publiquen álbumes de fotos vas a verlos acá."
        icon={<Images size={26} />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
