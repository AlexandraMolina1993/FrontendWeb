import ConfirmDialog from "../../../../components/ui/confirmDialog";
import type { Album } from "../../types/album.types";

interface Props {
  album: Album | null;
  onConfirmar: () => void;
  onCancelar: () => void;
  isDeleting: boolean;
}

export function AlbumDeleteDialog({
  album,
  onConfirmar,
  onCancelar,
  isDeleting,
}: Props) {
  return (
    <ConfirmDialog
      abierto={Boolean(album)}
      titulo="¿Eliminar este álbum?"
      descripcion={`Vas a eliminar "${album?.titulo ?? ""}" (${album?.cantidadImagenes ?? 0} fotos). Esta acción no se puede deshacer.`}
      confirmar={onConfirmar}
      cancelar={onCancelar}
      textoConfirmar="Eliminar"
      peligro
      cargando={isDeleting}
    />
  );
}
