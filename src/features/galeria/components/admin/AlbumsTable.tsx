import { Images, Pencil, RotateCcw, Trash2 } from "lucide-react";

import Button from "../../../../components/ui/button";
import EmptyState from "../../../../components/ui/emptyState";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import StatusBadge from "../../../../components/ui/statusBadge";
import Table from "../../../../components/ui/table";
import type { TableColumn } from "../../../../components/ui/table";
import type { Album } from "../../types/album.types";

interface Props {
  albums: Album[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onReintentar?: () => void;
  onEditar: (album: Album) => void;
  onEliminar: (album: Album) => void;
  onGestionarFotos: (album: Album) => void;
  onReactivar: (album: Album) => void;
  onCrear?: () => void;
}

export function AlbumsTable({
  albums,
  isLoading,
  isError,
  onReintentar,
  onEditar,
  onEliminar,
  onGestionarFotos,
  onReactivar,
  onCrear,
}: Props) {
  if (isLoading) {
    return <LoadingSpinner text="Cargando álbumes..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="No pudimos cargar los álbumes"
        description="Revisá tu conexión e intentá nuevamente."
        onRetry={onReintentar}
      />
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay álbumes"
        description="Creá un álbum para empezar a cargar fotografías."
        icon={<Images size={26} />}
        action={onCrear && <Button onClick={onCrear}>Nuevo álbum</Button>}
      />
    );
  }

  const columnas: TableColumn<Album>[] = [
    {
      key: "titulo",
      header: "Título",
      render: (album) => (
        <span className="font-semibold text-zinc-900">{album.titulo}</span>
      ),
    },
    {
      key: "fecha",
      header: "Fecha",
      render: (album) => new Date(album.fecha).toLocaleDateString("es-AR"),
    },
    {
      key: "fotos",
      header: "Fotos",
      render: (album) => album.cantidadImagenes,
    },
    {
      key: "estado",
      header: "Estado",
      render: (album) => (
        <StatusBadge status={album.activo ? "activo" : "inactivo"} />
      ),
    },
    {
      key: "acciones",
      header: "Acciones",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (album) => (
        <div className="flex justify-end gap-2">
          <Button
            className="h-9 px-3"
            onClick={() => onGestionarFotos(album)}
            aria-label={`Gestionar fotos de ${album.titulo}`}
          >
            <Images aria-hidden="true" />
            Fotos
          </Button>
          <Button
            variant="secondary"
            className="h-9 px-3"
            onClick={() => onEditar(album)}
            aria-label={`Editar ${album.titulo}`}
          >
            <Pencil aria-hidden="true" />
            Editar
          </Button>
          {album.activo ? (
            <Button
              variant="danger"
              className="h-9 px-3"
              onClick={() => onEliminar(album)}
              aria-label={`Eliminar ${album.titulo}`}
            >
              <Trash2 aria-hidden="true" />
              Eliminar
            </Button>
          ) : (
            <Button
              variant="correct"
              className="h-9 px-3"
              onClick={() => onReactivar(album)}
              aria-label={`Reactivar ${album.titulo}`}
            >
              <RotateCcw aria-hidden="true" />
              Reactivar
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columnas}
      data={albums}
      getRowKey={(album) => album.id}
      caption="Listado de álbumes de la galería"
    />
  );
}
