import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  Edit3,
  Eye,
  MoreVertical,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Badge from "../../../components/ui/badge";
import Button from "../../../components/ui/button";
import Card from "../../../components/ui/card";
import Checkbox from "../../../components/ui/checkbox";
import ConfirmDialog from "../../../components/ui/confirmDialog";
import DropdownMenu from "../../../components/ui/dropdownMenu";
import EmptyState from "../../../components/ui/emptyState";
import ErrorState from "../../../components/ui/errorState";
import Input from "../../../components/ui/input";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import Modal from "../../../components/ui/modal";
import Pagination from "../../../components/ui/pagination";
import SearchInput from "../../../components/ui/searchInput";
import Select from "../../../components/ui/select";
import StatusBadge from "../../../components/ui/statusBadge";
import Table from "../../../components/ui/table";
import Textarea from "../../../components/ui/textarea";

type UsuarioDemo = {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: "activo" | "inactivo" | "pendiente";
};

const usuarios: UsuarioDemo[] = [
  {
    id: 1,
    nombre: "Ana Martínez",
    correo: "ana.martinez@isvdr.edu.ar",
    rol: "Administradora",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Bruno López",
    correo: "bruno.lopez@isvdr.edu.ar",
    rol: "Editor",
    estado: "pendiente",
  },
  {
    id: 3,
    nombre: "Carla Gómez",
    correo: "carla.gomez@isvdr.edu.ar",
    rol: "Docente",
    estado: "inactivo",
  },
];

const roles = [
  { value: "admin", label: "Administrador" },
  { value: "editor", label: "Editor" },
  { value: "docente", label: "Docente" },
];

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-5">
    <h2 className="text-xl font-bold tracking-tight text-zinc-900">{title}</h2>
    <p className="mt-1 text-sm text-zinc-500">{description}</p>
  </div>
);

