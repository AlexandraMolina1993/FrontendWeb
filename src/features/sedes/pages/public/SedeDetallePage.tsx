import { Link, useParams } from "react-router-dom";
import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import { useSede } from "../../hooks/useSede";
import SedeDetail from "../../components/SedeDetail";
export default function SedeDetallePage() { const { slug } = useParams(); const { sede, cargando, error } = useSede(slug ?? null); if (cargando) return <div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="mediano" text="Cargando sede..." /></div>; return <main className="mx-auto max-w-6xl space-y-6 px-5 py-8 sm:py-12"><Link to="/sedes" className="text-sm font-bold text-[#C49200]">← Volver a sedes</Link>{error || !sede ? <ErrorState title="No encontramos esta sede" description={error ?? "La sede solicitada no existe o no está disponible."} /> : <SedeDetail sede={sede} />}</main>; }