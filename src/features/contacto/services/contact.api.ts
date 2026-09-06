import { apiClient } from "../../../shared/lib/api/client";
import type { ContactMessage, ContactMessageInput, ContactMessageStatus, ContactReplyInput } from "../types/contact.types";

export async function enviarMensaje(input: ContactMessageInput) {
  const { data } = await apiClient.post<ContactMessage>("/contacto", input);
  return data;
}

export async function obtenerMensajes() {
  const { data } = await apiClient.get<ContactMessage[]>("/contacto");
  return data;
}

export async function obtenerMensaje(id: string) {
  const { data } = await apiClient.get<ContactMessage>(`/contacto/${id}`);
  return data;
}

export async function actualizarEstadoMensaje(id: string, estado: ContactMessageStatus) {
  const { data } = await apiClient.patch<ContactMessage>(`/contacto/${id}`, { estado });
  return data;
}

export async function responderMensaje(id: string, input: ContactReplyInput) {
  const { data } = await apiClient.patch<ContactMessage>(`/contacto/${id}`, input);
  return data;
}
