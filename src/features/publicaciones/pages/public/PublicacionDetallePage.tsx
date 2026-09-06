import { useParams } from "react-router-dom";
import { usePublicacion } from "../../hooks/usePublicacion";

export default function PublicacionDetallePage() {
  const { id } = useParams<{ id: string }>();
  const { data: publicacion, isLoading, isError } = usePublicacion(id ?? "");

  if (isLoading) {
    return <p className="text-center py-12">Cargando...</p>;
  }

  if (isError || !publicacion) {
    return (
      <p className="text-center py-12 text-red-500">
        No pudimos cargar esta publicación.
      </p>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <span className="text-xs font-medium text-yellow-600 uppercase">
        {publicacion.tipo}
      </span>
      <h1 className="text-3xl font-bold mt-2 mb-4">{publicacion.titulo}</h1>
      <img
        src={publicacion.imagenUrl}
        alt={publicacion.titulo}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 whitespace-pre-line">
        {publicacion.contenido}
      </p>
    </article>
  );
}