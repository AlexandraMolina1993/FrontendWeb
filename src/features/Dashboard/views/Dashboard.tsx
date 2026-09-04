import { useEffect } from "react";
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
  MoreHorizontal,
} from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Button from "../../../components/ui/button";
import Card from "../../../components/ui/card";
import DropdownMenu from "../../../components/ui/dropdownMenu";
import StatusBadge from "../../../components/ui/statusBadge";
import Table from "../../../components/ui/table";

type Actualizacion = {
  id: number;
  contenido: string;
  seccion: string;
  responsable: string;
  estado: "publicado" | "borrador" | "pendiente";
  fecha: string;
};

type Preinscripcion = {
  id: number;
  aspirante: string;
  carrera: string;
  fecha: string;
  estado: "activo" | "pendiente" | "rechazado";
};

const actualizaciones: Actualizacion[] = [
  { id: 1, contenido: "Desarrollo de Software", seccion: "Carreras", responsable: "Administración", estado: "publicado", fecha: "Hoy, 09:40" },
  { id: 2, contenido: "Historia y misión institucional", seccion: "Información institucional", responsable: "Secretaría", estado: "publicado", fecha: "Ayer, 16:25" },
  { id: 3, contenido: "Jornada de orientación vocacional", seccion: "Noticias y actividades", responsable: "Comunicación", estado: "pendiente", fecha: "Ayer, 12:10" },
  { id: 4, contenido: "Feria de carreras 2026", seccion: "Galería", responsable: "Comunicación", estado: "publicado", fecha: "29 ago, 18:05" },
  { id: 5, contenido: "Gestión Ambiental", seccion: "Carreras", responsable: "Coordinación", estado: "borrador", fecha: "28 ago, 10:22" },
];

const preinscripciones: Preinscripcion[] = [
  { id: 1042, aspirante: "Lucía Ferreyra", carrera: "Desarrollo de Software", fecha: "04/09/2026", estado: "pendiente" },
  { id: 1041, aspirante: "Mateo Rodríguez", carrera: "Enfermería", fecha: "03/09/2026", estado: "activo" },
  { id: 1040, aspirante: "Sofía Acosta", carrera: "Administración", fecha: "02/09/2026", estado: "pendiente" },
  { id: 1039, aspirante: "Tomás Benítez", carrera: "Desarrollo de Software", fecha: "01/09/2026", estado: "rechazado" },
];

const tareas = [
  { id: 1, titulo: "Completar el plan de Gestión Ambiental", seccion: "Carreras", fecha: "Hoy" },
  { id: 2, titulo: "Seleccionar portada del acto académico", seccion: "Galería", fecha: "05 sep" },
  { id: 3, titulo: "Revisar la jornada vocacional", seccion: "Noticias y actividades", fecha: "06 sep" },
  { id: 4, titulo: "Revisar preinscripciones pendientes", seccion: "Preinscripciones", fecha: "Hoy" },
];

