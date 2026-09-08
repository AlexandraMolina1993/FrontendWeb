import { useState } from "react";

import {
  Check,
  MoreHorizontal,
  PackageOpen,
  Plus,
  Trash2,
} from "lucide-react";

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
import Textarea from "../../../components/ui/textarea";

export default function ComponentLibrary() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
  const [busquedaDemo, setBusquedaDemo] = useState("componentes");
  const [paginaDemo, setPaginaDemo] = useState(3);
  return (<>
        <section id="componentes" className="scroll-mt-24 space-y-5 pt-4" aria-labelledby="componentes-title">
          <div className="border-t border-zinc-200 pt-8">
            <p className="text-sm font-bold text-[#B78700]">Sistema de diseño</p>
            <h2 id="componentes-title" className="mt-1 text-2xl font-black text-zinc-950 sm:text-3xl">Biblioteca de componentes</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-500">Ejemplos interactivos de todos los componentes reutilizables disponibles para construir nuevas pantallas.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card titulo="Botones" descripcion="Acciones principales, secundarias y estados especiales.">
              <div className="flex flex-wrap gap-3">
                <Button><Plus /> Primario</Button>
                <Button variant="secondary">Secundario</Button>
                <Button variant="correct"><Check /> Correcto</Button>
                <Button variant="danger" onClick={() => setConfirmacionAbierta(true)}><Trash2 /> Peligro</Button>
                <Button disabled>Deshabilitado</Button>
              </div>
            </Card>

            <Card titulo="Badges y estados" descripcion="Etiquetas informativas y estados de registros.">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(["primary", "secondary", "dark", "success", "warning", "danger", "info"] as const).map((variant) => <Badge key={variant} variant={variant} mostrarPunto>{variant}</Badge>)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["activo", "inactivo", "pendiente", "borrador", "publicado", "rechazado"] as const).map((status) => <StatusBadge key={status} status={status} />)}
                </div>
              </div>
            </Card>

            <Card titulo="Campos de texto" descripcion="Variantes normal, ayuda, error y deshabilitado.">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Nombre completo" placeholder="Ej. Ana Martínez" required ayuda="Ingresá nombre y apellido." />
                <Input label="Correo electrónico" value="correo-invalido" readOnly error="El correo no es válido." />
                <Select label="Rol" opciones={[{ value: "admin", label: "Administrador" }, { value: "editor", label: "Editor" }, { value: "docente", label: "Docente" }]} defaultValue="editor" />
                <Input label="Legajo" value="ISVDR-1042" readOnly disabled />
                <div className="sm:col-span-2"><Textarea label="Observaciones" placeholder="Escribí una observación..." rows={4} ayuda="Máximo 500 caracteres." /></div>
              </div>
            </Card>

            <Card titulo="Búsqueda y selección" descripcion="Controles para filtrar y elegir opciones.">
              <div className="space-y-5">
                <SearchInput value={busquedaDemo} onChange={(event) => setBusquedaDemo(event.target.value)} onClear={() => setBusquedaDemo("")} placeholder="Buscar componentes..." />
                <Checkbox label="Mostrar elementos inactivos" descripcion="Incluye registros archivados en los resultados." defaultChecked />
                <Checkbox label="Confirmar condiciones" error="Este campo es obligatorio." />
              </div>
            </Card>

            <Card titulo="Carga y paginación" descripcion="Feedback durante procesos y navegación entre páginas.">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-8">
                  <LoadingSpinner size="pequeno" />
                  <LoadingSpinner size="mediano" text="Cargando datos..." />
                  <LoadingSpinner size="grande" />
                </div>
                <Pagination currentPage={paginaDemo} totalPages={8} totalItems={76} pageSize={10} onPageChange={setPaginaDemo} />
              </div>
            </Card>

            <Card titulo="Menú y ventanas" descripcion="Acciones contextuales, modal y confirmación.">
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => setModalAbierto(true)}>Abrir modal</Button>
                <Button variant="danger" onClick={() => setConfirmacionAbierta(true)}>Abrir confirmación</Button>
                <DropdownMenu
                  trigger={<MoreHorizontal size={20} />}
                  items={[
                    { id: "ver-demo", label: "Ver detalle", onClick: () => setModalAbierto(true) },
                    { id: "editar-demo", label: "Editar", onClick: () => setModalAbierto(true) },
                    { id: "eliminar-demo", label: "Eliminar", danger: true, separatorBefore: true, onClick: () => setConfirmacionAbierta(true) },
                  ]}
                />
              </div>
            </Card>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            <Card><EmptyState title="No hay registros" description="Creá el primer registro para verlo en esta sección." action={<Button onClick={() => setModalAbierto(true)}><Plus /> Crear registro</Button>} /></Card>
            <Card><ErrorState title="No pudimos cargar los datos" description="Revisá tu conexión e intentá nuevamente." onRetry={() => undefined} /></Card>
            <Card titulo="Card reutilizable" descripcion="Admite título, descripción, contenido y pie." destacada interactiva pie={<span className="text-sm text-zinc-500">Contenido del pie de la tarjeta</span>}>
              <p className="text-sm leading-6 text-zinc-600">Este componente sirve como contenedor para indicadores, formularios, tablas y estados.</p>
            </Card>
          </div>
        </section><Modal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        titulo="Modal de ejemplo"
        descripcion="Componente reutilizable con contenido y acciones."
        icono={<PackageOpen size={20} />}
        pie={<div className="flex justify-end gap-3"><Button variant="secondary" onClick={() => setModalAbierto(false)}>Cancelar</Button><Button onClick={() => setModalAbierto(false)}>Guardar</Button></div>}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Título" placeholder="Ingresá un título" required />
          <Select label="Estado" opciones={[{ value: "draft", label: "Borrador" }, { value: "published", label: "Publicado" }]} />
          <div className="sm:col-span-2"><Textarea label="Descripción" rows={4} placeholder="Escribí una descripción..." /></div>
        </div>
      </Modal>

      <ConfirmDialog
        abierto={confirmacionAbierta}
        cancelar={() => setConfirmacionAbierta(false)}
        confirmar={() => setConfirmacionAbierta(false)}
        titulo="¿Confirmar esta acción?"
        descripcion="Este diálogo permite confirmar acciones sensibles antes de ejecutarlas."
        textoConfirmar="Sí, confirmar"
        peligro
      />
  </>);
}
