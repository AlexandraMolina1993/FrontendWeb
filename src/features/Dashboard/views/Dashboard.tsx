import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Image,
  MessageSquareText,
  PackageOpen,
} from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Button from "../../../components/ui/button";
import Card from "../../../components/ui/card";
import ErrorState from "../../../components/ui/errorState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import Modal from "../../../components/ui/modal";
import StatusBadge from "../../../components/ui/statusBadge";
import Table from "../../../components/ui/table";
import ContactoAdminPage from "../../contacto/pages/admin/ContactoAdminPage";
import {
  obtenerPreinscripciones,
  type Preinscripcion,
} from "../../preinscripciones/services/preinscripcion.api";
import ComponentLibrary from "./ComponentLibrary";

type Actualizacion = {
  id: number;
  contenido: string;
  seccion: string;
  responsable: string;
  estado: "publicado" | "borrador" | "pendiente";
  fecha: string;
};

const actualizaciones: Actualizacion[] = [
  {
    id: 1,
    contenido: "Desarrollo de Software",
    seccion: "Carreras",
    responsable: "Administración",
    estado: "publicado",
    fecha: "Hoy, 09:40",
  },
  {
    id: 2,
    contenido: "Historia y misión institucional",
    seccion: "Información institucional",
    responsable: "Secretaría",
    estado: "publicado",
    fecha: "Ayer, 16:25",
  },
  {
    id: 3,
    contenido: "Jornada de orientación vocacional",
    seccion: "Noticias y actividades",
    responsable: "Comunicación",
    estado: "pendiente",
    fecha: "Ayer, 12:10",
  },
  {
    id: 4,
    contenido: "Feria de carreras 2026",
    seccion: "Galería",
    responsable: "Comunicación",
    estado: "publicado",
    fecha: "29 ago, 18:05",
  },
  {
    id: 5,
    contenido: "Gestión Ambiental",
    seccion: "Carreras",
    responsable: "Coordinación",
    estado: "borrador",
    fecha: "28 ago, 10:22",
  },
];

const tareas = [
  {
    id: 1,
    titulo: "Completar el plan de Gestión Ambiental",
    seccion: "Carreras",
    fecha: "Hoy",
  },
  {
    id: 2,
    titulo: "Seleccionar portada del acto académico",
    seccion: "Galería",
    fecha: "05 sep",
  },
  {
    id: 3,
    titulo: "Revisar la jornada vocacional",
    seccion: "Noticias y actividades",
    fecha: "06 sep",
  },
  {
    id: 4,
    titulo: "Revisar preinscripciones pendientes",
    seccion: "Preinscripciones",
    fecha: "Hoy",
  },
];

const indicadores = [
  {
    titulo: "Carreras publicadas",
    valor: "12",
    detalle: "Una carrera requiere revisión",
    icono: BookOpen,
  },
  {
    titulo: "Publicaciones activas",
    valor: "8",
    detalle: "3 actividades programadas",
    icono: FileText,
  },
  {
    titulo: "Fotos en galería",
    valor: "54",
    detalle: "3 álbumes publicados",
    icono: Image,
  },
  {
    titulo: "Preinscripciones nuevas",
    valor: "43",
    detalle: "12 esperan revisión",
    icono: ClipboardList,
    destacada: true,
  },
];

function preinscripcionStatus(
  status: string | null | undefined,
): "activo" | "pendiente" | "rechazado" {
  if (status === "activo" || status === "rechazado") return status;
  return "pendiente";
}

function obtenerNombreCarrera(item: Preinscripcion) {
  return typeof item.carrera === "string"
    ? item.carrera
    : item.carrera?.nombre ?? item.carreraId ?? "-";
}

function obtenerNombreAspirante(item: Preinscripcion) {
  return `${item.nombre ?? ""} ${item.apellido ?? ""}`.trim() || "-";
}

