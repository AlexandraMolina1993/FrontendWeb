import { apiClient } from "../../../shared/lib/api/client";
import type { ContactInformation, ContactMessage, ContactMessageInput, ContactMessageStatus, ContactReplyInput } from "../types/contact.types";

export async function enviarMensaje(input: ContactMessageInput) {
  const { data } = await apiClient.post<ContactMessage>("/api/Contact", input);
  return data;
}

export async function obtenerMensajes() {
  const { data } = await apiClient.get<ContactMessage[]>("/api/Contact");
  return data;
}

export async function obtenerMensaje(id: string) {
  const { data } = await apiClient.get<ContactMessage>(`/api/Contact/${id}`);
  return data;
}

export async function actualizarEstadoMensaje(id: string, estado: ContactMessageStatus) {
  const { data } = await apiClient.patch<ContactMessage>(`/api/Contact/${id}/status`, { estado });
  return data;
}

export async function responderMensaje(id: string, input: ContactReplyInput) {
  const { data } = await apiClient.post<ContactMessage>(`/api/Contact/${id}/reply`, input);
  return data;
}

export async function obtenerInformacionContacto() {
  const { data } = await apiClient.get<ContactInformation>("/api/ContactInformation");
  return data;
}

export async function actualizarInformacionContacto(input: ContactInformation) {
  const { data } = await apiClient.put<ContactInformation>("/api/ContactInformation", input);
  return data;
}
