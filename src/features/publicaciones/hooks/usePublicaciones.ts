import { useQuery } from "@tanstack/react-query";
import { obtenerPublicaciones } from "../services/publicacion.api";
import { publicacionKeys } from "./publicacion.keys";
import type { TipoPublicacion } from "../types/publicacion.types";

export function usePublicaciones(tipo?: TipoPublicacion) {
  return useQuery({
    queryKey: publicacionKeys.list(tipo),
    queryFn: obtenerPublicaciones,
    select: (data) => (tipo ? data.filter((p) => p.tipo === tipo) : data),
  });
}