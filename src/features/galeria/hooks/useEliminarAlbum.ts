import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarAlbum } from "../services/album.api";
import { albumKeys } from "./album.keys";

export function useEliminarAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}