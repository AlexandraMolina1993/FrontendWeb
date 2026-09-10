import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactivarAlbum } from "../services/album.api";
import { albumKeys } from "./album.keys";

export function useReactivarAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactivarAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}