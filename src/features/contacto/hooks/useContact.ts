import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actualizarEstadoMensaje, actualizarInformacionContacto, enviarMensaje, obtenerInformacionContacto, obtenerMensajes, responderMensaje } from "../services/contact.api";
import type { ContactInformation, ContactMessageInput, ContactMessageStatus, ContactReplyInput } from "../types/contact.types";

const contactKeys = { messages: ["contact-messages"] as const, information: ["contact-information"] as const };

export function useContactInformation() {
  return useQuery({ queryKey: contactKeys.information, queryFn: obtenerInformacionContacto });
}

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
  const saveInformation = useMutation({ mutationFn: (input: ContactInformation) => actualizarInformacionContacto(input), onSuccess: () => queryClient.invalidateQueries({ queryKey: contactKeys.information }) });
  return { status, reply, saveInformation };
}
