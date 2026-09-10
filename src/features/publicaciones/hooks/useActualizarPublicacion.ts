import { useMutation, useQueryClient } from "@tanstack/react-query";
import { actualizarPublicacion } from "../services/publicacion.api";
import { publicacionKeys } from "./publicacion.keys";
import type { ActualizarPublicacionInput } from "../types/publicacion.types";

interface Variables {
  id: string;
  input: ActualizarPublicacionInput;
}

export function useActualizarPublicacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: Variables) => actualizarPublicacion(id, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: publicacionKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: publicacionKeys.detail(variables.id),
      });
    },
  });
}