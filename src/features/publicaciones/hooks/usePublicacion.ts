import { useQuery } from "@tanstack/react-query";
import { obtenerPublicacionPorId } from "../services/publicacion.api";
import { publicacionKeys } from "./publicacion.keys";

export function usePublicacion(id: string) {
  return useQuery({
    queryKey: publicacionKeys.detail(id),
    queryFn: () => obtenerPublicacionPorId(id),
    enabled: !!id,
  });
}