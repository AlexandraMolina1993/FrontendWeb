import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarImagen } from "../services/album.api";
import { albumKeys } from "./album.keys";

interface Variables {
  albumId: string;
  imagenId: string;
}

export function useEliminarImagen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, imagenId }: Variables) =>
      eliminarImagen(albumId, imagenId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: albumKeys.detail(variables.albumId),
      });
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}