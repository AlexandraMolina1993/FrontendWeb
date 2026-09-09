import { MapPinned } from "lucide-react";
import EmptyState from "../../../components/ui/emptyState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import type { Sede } from "../schemas/sede.schema";
import SedeAdminCard from "./SedeAdminCard";
import SedeCard from "./SedeCard";

interface SedesGridProps {
  sedes: Sede[];
  cargando?: boolean;
  variante?: "publica" | "admin";
  destino?: "sede" | "institucional";
  onEdit?: (sede: Sede) => void;
  onDelete?: (sede: Sede) => void;
}

export default function SedesGrid({
  sedes,
  cargando = false,
  variante = "publica",
  destino = "sede",
  onEdit,
  onDelete,
}: SedesGridProps) {
  if (cargando) return <div className="flex min-h-64 items-center justify-center"><LoadingSpinner size="mediano" text="Cargando sedes..." /></div>;
  if (!sedes.length) return <EmptyState title="No hay sedes publicadas" description="Las sedes aparecerán aquí cuando estén disponibles." icon={<MapPinned size={26} />} />;
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Listado de sedes">
      {sedes.map((sede) => (
        <div key={sede.id} role="listitem">
          {variante === "admin" && onEdit && onDelete ? (
            <SedeAdminCard sede={sede} onEdit={onEdit} onDelete={onDelete} />
          ) : (
            <SedeCard sede={sede} destino={destino} />
          )}
        </div>
      ))}
    </div>
  );
}