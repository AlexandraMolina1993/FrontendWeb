// Datos de demostración hasta contar con un servicio del dashboard.
export type Actualizacion = {
  id: number;
  contenido: string;
  seccion: string;
  responsable: string;
  estado: "publicado" | "borrador" | "pendiente";
  fecha: string;
};

export type Preinscripcion = {
  id: number;
  aspirante: string;
  carrera: string;
  fecha: string;
  estado: "activo" | "pendiente" | "rechazado";
};

export const actualizaciones: Actualizacion[] = [
  { id: 1, contenido: "Desarrollo de Software", seccion: "Carreras", responsable: "Administración", estado: "publicado", fecha: "Hoy, 09:40" },
  { id: 2, contenido: "Historia y misión institucional", seccion: "Información institucional", responsable: "Secretaría", estado: "publicado", fecha: "Ayer, 16:25" },
  { id: 3, contenido: "Jornada de orientación vocacional", seccion: "Noticias y actividades", responsable: "Comunicación", estado: "pendiente", fecha: "Ayer, 12:10" },
  { id: 4, contenido: "Feria de carreras 2026", seccion: "Galería", responsable: "Comunicación", estado: "publicado", fecha: "29 ago, 18:05" },
  { id: 5, contenido: "Gestión Ambiental", seccion: "Carreras", responsable: "Coordinación", estado: "borrador", fecha: "28 ago, 10:22" },
];

export const preinscripciones: Preinscripcion[] = [
  { id: 1042, aspirante: "Lucía Ferreyra", carrera: "Desarrollo de Software", fecha: "04/09/2026", estado: "pendiente" },
  { id: 1041, aspirante: "Mateo Rodríguez", carrera: "Enfermería", fecha: "03/09/2026", estado: "activo" },
  { id: 1040, aspirante: "Sofía Acosta", carrera: "Administración", fecha: "02/09/2026", estado: "pendiente" },
  { id: 1039, aspirante: "Tomás Benítez", carrera: "Desarrollo de Software", fecha: "01/09/2026", estado: "rechazado" },
];

export const tareas = [
  { id: 1, titulo: "Completar el plan de Gestión Ambiental", seccion: "Carreras", fecha: "Hoy" },
  { id: 2, titulo: "Seleccionar portada del acto académico", seccion: "Galería", fecha: "05 sep" },
  { id: 3, titulo: "Revisar la jornada vocacional", seccion: "Noticias y actividades", fecha: "06 sep" },
  { id: 4, titulo: "Revisar preinscripciones pendientes", seccion: "Preinscripciones", fecha: "Hoy" },
];
