import { useState } from "react";
import type { Imagen } from "../../types/album.types";

interface Props {
  imagenes: Imagen[];
  indiceInicial: number;
  onClose: () => void;
}

export function ImageLightbox({ imagenes, indiceInicial, onClose }: Props) {
  const [indice, setIndice] = useState(indiceInicial);
  const imagenActual = imagenes[indice];

  function anterior() {
    setIndice((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  }

  function siguiente() {
    setIndice((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          anterior();
        }}
        className="absolute left-4 text-white text-3xl"
        aria-label="Anterior"
      >
        ‹
      </button>

      <img
        src={imagenActual.url}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          siguiente();
        }}
        className="absolute right-4 text-white text-3xl"
        aria-label="Siguiente"
      >
        ›
      </button>

      <span className="absolute bottom-4 text-white text-sm">
        {indice + 1} / {imagenes.length}
      </span>
    </div>
  );
}