export default function Dashboard() {
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(2);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);

  const usuariosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase("es");
    if (!termino) return usuarios;

    return usuarios.filter((usuario) =>
      [usuario.nombre, usuario.correo, usuario.rol].some((valor) =>
        valor.toLocaleLowerCase("es").includes(termino),
      ),
    );
  }, [busqueda]);

  const columnas = [
    {
      key: "usuario",
      header: "Usuario",
      render: (usuario: UsuarioDemo) => (
        <div>
          <p className="font-semibold text-zinc-900">{usuario.nombre}</p>
          <p className="mt-0.5 text-xs text-zinc-500">{usuario.correo}</p>
        </div>
      ),
    },
    {
      key: "rol",
      header: "Rol",
      render: (usuario: UsuarioDemo) => (
        <Badge variant="secondary">{usuario.rol}</Badge>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (usuario: UsuarioDemo) => (
        <StatusBadge status={usuario.estado} />
      ),
    },
    {
      key: "acciones",
      header: <span className="sr-only">Acciones</span>,
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (usuario: UsuarioDemo) => (
        <DropdownMenu
          ariaLabel={`Acciones para ${usuario.nombre}`}
          trigger={<MoreVertical size={19} />}
          items={[
            { id: "ver", label: "Ver detalle", icon: <Eye />, onClick: () => setModalAbierto(true) },
            { id: "editar", label: "Editar", icon: <Edit3 />, onClick: () => setModalAbierto(true) },
            {
              id: "eliminar",
              label: "Eliminar",
              icon: <Trash2 />,
              danger: true,
              separatorBefore: true,
              onClick: () => setConfirmacionAbierta(true),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-10 pb-8">
        <header className="overflow-hidden rounded-3xl bg-[#171717] text-white shadow-xl">
          <div className="h-1.5 bg-[#FFD21A]" />
          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Badge variant="primary" mostrarPunto>
                Sistema de diseño
              </Badge>
              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Dashboard de componentes
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Una vista general e interactiva de los componentes reutilizables del panel administrativo.
              </p>
            </div>
            <Button onClick={() => setModalAbierto(true)}>
              <Plus /> Nuevo registro
            </Button>
          </div>
        </header>

        <section aria-labelledby="resumen-title">
          <SectionTitle
            title="Resumen"
            description="Cards, badges y estados aplicados a indicadores del sistema."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card titulo="Usuarios" descripcion="Registrados en el sistema" destacada>
              <div className="flex items-end justify-between gap-4">
                <strong className="text-4xl font-black text-zinc-900">248</strong>
                <span className="rounded-2xl bg-amber-100 p-3 text-amber-800"><Users /></span>
              </div>
            </Card>
            <Card titulo="Carreras" descripcion="Oferta académica activa" interactiva>
              <div className="flex items-end justify-between gap-4">
                <strong className="text-4xl font-black text-zinc-900">12</strong>
                <span className="rounded-2xl bg-zinc-100 p-3 text-zinc-700"><BookOpen /></span>
              </div>
            </Card>
            <Card titulo="Publicaciones" descripcion="Contenidos publicados">
              <div className="flex items-center justify-between gap-4">
                <strong className="text-4xl font-black text-zinc-900">36</strong>
                <StatusBadge status="publicado" />
              </div>
            </Card>
            <Card
              titulo="Revisión"
              descripcion="Elementos pendientes"
              pie={<span className="text-sm font-medium text-zinc-600">Actualizado hace 5 minutos</span>}
            >
              <div className="flex items-center justify-between gap-4">
                <strong className="text-4xl font-black text-zinc-900">7</strong>
                <StatusBadge status="pendiente" />
              </div>
            </Card>
          </div>
        </section>

        <section aria-labelledby="acciones-title">
          <SectionTitle
            title="Acciones y etiquetas"
            description="Variantes de botones, badges generales y estados de publicación."
          />
          <Card>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary"><Plus /> Primario</Button>
                <Button variant="secondary"><Edit3 /> Secundario</Button>
                <Button variant="correct"><Check /> Correcto</Button>
                <Button variant="danger" onClick={() => setConfirmacionAbierta(true)}><Trash2 /> Peligro</Button>
                <Button disabled>Deshabilitado</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["primary", "secondary", "dark", "success", "warning", "danger", "info"] as const).map((variant) => (
                  <Badge key={variant} variant={variant} mostrarPunto>{variant}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {(["activo", "inactivo", "pendiente", "borrador", "publicado", "rechazado"] as const).map((status) => (
                  <StatusBadge key={status} status={status} />
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section aria-labelledby="formulario-title">
          <SectionTitle
            title="Campos de formulario"
            description="Entradas, selección, texto largo, búsqueda y checkbox en distintos estados."
          />
          <Card titulo="Nuevo usuario" descripcion="Completá los datos para previsualizar el formulario." destacada>
            <div className="grid gap-5 md:grid-cols-2">
              <Input label="Nombre completo" placeholder="Ej. María González" required ayuda="Ingresá nombre y apellido." />
              <Input label="Correo institucional" value="correo-invalido" readOnly error="Ingresá un correo válido." />
              <Select label="Rol" required opciones={roles} defaultValue="editor" ayuda="Define los permisos del usuario." />
              <Input label="Legajo" value="ISVDR-0248" disabled readOnly />
              <div className="md:col-span-2">
                <Textarea label="Observaciones" placeholder="Agregá información relevante..." rows={4} ayuda="Máximo 500 caracteres." />
              </div>
              <Checkbox label="Usuario activo" descripcion="Podrá ingresar al panel inmediatamente." defaultChecked />
              <Checkbox label="Acepto los términos" error="Este campo es obligatorio." />
            </div>
          </Card>
        </section>

        <section aria-labelledby="tabla-title">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              title="Tabla y navegación"
              description="Búsqueda, tabla, menú contextual y paginación funcionando juntos."
            />
            <div className="w-full lg:max-w-sm">
              <SearchInput
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                onClear={() => setBusqueda("")}
                placeholder="Buscar usuarios..."
              />
            </div>
          </div>
          <div className="space-y-4">
            <Table
              columns={columnas}
              data={usuariosFiltrados}
              getRowKey={(usuario) => usuario.id}
              caption="Usuarios de demostración"
              emptyMessage="No encontramos usuarios para esa búsqueda."
            />
            <Pagination
              currentPage={pagina}
              totalPages={8}
              totalItems={76}
              pageSize={10}
              onPageChange={setPagina}
            />
          </div>
        </section>

        <section aria-labelledby="feedback-title">
          <SectionTitle
            title="Estados y feedback"
            description="Indicadores para carga, resultados vacíos y errores recuperables."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <Card titulo="Cargando">
              <div className="grid min-h-48 place-items-center">
                <div className="flex gap-8">
                  <LoadingSpinner size="pequeno" />
                  <LoadingSpinner size="mediano" text="Cargando datos..." />
                </div>
              </div>
            </Card>
            <Card contenidoClassName="h-full">
              <EmptyState
                title="Todavía no hay publicaciones"
                description="Creá la primera publicación para verla en este espacio."
                action={<Button onClick={() => setModalAbierto(true)}><Plus /> Crear publicación</Button>}
              />
            </Card>
            <Card contenidoClassName="h-full">
              <ErrorState
                title="No pudimos cargar los datos"
                description="Revisá tu conexión e intentá nuevamente."
                onRetry={() => undefined}
              />
            </Card>
          </div>
        </section>
      </div>

      <Modal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        titulo="Nuevo registro"
        descripcion="Ejemplo del componente modal con encabezado, contenido y acciones."
        icono={<Plus size={21} />}
        pie={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalAbierto(false)}>Cancelar</Button>
            <Button onClick={() => setModalAbierto(false)}>Guardar registro</Button>
          </div>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Título" placeholder="Ingresá un título" required />
          <Select label="Estado" opciones={[{ value: "draft", label: "Borrador" }, { value: "published", label: "Publicado" }]} />
          <div className="sm:col-span-2">
            <Textarea label="Descripción" rows={5} placeholder="Escribí una descripción..." />
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        abierto={confirmacionAbierta}
        cancelar={() => setConfirmacionAbierta(false)}
        confirmar={() => setConfirmacionAbierta(false)}
        titulo="¿Eliminar este registro?"
        descripcion="Esta acción es solo una demostración y no eliminará información real."
        textoConfirmar="Sí, eliminar"
        peligro
      />
    </AdminLayout>
  );
}
