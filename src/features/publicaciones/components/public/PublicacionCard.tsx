import { useState } from "react";
import { ImageOff } from "lucide-react";

import Badge from "../../../../components/ui/badge";
import type { Publicacion } from "../../types/publicacion.types";

interface Props {
  publicacion: Publicacion;
}

export function PublicacionCard({ publicacion }: Props) {
  const [imagenFallo, setImagenFallo] = useState(false);

  const fecha = new Date(
    publicacion.fechaEvento ?? publicacion.createdAt,
  ).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mostrarImagen = Boolean(publicacion.imagenUrl) && !imagenFallo;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {mostrarImagen ? (
        <img
          src={publicacion.imagenUrl}
          alt={publicacion.titulo}
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
        <Badge variant={publicacion.tipo === "EVENTO" ? "info" : "secondary"}>
          {publicacion.tipo === "EVENTO" ? "Evento" : "Noticia"}
        </Badge>
        <h3 className="mb-2 mt-2 text-lg font-bold text-zinc-900">
          {publicacion.titulo}
        </h3>
        <p className="mb-3 text-sm text-zinc-600">{publicacion.resumen}</p>
        <span className="text-xs text-zinc-400">{fecha}</span>
      </div>
    </article>
  );
}
