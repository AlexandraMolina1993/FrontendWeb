import { AlertTriangle, CircleHelp } from "lucide-react";

import Button from "./button.js";
import Modal from "./modal.js";

import {
  confirmDialogContentStyle,
  confirmDialogDangerIconStyle,
  confirmDialogFooterStyle,
  confirmDialogIconStyle,
  confirmDialogTextStyle,
} from "../../shared/styles/confirm-dialog.styles.js";

interface ConfirmDialogProps {
  abierto: boolean;
  titulo: string;
  descripcion: string;
  confirmar: () => void;
  cancelar: () => void;
  textoConfirmar?: string;
  textoCancelar?: string;
  peligro?: boolean;
  cargando?: boolean;
}

export default function ConfirmDialog({
  abierto,
  titulo,
  descripcion,
  confirmar,
  cancelar,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  peligro = false,
  cargando = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      abierto={abierto}
      titulo={titulo}
      cerrar={cancelar}
      tamano="pequeno"
      cerrarAlHacerClickFuera={!cargando}
      mostrarBotonCerrar={!cargando}
      pie={
        <div className={confirmDialogFooterStyle}>
          <Button variant="secondary" onClick={cancelar} disabled={cargando}>
            {textoCancelar}
          </Button>
          <Button
            variant={peligro ? "danger" : "primary"}
            onClick={confirmar}
            disabled={cargando}
          >
            {cargando ? "Procesando..." : textoConfirmar}
          </Button>
        </div>
      }
    >
      <div className={confirmDialogContentStyle}>
        <div
          className={`${confirmDialogIconStyle} ${peligro ? confirmDialogDangerIconStyle : ""}`}
          aria-hidden="true"
        >
          {peligro ? <AlertTriangle size={24} /> : <CircleHelp size={24} />}
        </div>
        <p className={confirmDialogTextStyle}>{descripcion}</p>
      </div>
    </Modal>
  );
}
