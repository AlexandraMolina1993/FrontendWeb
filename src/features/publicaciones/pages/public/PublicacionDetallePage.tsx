import { useParams } from "react-router-dom";

import Badge from "../../../../components/ui/badge";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import { usePublicacion } from "../../hooks/usePublicacion";

export default function PublicacionDetallePage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: publicacion,
    isLoading,
    isError,
    refetch,
  } = usePublicacion(id ?? "");

  if (isLoading) {
    return <LoadingSpinner text="Cargando publicación..." />;
  }

  if (isError || !publicacion) {
    return (
      <ErrorState
        title="No pudimos cargar esta publicación"
        description="Puede que haya sido eliminada o que el enlace no sea válido."
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Badge variant={publicacion.tipo === "EVENTO" ? "info" : "secondary"}>
        {publicacion.tipo === "EVENTO" ? "Evento" : "Noticia"}
      </Badge>
      <h1 className="mb-4 mt-2 text-3xl font-black text-zinc-950">
        {publicacion.titulo}
      </h1>
      {publicacion.imagenUrl && (
        <img
          src={publicacion.imagenUrl}
          alt={publicacion.titulo}
          className="mb-6 h-80 w-full rounded-2xl object-cover"
        />
      )}
      <p className="whitespace-pre-line text-zinc-700">
        {publicacion.contenido}
      </p>
    </article>
  );
}
