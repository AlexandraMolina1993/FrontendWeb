import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarAlbum } from "../services/album.api";
import { albumKeys } from "./album.keys";
import type { ActualizarAlbumInput } from "../types/album.types";

interface Variables {
  id: string;
  input: ActualizarAlbumInput;
}

export function useActualizarAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: Variables) => actualizarAlbum(id, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: albumKeys.detail(variables.id),
      });
    },
  });
}