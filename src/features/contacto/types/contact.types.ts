export type ContactMessageStatus = "NUEVO" | "LEIDO" | "RESPONDIDO" | "ARCHIVADO";

export interface ContactMessage {
  id: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  asunto: string;
  mensaje: string;
  estado: ContactMessageStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactMessageInput {
  nombre: string;
  email: string;
  telefono?: string;
  asunto: string;
  mensaje: string;
}

export interface ContactInformation {
  email: string;
  telefono: string;
  direccion: string;
  horario: string;
  mapaUrl?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface ContactReplyInput {
  respuesta: string;
}
