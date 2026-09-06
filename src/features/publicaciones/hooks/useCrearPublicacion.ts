import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearPublicacion } from "../services/publicacion.api";
import { publicacionKeys } from "./publicacion.keys";

export function useCrearPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: crearPublicacion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: publicacionKeys.lists() });
    },
  });
}