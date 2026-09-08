import type { Publicacion } from "../../types/publicacion.types";

interface Props {
  publicacion: Publicacion;
  onConfirmar: () => void;
  onCancelar: () => void;
  isDeleting: boolean;
}

export function PublicacionDeleteDialog({
  publicacion,
  onConfirmar,
  onCancelar,
  isDeleting,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-2">
          ¿Eliminar esta publicación?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Vas a eliminar <strong>{publicacion.titulo}</strong>. Esta acción no
          se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm rounded-md border border-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={isDeleting}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white disabled:opacity-50"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}