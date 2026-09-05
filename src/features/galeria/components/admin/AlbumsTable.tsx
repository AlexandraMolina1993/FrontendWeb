import type { Album } from "../../types/album.types";

interface Props {
  albums: Album[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onEditar: (album: Album) => void;
  onEliminar: (album: Album) => void;
  onGestionarFotos: (album: Album) => void;
}

export function AlbumsTable({
  albums,
  isLoading,
  isError,
  onEditar,
  onEliminar,
  onGestionarFotos,
}: Props) {
  if (isLoading) {
    return <p className="text-center text-gray-500 py-8">Cargando...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-8">
        No pudimos cargar los álbumes.
      </p>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        Todavía no hay álbumes cargados.
      </p>
    );
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
          <th className="py-3 px-4">Título</th>
          <th className="py-3 px-4">Fecha</th>
          <th className="py-3 px-4">Fotos</th>
          <th className="py-3 px-4">Estado</th>
          <th className="py-3 px-4 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {albums.map((album) => (
          <tr key={album.id} className="border-b border-gray-100">
            <td className="py-3 px-4 font-medium">{album.titulo}</td>
            <td className="py-3 px-4 text-sm text-gray-400">
              {new Date(album.fecha).toLocaleDateString("es-AR")}
            </td>
            <td className="py-3 px-4 text-sm text-gray-600">
              {album.cantidadImagenes}
            </td>
            <td className="py-3 px-4">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  album.activo
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {album.activo ? "Activo" : "Inactivo"}
              </span>
            </td>
            <td className="py-3 px-4 text-right space-x-2">
              <button
                onClick={() => onGestionarFotos(album)}
                className="text-sm text-yellow-600 hover:underline"
              >
                Fotos
              </button>
              <button
                onClick={() => onEditar(album)}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onEliminar(album)}
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