import { useState } from "react";
import { ImageOff } from "lucide-react";

import type { Album } from "../../types/album.types";

interface Props {
  album: Album;
}

export function AlbumCard({ album }: Props) {
  const [imagenFallo, setImagenFallo] = useState(false);

  const fecha = new Date(album.fecha).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const portada = album.portada?.url;
  const mostrarPortada = Boolean(portada) && !imagenFallo;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {mostrarPortada ? (
        <img
          src={portada}
          alt={album.titulo}
          className="h-48 w-full object-cover"
          loading="lazy"
          onError={() => setImagenFallo(true)}
        />
      ) : (
        <div
          className="grid h-48 w-full place-items-center bg-zinc-100 text-zinc-400"
          aria-hidden="true"
        >
          <ImageOff size={28} />
        </div>
      )}

      <div className="p-4">
        <h3 className="mb-1 text-lg font-bold text-zinc-900">{album.titulo}</h3>
        <p className="mb-2 text-sm text-zinc-600">{album.descripcion}</p>
        <div className="flex justify-between text-xs text-zinc-400">
          <span>{fecha}</span>
          <span>{album.cantidadImagenes} fotos</span>
        </div>
      </div>
    </article>
  );
}
