import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { Imagen } from "../../types/album.types";

interface Props {
  imagenes: Imagen[];
  indiceInicial: number;
  onClose: () => void;
}

const botonStyle =
  "absolute grid size-11 place-items-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors hover:border-[#FFD21A] hover:bg-[#FFD21A] hover:text-[#171717] focus:outline-none focus:ring-4 focus:ring-[#FFD21A]/30";

export function ImageLightbox({ imagenes, indiceInicial, onClose }: Props) {
  const [indice, setIndice] = useState(indiceInicial);
  const imagenActual = imagenes[indice];

  const anterior = useCallback(() => {
    setIndice((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  }, [imagenes.length]);

  const siguiente = useCallback(() => {
    setIndice((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  }, [imagenes.length]);

  useEffect(() => {
    const manejarTeclado = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onClose();
      if (evento.key === "ArrowLeft") anterior();
      if (evento.key === "ArrowRight") siguiente();
    };

    const overflowAnterior = document.body.style.overflow;
    document.addEventListener("keydown", manejarTeclado);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", manejarTeclado);
      document.body.style.overflow = overflowAnterior;
    };
  }, [anterior, siguiente, onClose]);

  if (!imagenActual) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/95"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotografías"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className={`${botonStyle} right-4 top-4`}
        aria-label="Cerrar"
      >
        <X size={20} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          anterior();
        }}
        className={`${botonStyle} left-4`}
        aria-label="Foto anterior"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>

      <img
        src={imagenActual.url}
        alt=""
        className="max-h-[85vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          siguiente();
        }}
        className={`${botonStyle} right-4`}
        aria-label="Foto siguiente"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <span className="absolute bottom-4 text-sm font-semibold text-white">
        {indice + 1} / {imagenes.length}
      </span>
    </div>
  );
}
