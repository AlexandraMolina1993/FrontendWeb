import { Newspaper } from "lucide-react";

import EmptyState from "../../../../components/ui/emptyState";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import type { Publicacion } from "../../types/publicacion.types";
import { PublicacionCard } from "./PublicacionCard";

interface Props {
  publicaciones: Publicacion[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onReintentar?: () => void;
}

export function PublicacionesGrid({
  publicaciones,
  isLoading,
  isError,
  onReintentar,
}: Props) {
  if (isLoading) {
    return <LoadingSpinner text="Cargando publicaciones..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="No pudimos cargar las publicaciones"
        description="Revisá tu conexión e intentá nuevamente."
        onRetry={onReintentar}
      />
    );
  }

  if (!publicaciones || publicaciones.length === 0) {
    return (
      <EmptyState
        title="No hay publicaciones para mostrar"
        description="Cuando se publiquen noticias o eventos vas a verlos acá."
        icon={<Newspaper size={26} />}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {publicaciones.map((publicacion) => (
        <PublicacionCard key={publicacion.id} publicacion={publicacion} />
      ))}
    </div>
  );
}
