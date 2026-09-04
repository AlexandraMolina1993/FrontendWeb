import ConfirmDialog from "../../../components/ui/confirmDialog";

import type { Carrera } from "../types/carrera.types";

interface CarreraDeleteDialogProps {
  abierto: boolean;
  carrera: Carrera | null;
  confirmar: () => void;
  cancelar: () => void;
  cargando?: boolean;
}

export default function CarreraDeleteDialog({
  abierto,
  carrera,
  confirmar,
  cancelar,
  cargando = false,
}: CarreraDeleteDialogProps) {
  return (
    <ConfirmDialog
      abierto={abierto}
      titulo="Eliminar carrera"
      descripcion={
        carrera
          ? `Se va a eliminar "${carrera.nombre}". Esta acción no se puede deshacer.`
          : "Se va a eliminar esta carrera. Esta acción no se puede deshacer."
      }
      confirmar={confirmar}
      cancelar={cancelar}
      textoConfirmar="Sí, eliminar"
      textoCancelar="Cancelar"
      peligro
      cargando={cargando}
    />
  );
}
