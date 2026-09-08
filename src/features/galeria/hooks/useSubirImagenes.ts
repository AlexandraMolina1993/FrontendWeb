import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subirImagenes } from "../services/album.api";
import { albumKeys } from "./album.keys";

interface Variables {
  id: string;
  archivos: File[];
}

export function useSubirImagenes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, archivos }: Variables) => subirImagenes(id, archivos),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: albumKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: albumKeys.lists() });
    },
  });
}