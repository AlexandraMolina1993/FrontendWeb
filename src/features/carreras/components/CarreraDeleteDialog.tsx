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
      titulo="Dar de baja la carrera"
      descripcion={
        carrera
          ? `Se va a dar de baja "${carrera.nombre}". Deja de aparecer en el listado público.`
          : "Se va a dar de baja esta carrera. Deja de aparecer en el listado público."
      }
      confirmar={confirmar}
      cancelar={cancelar}
      textoConfirmar="Sí, dar de baja"
      textoCancelar="Cancelar"
      peligro
      cargando={cargando}
    />
  );
}
