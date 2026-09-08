import type { Publicacion } from "../../types/publicacion.types";

interface Props {
  publicacion: Publicacion;
}

export function PublicacionCard({ publicacion }: Props) {
  const fecha = new Date(publicacion.createdAt).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <img
        src={publicacion.imagenUrl}
        alt={publicacion.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs font-medium text-yellow-600 uppercase">
          {publicacion.tipo}
        </span>
        <h3 className="text-lg font-semibold mt-1 mb-2">
          {publicacion.titulo}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{publicacion.resumen}</p>
        <span className="text-xs text-gray-400">{fecha}</span>
      </div>
    </article>
  );
}