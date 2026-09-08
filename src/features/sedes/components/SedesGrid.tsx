import { MapPinned } from "lucide-react";
import EmptyState from "../../../components/ui/emptyState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import type { Sede } from "../schemas/sede.schema";
import SedeCard from "./SedeCard";
export default function SedesGrid({ sedes, cargando = false }: { sedes: Sede[]; cargando?: boolean }) {
  if (cargando) return <div className="flex min-h-64 items-center justify-center"><LoadingSpinner size="mediano" text="Cargando sedes..." /></div>;
  if (!sedes.length) return <EmptyState title="No hay sedes publicadas" description="Las sedes aparecerán aquí cuando estén disponibles." icon={<MapPinned size={26} />} />;
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{sedes.filter((sede) => sede.activa).map((sede) => <SedeCard key={sede.id} sede={sede} />)}</div>;
}