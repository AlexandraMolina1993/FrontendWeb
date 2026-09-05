import type { Publicacion } from "../../types/publicacion.types";

interface Props {
  publicaciones: Publicacion[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onEditar: (publicacion: Publicacion) => void;
  onEliminar: (publicacion: Publicacion) => void;
}

export function PublicacionTable({
  publicaciones,
  isLoading,
  isError,
  onEditar,
  onEliminar,
}: Props) {
  if (isLoading) {
    return <p className="text-center text-gray-500 py-8">Cargando...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-8">
        No pudimos cargar las publicaciones.
      </p>
    );
  }

  if (!publicaciones || publicaciones.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        Todavía no hay publicaciones cargadas.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
          <th className="py-3 px-4">Título</th>
          <th className="py-3 px-4">Tipo</th>
          <th className="py-3 px-4">Autor</th>
          <th className="py-3 px-4">Fecha</th>
          <th className="py-3 px-4 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {publicaciones.map((publicacion) => (
          <tr key={publicacion.id} className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium">{publicacion.titulo}</td>
            <td className="py-3 px-4">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {publicacion.tipo}
              </span>
            </td>
            <td className="py-3 px-4 text-sm text-gray-600">
              {publicacion.autor.nombre} {publicacion.autor.apellido}
            </td>
            <td className="py-3 px-4 text-sm text-gray-400">
              {new Date(publicacion.createdAt).toLocaleDateString("es-AR")}
            </td>
            <td className="py-3 px-4 text-right space-x-2">
              <button
                onClick={() => onEditar(publicacion)}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onEliminar(publicacion)}
                className="text-sm text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}