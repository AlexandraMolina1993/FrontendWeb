import {
  CalendarDays,
  ClipboardList,
  Eye,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import ErrorState from "../../../components/ui/errorState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import Modal from "../../../components/ui/modal";
import Table from "../../../components/ui/table";
import {
  obtenerPreinscripciones,
  type Preinscripcion,
} from "../services/preinscripcion.api";

function formatDate(value?: string) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("es-AR");
}

function getCarrera(preinscripcion: Preinscripcion) {
  if (typeof preinscripcion.carrera === "string") return preinscripcion.carrera;
  return preinscripcion.carrera?.nombre ?? preinscripcion.carreraId;
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="border-b border-zinc-200 pb-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-semibold text-zinc-900">
        {value || "Sin información"}
      </dd>
    </div>
  );
}

export default function PreinscripcionesTable() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Preinscripcion | null>(null);
  const preinscripcionesQuery = useQuery({
    queryKey: ["preinscripciones"],
    queryFn: obtenerPreinscripciones,
  });
  const unauthorized =
    (preinscripcionesQuery.error as AxiosError | null)?.response?.status ===
    401;

  return (
    <>
          {preinscripcionesQuery.isLoading && (
            <LoadingSpinner text="Cargando preinscripciones..." />
          )}
          {preinscripcionesQuery.isError && (
            <ErrorState
              title={
                unauthorized
                  ? "Tu sesión venció"
                  : "No pudimos cargar las preinscripciones"
              }
              description={
                unauthorized
                  ? "Iniciá sesión para consultar las preinscripciones."
                  : undefined
              }
              onRetry={() =>
                unauthorized
                  ? navigate("/")
                  : void preinscripcionesQuery.refetch()
              }
              retryLabel={
                unauthorized ? "Ir al inicio de sesión" : "Reintentar"
              }
            />
          )}
          {preinscripcionesQuery.isSuccess && (
            <Table
              caption="Listado de preinscripciones"
              data={preinscripcionesQuery.data}
              getRowKey={(item) => item.id}
              emptyMessage="Todavía no hay preinscripciones registradas."
              columns={[
                {
                  key: "aspirante",
                  header: "Aspirante",
                  render: (item) => (
                    <span className="font-bold text-zinc-900">
                      {item.nombre} {item.apellido}
                    </span>
                  ),
                },
                {
                  key: "documento",
                  header: "Documento",
                  render: (item) => item.documento,
                },
                { key: "carrera", header: "Carrera", render: getCarrera },
                {
                  key: "contacto",
                  header: "Contacto",
                  render: (item) => (
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      <Mail size={15} />
                      {item.email}
                    </span>
                  ),
                },
                {
                  key: "fecha",
                  header: "Registro",
                  render: (item) => (
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-zinc-500">
                      <CalendarDays size={15} />
                      {formatDate(item.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "estado",
                  header: "Estado",
                  render: (item) => item.estado ?? "Pendiente",
                },
                {
                  key: "detalles",
                  header: <span className="sr-only">Detalles</span>,
                  cellClassName: "text-right",
                  render: (item) => (
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="inline-flex items-center gap-2 font-bold text-[#8B6800] hover:text-[#5F4900]"
                      aria-label={`Ver detalles de ${item.nombre} ${item.apellido}`}
                    >
                      <Eye size={17} />
                      <span className="hidden sm:inline">Ver detalles</span>
                    </button>
                  ),
                },
              ]}
            />
          )}
          {preinscripcionesQuery.isSuccess && (
            <button
              type="button"
              onClick={() => void preinscripcionesQuery.refetch()}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-zinc-700 hover:text-[#B78700]"
            >
              <RefreshCw size={16} /> Actualizar listado
            </button>
          )}
        <Modal
          abierto={selected !== null}
          cerrar={() => setSelected(null)}
          titulo="Detalle de preinscripción"
          descripcion={
            selected ? `${selected.nombre} ${selected.apellido}` : undefined
          }
          icono={<ClipboardList size={20} />}
          pie={
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="border border-zinc-300 px-4 py-2 text-sm font-bold text-zinc-700 hover:bg-zinc-100"
            >
              Cerrar
            </button>
          }
        >
          {selected && (
            <dl className="grid gap-4 bg-white p-5 sm:grid-cols-2">
              <Detail label="Nombre" value={selected.nombre} />
              <Detail label="Apellido" value={selected.apellido} />
              <Detail label="Documento" value={selected.documento} />
              <Detail
                label="Fecha de nacimiento"
                value={selected.fechaNacimiento}
              />
              <Detail label="Nacionalidad" value={selected.nacionalidad} />
              <Detail label="Carrera" value={getCarrera(selected)} />
              <Detail label="Correo electrónico" value={selected.email} />
              <Detail label="Teléfono" value={selected.telefono} />
              <Detail label="Dirección" value={selected.direccion} />
              <Detail label="Localidad" value={selected.localidad} />
              <Detail label="Provincia" value={selected.provincia} />
              <Detail label="Estado" value={selected.estado ?? "Pendiente"} />
              <Detail
                label="Fecha de registro"
                value={formatDate(selected.createdAt)}
              />
              <Detail label="Identificador" value={selected.id} />
            </dl>
          )}
        </Modal>
    </>
  );
}