const indicadores = [
  { titulo: "Carreras publicadas", valor: "12", detalle: "Una carrera requiere revisión", icono: BookOpen },
  { titulo: "Publicaciones activas", valor: "8", detalle: "3 actividades programadas", icono: FileText },
  { titulo: "Fotos en galería", valor: "54", detalle: "3 álbumes publicados", icono: Image },
  { titulo: "Preinscripciones nuevas", valor: "43", detalle: "12 esperan revisión", icono: ClipboardList, destacada: true },
];

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.endsWith("/preinscripciones")) {
      requestAnimationFrame(() => {
        document.getElementById("preinscripciones")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.pathname]);

  const columnasActualizaciones = [
    { key: "contenido", header: "Contenido", render: (item: Actualizacion) => <span className="font-bold text-zinc-900">{item.contenido}</span> },
    { key: "seccion", header: "Sección", render: (item: Actualizacion) => item.seccion },
    { key: "responsable", header: "Responsable", render: (item: Actualizacion) => item.responsable },
    { key: "estado", header: "Estado", render: (item: Actualizacion) => <StatusBadge status={item.estado} label={item.estado === "pendiente" ? "Programada" : undefined} mostrarPunto={false} /> },
    { key: "fecha", header: "Actualización", render: (item: Actualizacion) => <span className="whitespace-nowrap text-zinc-500">{item.fecha}</span> },
  ];

  const columnasPreinscripciones = [
    {
      key: "aspirante",
      header: "Aspirante",
      render: (item: Preinscripcion) => (
        <div>
          <p className="font-bold text-zinc-900">{item.aspirante}</p>
          <p className="mt-0.5 text-xs text-zinc-400">Solicitud #{item.id}</p>
        </div>
      ),
    },
    { key: "carrera", header: "Carrera", render: (item: Preinscripcion) => item.carrera },
    {
      key: "fecha",
      header: "Fecha",
      render: (item: Preinscripcion) => (
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-zinc-500"><CalendarDays size={15} />{item.fecha}</span>
      ),
    },
    { key: "estado", header: "Estado", render: (item: Preinscripcion) => <StatusBadge status={item.estado} label={item.estado === "activo" ? "Aprobada" : undefined} mostrarPunto={false} /> },
    {
      key: "acciones",
      header: <span className="sr-only">Acciones</span>,
      cellClassName: "text-right",
      render: (item: Preinscripcion) => (
        <DropdownMenu
          ariaLabel={`Acciones para ${item.aspirante}`}
          trigger={<MoreHorizontal size={20} />}
          items={[
            { id: "ver", label: "Ver solicitud", onClick: () => undefined },
            { id: "aprobar", label: "Marcar como aprobada", disabled: item.estado === "activo", onClick: () => undefined },
          ]}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-7 pb-6">
        <header className="pt-2">
          <p className="text-sm font-bold text-[#B78700]">Administración de contenidos</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">Vista general</h1>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">Resumen del contenido institucional y tareas pendientes.</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores generales">
          {indicadores.map(({ titulo, valor, detalle, icono: Icono, destacada }) => (
            <Card key={titulo} className={destacada ? "border-[#E4B600] bg-[#FFD21A]" : ""} interactiva>
              <div className="flex min-h-32 flex-col justify-between gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-600">{titulo}</p>
                    <p className="mt-2 text-3xl font-black text-zinc-950">{valor}</p>
                  </div>
                  <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${destacada ? "bg-[#171717] text-white" : "bg-zinc-100 text-zinc-600"}`}>
                    <Icono size={22} />
                  </span>
                </div>
                <p className="text-xs text-zinc-600">{detalle}</p>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <Card titulo="Últimas actualizaciones" descripcion="Cambios recientes en la información del sitio." pie={<button className="text-sm font-bold text-[#8A6700] hover:underline">Ver toda la actividad</button>}>
            <Table columns={columnasActualizaciones} data={actualizaciones} getRowKey={(item) => item.id} caption="Últimas actualizaciones" className="border-0 shadow-none" />
          </Card>

          <Card titulo="Tareas pendientes" descripcion="Para mantener el sitio actualizado.">
            <div className="space-y-1">
              {tareas.map((tarea) => (
                <button key={tarea.id} type="button" className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-zinc-50">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#FFF0AE] text-[#9A7400]"><Check size={18} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-zinc-900">{tarea.titulo}</span>
                    <span className="mt-1 block text-xs text-zinc-500">{tarea.seccion}</span>
                  </span>
                  <span className="whitespace-nowrap text-xs font-semibold text-zinc-400">{tarea.fecha}</span>
                </button>
              ))}
            </div>
          </Card>
        </section>

        <section id="preinscripciones" className="scroll-mt-24" aria-labelledby="preinscripciones-title">
          <Card
            titulo="Preinscripciones recientes"
            descripcion="Solicitudes de ingreso que requieren seguimiento."
            pie={
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">Mostrando las últimas 4 solicitudes</span>
                <Button variant="secondary" onClick={() => navigate("/admin/preinscripciones")}><ClipboardCheck /> Ver preinscripciones</Button>
              </div>
            }
          >
            <Table columns={columnasPreinscripciones} data={preinscripciones} getRowKey={(item) => item.id} caption="Preinscripciones recientes" className="border-0 shadow-none" />
          </Card>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card interactiva><div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600"><MessageSquareText size={20} /></span><div><p className="text-2xl font-black text-zinc-950">7</p><p className="text-sm text-zinc-500">Consultas sin responder</p></div></div></Card>
          <Card interactiva><div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600"><ClipboardCheck size={20} /></span><div><p className="text-2xl font-black text-zinc-950">12</p><p className="text-sm text-zinc-500">Solicitudes por revisar</p></div></div></Card>
          <Card interactiva className="sm:col-span-2 lg:col-span-1"><div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600"><ClipboardList size={20} /></span><div><p className="text-2xl font-black text-zinc-950">4</p><p className="text-sm text-zinc-500">Tareas pendientes</p></div></div></Card>
        </section>
      </div>
    </AdminLayout>
  );
}
