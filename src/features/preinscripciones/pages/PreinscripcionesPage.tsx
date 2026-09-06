import { useMemo, useState } from "react";
import { CalendarDays, ClipboardCheck } from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Card from "../../../components/ui/card";
import Input from "../../../components/ui/input";
import Select from "../../../components/ui/select";
import StatusBadge from "../../../components/ui/statusBadge";
import Table from "../../../components/ui/table";

type EstadoPreinscripcion = "activo" | "pendiente" | "rechazado";

type Preinscripcion = {
  id: number;
  aspirante: string;
  email: string;
  carrera: string;
  fecha: string;
  estado: EstadoPreinscripcion;
};

const PREINSCRIPCIONES_INICIALES: Preinscripcion[] = [
  { id: 1042, aspirante: "Lucía Ferreyra", email: "lucia.ferreyra@email.com", carrera: "Desarrollo de Software", fecha: "04/09/2026", estado: "pendiente" },
  { id: 1041, aspirante: "Mateo Rodríguez", email: "mateo.rodriguez@email.com", carrera: "Enfermería", fecha: "03/09/2026", estado: "activo" },
  { id: 1040, aspirante: "Sofía Acosta", email: "sofia.acosta@email.com", carrera: "Administración", fecha: "02/09/2026", estado: "pendiente" },
  { id: 1039, aspirante: "Tomás Benítez", email: "tomas.benitez@email.com", carrera: "Desarrollo de Software", fecha: "01/09/2026", estado: "rechazado" },
];

const estadoOpciones = [
  { value: "pendiente", label: "Pendientes" },
  { value: "activo", label: "Aprobadas" },
  { value: "rechazado", label: "Rechazadas" },
];

export default function PreinscripcionesPage() {
  const [preinscripciones, setPreinscripciones] = useState(PREINSCRIPCIONES_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");

  const filtradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    return preinscripciones.filter((item) => {
      const coincideBusqueda = !termino || [item.aspirante, item.email, item.carrera].some((campo) => campo.toLowerCase().includes(termino));
      return coincideBusqueda && (!estado || item.estado === estado);
    });
  }, [busqueda, estado, preinscripciones]);

  function cambiarEstado(id: number, siguiente: EstadoPreinscripcion) {
    setPreinscripciones((actuales) => actuales.map((item) => item.id === id ? { ...item, estado: siguiente } : item));
  }

  const columnas = [
    { key: "aspirante", header: "Aspirante", render: (item: Preinscripcion) => <div><p className="font-bold text-zinc-900">{item.aspirante}</p><p className="text-xs text-zinc-500">{item.email}</p></div> },
    { key: "carrera", header: "Carrera", render: (item: Preinscripcion) => item.carrera },
    { key: "fecha", header: "Fecha", render: (item: Preinscripcion) => <span className="inline-flex items-center gap-2 whitespace-nowrap text-zinc-500"><CalendarDays size={15} />{item.fecha}</span> },
    { key: "estado", header: "Estado", render: (item: Preinscripcion) => <StatusBadge status={item.estado} label={item.estado === "activo" ? "Aprobada" : undefined} mostrarPunto={false} /> },
    { key: "accion", header: "Acción", cellClassName: "text-right", render: (item: Preinscripcion) => item.estado === "pendiente" ? <div className="flex justify-end gap-2"><button type="button" onClick={() => cambiarEstado(item.id, "activo")} className="text-sm font-bold text-emerald-700 hover:underline">Aprobar</button><button type="button" onClick={() => cambiarEstado(item.id, "rechazado")} className="text-sm font-bold text-red-700 hover:underline">Rechazar</button></div> : <span className="text-sm text-zinc-400">Sin acciones</span> },
  ];

  return <AdminLayout><main className="space-y-7 pb-6"><header><p className="flex items-center gap-2 text-sm font-bold text-[#B78700]"><ClipboardCheck size={17} /> Admisiones</p><h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">Preinscripciones</h1><p className="mt-2 text-sm text-zinc-500 sm:text-base">Revisá y actualizá las solicitudes de ingreso al instituto.</p></header><Card><div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]"><Input label="Buscar solicitud" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Nombre, correo o carrera" /><Select label="Filtrar por estado" value={estado} onChange={(event) => setEstado(event.target.value)} opciones={estadoOpciones} placeholder="Todos los estados" /></div></Card><Card titulo="Solicitudes recibidas" descripcion={`${filtradas.length} solicitudes encontradas`}><Table columns={columnas} data={filtradas} getRowKey={(item) => item.id} caption="Listado de preinscripciones" emptyMessage="No hay solicitudes que coincidan con los filtros." /></Card></main></AdminLayout>;
}