function PreinscripcionesAdminPage() {
  const query = useQuery({
    queryKey: ["preinscripciones"],
    queryFn: obtenerPreinscripciones,
  });

  const columns = [
    {
      key: "aspirante",
      header: "Aspirante",
      render: (item: Preinscripcion) => (
        <div>
          <p className="font-bold text-zinc-900">
            {obtenerNombreAspirante(item)}
          </p>
          <p className="text-xs text-zinc-500">{item.email ?? "-"}</p>
        </div>
      ),
    },
    {
      key: "documento",
      header: "Documento",
      render: (item: Preinscripcion) => item.documento ?? "-",
    },
    {
      key: "carrera",
      header: "Carrera",
      render: (item: Preinscripcion) => obtenerNombreCarrera(item),
    },
    {
      key: "fecha",
      header: "Fecha",
      render: (item: Preinscripcion) =>
        item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("es-AR")
          : "-",
    },
    {
      key: "estado",
      header: "Estado",
      render: (item: Preinscripcion) => {
        const status = preinscripcionStatus(item.estado);

        return (
          <StatusBadge
            status={status}
            label={
              status === "activo"
                ? "Aprobada"
                : status === "rechazado"
                  ? "Rechazada"
                  : "Pendiente"
            }
            mostrarPunto={false}
          />
        );
      },
    },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-7 px-5 py-8 sm:px-8 lg:px-12">
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B78700]">
          Administración
        </p>
        <h1 className="mt-2 text-3xl font-black text-zinc-950">
          Preinscripciones
        </h1>
        <p className="mt-2 text-zinc-500">
          Solicitudes recibidas desde el formulario de preinscripción.
        </p>
      </header>

      {query.isLoading && (
        <LoadingSpinner text="Cargando preinscripciones..." />
      )}

      {query.isError && (
        <ErrorState
          onRetry={() => void query.refetch()}
          title="No pudimos cargar las preinscripciones"
        />
      )}

      {!query.isLoading && !query.isError && (
        <Table
          columns={columns}
          data={query.data ?? []}
          getRowKey={(item) => item.id}
          caption="Preinscripciones recibidas"
          emptyMessage="No hay preinscripciones para mostrar."
        />
      )}
    </main>
  );
}

