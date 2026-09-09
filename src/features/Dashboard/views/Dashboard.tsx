import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Users,
  Newspaper,
  Image,
  Building2,
} from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Button from "../../../components/ui/button";
import Card from "../../../components/ui/card";
import EmptyState from "../../../components/ui/emptyState";
import Modal from "../../../components/ui/modal";
import StatusBadge from "../../../components/ui/statusBadge";
import Table from "../../../components/ui/table";
import ComponentLibrary from "./ComponentLibrary";

import { preinscripciones } from "../data/dashboard.data";
import type { Preinscripcion } from "../data/dashboard.data";

export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const esBiblioteca = pathname.endsWith("/componentes");
  const esSolicitudes = pathname.endsWith("/preinscripciones");

  const [solicitud, setSolicitud] = useState<Preinscripcion | null>(null);

  const columnasSolicitudes = [
    {
      key: "aspirante",
      header: "Aspirante",
      render: (item: Preinscripcion) => (
        <div>
          <p className="font-bold text-zinc-900">{item.aspirante}</p>
          <p className="mt-1 text-xs text-zinc-500">Solicitud #{item.id}</p>
        </div>
      ),
    },
    {
      key: "carrera",
      header: "Carrera",
      render: (item: Preinscripcion) => item.carrera,
    },
    {
      key: "fecha",
      header: "Fecha",
      render: (item: Preinscripcion) => (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <CalendarDays size={15} aria-hidden="true" />
          {item.fecha}
        </span>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (item: Preinscripcion) => (
        <StatusBadge
          status={item.estado}
          label={
            item.estado === "activo"
              ? "Aprobada"
              : item.estado === "rechazado"
                ? "Rechazada"
                : "Pendiente"
          }
          mostrarPunto={false}
        />
      ),
    },
    {
      key: "acciones",
      header: "Detalle",
      render: (item: Preinscripcion) => (
        <Button
          variant="secondary"
          aria-label={`Ver solicitud de ${item.aspirante}`}
          onClick={() => setSolicitud(item)}
        >
          Ver solicitud
        </Button>
      ),
    },
  ];

  const panelPreinscripciones = (
    <section className="min-w-0" aria-label="Preinscripciones recientes">
      <Card
        titulo="Preinscripciones recientes"
        descripcion="Consulta de solicitudes incluidas en el resumen del dashboard."
        pie={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-zinc-500" role="status">
              {preinscripciones.length} solicitudes
            </span>

            {!esSolicitudes && (
              <Button
                variant="secondary"
                onClick={() => navigate("/dashboard/preinscripciones")}
              >
                <ClipboardList />
                Ampliar resumen
              </Button>
            )}
          </div>
        }
      >
        {preinscripciones.length ? (
          <Table
            columns={columnasSolicitudes}
            data={preinscripciones}
            getRowKey={(item) => item.id}
            caption="Preinscripciones recientes"
            className="border-0 shadow-none"
          />
        ) : (
          <EmptyState
            title="No hay preinscripciones"
            description="Las solicitudes recibidas aparecerán aquí."
          />
        )}
      </Card>
    </section>
  );

  return (
    <AdminLayout>
      <div className="space-y-6 pb-6">
        <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#8A6700]">
              Administración de contenidos
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              {esBiblioteca
                ? "Componentes UI"
                : esSolicitudes
                  ? "Resumen de preinscripciones"
                  : "Vista general"}
            </h1>

            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              {esBiblioteca
                ? "Biblioteca de componentes reutilizables."
                : "Consultá las preinscripciones y accedé a los módulos del instituto."}
            </p>
          </div>
        </header>

        {!esBiblioteca && (
          <nav aria-label="Accesos rápidos" className="space-y-3">
            <h2 className="text-sm font-bold text-zinc-700">Accesos rápidos</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  titulo: "Carreras",
                  ruta: "/admin/carreras",
                  icono: GraduationCap,
                },
                {
                  titulo: "Sede",
                  ruta: "/admin/sedes",
                  icono: Building2,
                },
                {
                  titulo: "Noticias",
                  ruta: "/admin/noticias",
                  icono: Newspaper,
                },
                {
                  titulo: "Galería",
                  ruta: "/admin/galeria",
                  icono: Image,
                },
              ].map(({ titulo, ruta, icono: Icono }) => (
                <Link
                  key={ruta}
                  to={ruta}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-800 shadow-sm transition hover:border-[#E4B600] hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  <Icono
                    size={20}
                    className="shrink-0 text-[#8A6700]"
                    aria-hidden="true"
                  />
                  {titulo}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {esBiblioteca ? <ComponentLibrary /> : panelPreinscripciones}
      </div>

      <Modal
        abierto={solicitud !== null}
        cerrar={() => setSolicitud(null)}
        titulo={
          solicitud ? `Solicitud #${solicitud.id}` : "Detalle de solicitud"
        }
        descripcion="Información de ejemplo · Solo consulta"
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
              ["Aspirante", solicitud.aspirante],
              ["Carrera", solicitud.carrera],
              ["Fecha de inscripción", solicitud.fecha],
              [
                "Estado",
                solicitud.estado === "activo"
                  ? "Aprobada"
                  : solicitud.estado === "rechazado"
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
