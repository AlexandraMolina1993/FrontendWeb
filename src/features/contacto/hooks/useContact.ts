import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actualizarEstadoMensaje, enviarMensaje, obtenerMensajes, responderMensaje } from "../services/contact.api";
import type { ContactMessageInput, ContactMessageStatus, ContactReplyInput } from "../types/contact.types";

const contactKeys = { messages: ["contact-messages"] as const };

export function useContactMessages() {
  return useQuery({ queryKey: contactKeys.messages, queryFn: obtenerMensajes });
}

export function useSendContactMessage() {
  return useMutation({ mutationFn: (input: ContactMessageInput) => enviarMensaje(input) });
}

export function useContactAdminActions() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: contactKeys.messages });
  const status = useMutation({ mutationFn: ({ id, estado }: { id: string; estado: ContactMessageStatus }) => actualizarEstadoMensaje(id, estado), onSuccess: invalidate });
  const reply = useMutation({ mutationFn: ({ id, input }: { id: string; input: ContactReplyInput }) => responderMensaje(id, input), onSuccess: invalidate });
  return { status, reply };
}
