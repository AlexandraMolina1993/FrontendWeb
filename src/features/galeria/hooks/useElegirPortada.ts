import { useMutation, useQueryClient } from "@tanstack/react-query";
import { elegirPortada } from "../services/album.api";
import { albumKeys } from "./album.keys";

interface Variables {
  albumId: string;
  imagenId: string;
}

export function useElegirPortada() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, imagenId }: Variables) =>
      elegirPortada(albumId, imagenId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: albumKeys.detail(variables.albumId),
      });
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}