export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [solicitud, setSolicitud] = useState<Preinscripcion | null>(null);

  const preinscripcionesQuery = useQuery({
    queryKey: ["preinscripciones"],
    queryFn: obtenerPreinscripciones,
    enabled: pathname === "/dashboard",
  });

  if (pathname === "/dashboard/contacto") {
    return (
      <AdminLayout>
        <ContactoAdminPage />
      </AdminLayout>
    );
  }

  if (pathname === "/dashboard/preinscripciones") {
    return (
      <AdminLayout>
        <PreinscripcionesAdminPage />
      </AdminLayout>
    );
  }

  if (pathname === "/dashboard/componentes") {
    return (
      <AdminLayout>
        <ComponentLibrary />
      </AdminLayout>
    );
  }

  const columnasActualizaciones = [
    {
      key: "contenido",
      header: "Contenido",
      render: (item: Actualizacion) => (
        <span className="font-bold text-zinc-900">{item.contenido}</span>
      ),
    },
    {
      key: "seccion",
      header: "Sección",
      render: (item: Actualizacion) => item.seccion,
    },
    {
      key: "responsable",
      header: "Responsable",
      render: (item: Actualizacion) => item.responsable,
    },
    {
      key: "estado",
      header: "Estado",
      render: (item: Actualizacion) => (
        <StatusBadge
          status={item.estado}
          label={item.estado === "pendiente" ? "Programada" : undefined}
          mostrarPunto={false}
        />
      ),
    },
    {
      key: "fecha",
      header: "Actualización",
      render: (item: Actualizacion) => (
        <span className="whitespace-nowrap text-zinc-500">{item.fecha}</span>
      ),
    },
  ];

  const columnasPreinscripciones = [
    {
      key: "aspirante",
      header: "Aspirante",
      render: (item: Preinscripcion) => (
        <div>
          <p className="font-bold text-zinc-900">
            {obtenerNombreAspirante(item)}
          </p>
          <p className="mt-0.5 text-xs text-zinc-400">
            Solicitud #{item.id}
          </p>
        </div>
      ),
    },
    {
      key: "carrera",
      header: "Carrera",
      render: (item: Preinscripcion) => obtenerNombreCarrera(item),
    },
    {
      key: "fecha",
      header: "Fecha",
      render: (item: Preinscripcion) => (
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-zinc-500">
          <CalendarDays size={15} aria-hidden="true" />
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("es-AR")
            : "-"}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (item: Preinscripcion) => {
        const status = preinscripcionStatus(item.estado);

        return (
          <StatusBadge
            status={status}
            label={
              status === "activo"
                ? "Aprobada"
                : status === "rechazado"
                  ? "Rechazada"
                  : "Pendiente"
            }
            mostrarPunto={false}
          />
        );
      },
    },
    {
      key: "acciones",
      header: "Detalle",
      render: (item: Preinscripcion) => (
        <Button
          variant="secondary"
          aria-label={`Ver solicitud de ${obtenerNombreAspirante(item)}`}
          onClick={() => setSolicitud(item)}
        >
          Ver solicitud
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-6">
        <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#B78700]">
              Administración de contenidos
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Vista general
            </h1>
            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              Resumen del contenido institucional y acceso a los módulos del
              instituto.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => navigate("/dashboard/componentes")}
          >
            <PackageOpen /> Ver componentes
          </Button>
        </header>

        <section
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Indicadores generales"
        >
          {indicadores.map(
            ({ titulo, valor, detalle, icono: Icono, destacada }) => (
              <Card
                key={titulo}
                className={destacada ? "border-[#E4B600] bg-[#FFD21A]" : ""}
                interactiva
              >
                <div className="flex min-h-32 flex-col justify-between gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-600">{titulo}</p>
                      <p className="mt-2 text-3xl font-black text-zinc-950">
                        {valor}
                      </p>
                    </div>

                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                        destacada
                          ? "bg-[#171717] text-white"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      <Icono size={22} />
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600">{detalle}</p>
                </div>
              </Card>
            ),
          )}
        </section>

        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <Card
            titulo="Últimas actualizaciones"
            descripcion="Cambios recientes en la información del sitio."
            pie={
              <button
                type="button"
                className="text-sm font-bold text-[#8A6700] hover:underline"
              >
                Ver toda la actividad
              </button>
            }
          >
            <Table
              columns={columnasActualizaciones}
              data={actualizaciones}
              getRowKey={(item) => item.id}
              caption="Últimas actualizaciones"
              className="border-0 shadow-none"
            />
          </Card>

          <Card
            titulo="Tareas pendientes"
            descripcion="Para mantener el sitio actualizado."
          >
            <div className="space-y-1">
              {tareas.map((tarea) => (
                <button
                  key={tarea.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-zinc-50"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#FFF0AE] text-[#9A7400]">
                    <Check size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-zinc-900">
                      {tarea.titulo}
                    </span>
                    <span className="mt-1 block text-xs text-zinc-500">
                      {tarea.seccion}
                    </span>
                  </span>

                  <span className="whitespace-nowrap text-xs font-semibold text-zinc-400">
                    {tarea.fecha}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </section>

        <section aria-labelledby="preinscripciones-title">
          <Card
            titulo="Preinscripciones recientes"
            descripcion="Solicitudes de ingreso que requieren seguimiento."
            pie={
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Mostrando las últimas 4 solicitudes
                </span>

                <Button
                  variant="secondary"
                  onClick={() => navigate("/dashboard/preinscripciones")}
                >
                  <ClipboardCheck /> Ver preinscripciones
                </Button>
              </div>
            }
          >
            {preinscripcionesQuery.isLoading && (
              <LoadingSpinner text="Cargando preinscripciones..." />
            )}

            {preinscripcionesQuery.isError && (
              <ErrorState
                title="No pudimos cargar las preinscripciones"
                onRetry={() => void preinscripcionesQuery.refetch()}
              />
            )}

            {!preinscripcionesQuery.isLoading &&
              !preinscripcionesQuery.isError && (
                <Table
                  columns={columnasPreinscripciones}
                  data={(preinscripcionesQuery.data ?? []).slice(0, 4)}
                  getRowKey={(item) => item.id}
                  caption="Preinscripciones recientes"
                  className="border-0 shadow-none"
                  emptyMessage="No hay preinscripciones para mostrar."
                />
              )}
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card interactiva>
            <div className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600">
                <MessageSquareText size={20} />
              </span>
              <div>
                <p className="text-2xl font-black text-zinc-950">7</p>
                <p className="text-sm text-zinc-500">
                  Consultas sin responder
                </p>
              </div>
            </div>
          </Card>

          <Card interactiva>
            <div className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600">
                <ClipboardCheck size={20} />
              </span>
              <div>
                <p className="text-2xl font-black text-zinc-950">12</p>
                <p className="text-sm text-zinc-500">
                  Solicitudes por revisar
                </p>
              </div>
            </div>
          </Card>

          <Card interactiva className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600">
                <ClipboardList size={20} />
              </span>
              <div>
                <p className="text-2xl font-black text-zinc-950">4</p>
                <p className="text-sm text-zinc-500">Tareas pendientes</p>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <Modal
        abierto={solicitud !== null}
        cerrar={() => setSolicitud(null)}
        titulo={
          solicitud ? `Solicitud #${solicitud.id}` : "Detalle de solicitud"
        }
        descripcion="Información de la preinscripción"
        tamano="pequeno"
        pie={
          <Button variant="secondary" onClick={() => setSolicitud(null)}>
            Cerrar detalle
          </Button>
        }
      >
        {solicitud && (
          <dl className="grid gap-5 text-sm">
            {[
              ["Aspirante", obtenerNombreAspirante(solicitud)],
              ["Documento", solicitud.documento ?? "-"],
              ["Email", solicitud.email ?? "-"],
              ["Carrera", obtenerNombreCarrera(solicitud)],
              [
                "Fecha de inscripción",
                solicitud.createdAt
                  ? new Date(solicitud.createdAt).toLocaleDateString("es-AR")
                  : "-",
              ],
              [
                "Estado",
                preinscripcionStatus(solicitud.estado) === "activo"
                  ? "Aprobada"
                  : preinscripcionStatus(solicitud.estado) === "rechazado"
                    ? "Rechazada"
                    : "Pendiente",
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-zinc-500">{label}</dt>
                <dd className="mt-1 font-bold text-zinc-900">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>
    </AdminLayout>
  );
}
