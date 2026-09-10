import { useQuery } from "@tanstack/react-query";
import { obtenerPublicaciones } from "../services/publicacion.api";
import { publicacionKeys } from "./publicacion.keys";
import type { TipoPublicacion } from "../types/publicacion.types";

/**
 * El endpoint devuelve todas las publicaciones, así que compartimos una única
 * entrada de caché y filtramos por tipo en el cliente. Usar el tipo dentro de
 * la queryKey haría que cada filtro repitiera el mismo request.
 */
export function usePublicaciones(tipo?: TipoPublicacion) {
  return useQuery({
    queryKey: publicacionKeys.list(),
    queryFn: obtenerPublicaciones,
    select: (data) => (tipo ? data.filter((p) => p.tipo === tipo) : data),
  });
}
