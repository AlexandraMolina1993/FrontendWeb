import type { Carrera } from "../types/carrera.types";

/** Ejemplo publicado en GET /carreras de la documentación de la API. */
export const CARRERA_EJEMPLO_API: Carrera = {
  id: "c1c1a2b3c4d5e6f7g8h9i0j1",
  nombre: "Tecnicatura Superior en Programacion",
  slug: "tecnicatura-superior-en-programacion",
  descripcion: "Carrera orientada al desarrollo de software.",
  duracionAnios: 3,
  tituloOtorgado: "Tecnico Superior en Programacion",
  modalidad: "PRESENCIAL",
  activa: true,
  createdAt: "2026-09-04T21:40:43.481Z",
  updatedAt: "2026-09-04T21:40:43.481Z",
};

export function coincideConEjemplo(carrera: Carrera, buscar = "", modalidad = "") {
  const texto =
    `${carrera.nombre} ${carrera.tituloOtorgado} ${carrera.slug} ${carrera.descripcion}`.toLowerCase();
  const pasaBusqueda = !buscar || texto.includes(buscar.toLowerCase());
  const pasaModalidad = !modalidad || carrera.modalidad === modalidad;

  return pasaBusqueda && pasaModalidad;
}
