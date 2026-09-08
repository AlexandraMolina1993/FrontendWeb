import type { Publicacion } from "../../types/publicacion.types";
import { PublicacionCard } from "./PublicacionCard";

interface Props {
  publicaciones: Publicacion[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function PublicacionesGrid({
  publicaciones,
  isLoading,
  isError,
}: Props) {
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

  if (!publicaciones || publicaciones.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No hay publicaciones para mostrar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {publicaciones.map((publicacion) => (
        <PublicacionCard key={publicacion.id} publicacion={publicacion} />
      ))}
    </div>
  );
}