import { Newspaper, Pencil, Trash2 } from "lucide-react";

import Badge from "../../../../components/ui/badge";
import Button from "../../../../components/ui/button";
import EmptyState from "../../../../components/ui/emptyState";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import Table from "../../../../components/ui/table";
import type { TableColumn } from "../../../../components/ui/table";
import type { Publicacion } from "../../types/publicacion.types";

interface Props {
  publicaciones: Publicacion[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onReintentar?: () => void;
  onEditar: (publicacion: Publicacion) => void;
  onEliminar: (publicacion: Publicacion) => void;
  onCrear?: () => void;
}

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-AR");
}

export function PublicacionTable({
  publicaciones,
  isLoading,
  isError,
  onReintentar,
  onEditar,
  onEliminar,
  onCrear,
}: Props) {
  if (isLoading) {
    return <LoadingSpinner text="Cargando publicaciones..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="No pudimos cargar las publicaciones"
        description="Revisá tu conexión e intentá nuevamente."
        onRetry={onReintentar}
      />
    );
  }

  if (!publicaciones || publicaciones.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay publicaciones"
        description="Creá la primera noticia o evento para que aparezca en el sitio."
        icon={<Newspaper size={26} />}
        action={
          onCrear && <Button onClick={onCrear}>Nueva publicación</Button>
        }
      />
    );
  }

  const columnas: TableColumn<Publicacion>[] = [
    {
      key: "titulo",
      header: "Título",
      render: (publicacion) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900">
            {publicacion.titulo}
          </span>
          {publicacion.destacada && <Badge variant="warning">Destacada</Badge>}
        </div>
      ),
    },
    {
      key: "tipo",
      header: "Tipo",
      render: (publicacion) => (
        <Badge variant={publicacion.tipo === "EVENTO" ? "info" : "secondary"}>
          {publicacion.tipo === "EVENTO" ? "Evento" : "Noticia"}
        </Badge>
      ),
    },
    {
      key: "autor",
      header: "Autor",
      render: (publicacion) =>
        `${publicacion.autor.nombre} ${publicacion.autor.apellido}`,
    },
    {
      key: "fecha",
      header: "Fecha",
      render: (publicacion) =>
        publicacion.fechaEvento
          ? formatearFecha(publicacion.fechaEvento)
          : formatearFecha(publicacion.createdAt),
    },
    {
      key: "acciones",
      header: "Acciones",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (publicacion) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            className="h-9 px-3"
            onClick={() => onEditar(publicacion)}
            aria-label={`Editar ${publicacion.titulo}`}
          >
            <Pencil aria-hidden="true" />
            Editar
          </Button>
          <Button
            variant="danger"
            className="h-9 px-3"
            onClick={() => onEliminar(publicacion)}
            aria-label={`Eliminar ${publicacion.titulo}`}
          >
            <Trash2 aria-hidden="true" />
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columnas}
      data={publicaciones}
      getRowKey={(publicacion) => publicacion.id}
      caption="Listado de noticias y actividades"
    />
  );
}
