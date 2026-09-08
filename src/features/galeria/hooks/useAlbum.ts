import { useQuery } from "@tanstack/react-query";
import { obtenerAlbumPorId } from "../services/album.api";
import { albumKeys } from "./album.keys";

export function useAlbum(id: string) {
  return useQuery({
    queryKey: albumKeys.detail(id),
    queryFn: () => obtenerAlbumPorId(id),
    enabled: !!id,
  });
}