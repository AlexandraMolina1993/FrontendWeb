import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarPublicacion } from "../services/publicacion.api";
import { publicacionKeys } from "./publicacion.keys";

export function useEliminarPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarPublicacion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publicacionKeys.lists() });
    },
  });
}