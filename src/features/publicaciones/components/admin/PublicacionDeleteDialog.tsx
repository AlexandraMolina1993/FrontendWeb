import ConfirmDialog from "../../../../components/ui/confirmDialog";
import type { Publicacion } from "../../types/publicacion.types";

interface Props {
  publicacion: Publicacion | null;
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
    <ConfirmDialog
      abierto={Boolean(publicacion)}
      titulo="¿Eliminar esta publicación?"
      descripcion={`Vas a eliminar "${publicacion?.titulo ?? ""}". Esta acción no se puede deshacer.`}
      confirmar={onConfirmar}
      cancelar={onCancelar}
      textoConfirmar="Eliminar"
      peligro
      cargando={isDeleting}
    />
  );
}
