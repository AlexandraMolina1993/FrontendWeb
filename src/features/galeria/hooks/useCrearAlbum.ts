import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearAlbum } from "../services/album.api";
import { albumKeys } from "./album.keys";

export function useCrearAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}