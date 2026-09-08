import { useQuery } from "@tanstack/react-query";
import { obtenerAlbums } from "../services/album.api";
import { albumKeys } from "./album.keys";

export function useAlbums() {
  return useQuery({
    queryKey: albumKeys.list(),
    queryFn: obtenerAlbums,
  });
}