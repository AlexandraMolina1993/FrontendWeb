import ErrorState from "../../../../components/ui/errorState";
import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import { useParams } from "react-router-dom";
import { useSedes } from "../../../sedes/hooks/useSedes";
import { useInstitucional } from "../../hooks/useInstitucional";
import AutoridadesGrid from "../../components/AutoridadesGrid";
import HistoriaSection from "../../components/HistoriaSection";
import InstitucionalHero from "../../components/InstitucionalHero";
import MisionVisionSection from "../../components/MisionVisionSection";
import SedesGrid from "../../../sedes/components/SedesGrid";

export default function InstitucionalPage() {
  const { sedeId } = useParams<{ sedeId: string }>();
  const { informacion, autoridades, cargando, error, recargar } = useInstitucional(sedeId);
  const { sedes, cargando: sedesCargando, error: sedesError } = useSedes();
  if (!sedeId) return <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:py-12"><header><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49200]">Conocé el instituto</p><h1 className="mt-2 text-4xl font-black tracking-tight text-[#171717]">Información institucional</h1><p className="mt-3 max-w-2xl text-slate-600">Elegí una sede para consultar su historia, misión, visión y autoridades.</p></header>{sedesError ? <ErrorState title="No pudimos cargar las sedes" description={sedesError} /> : <SedesGrid sedes={sedes} cargando={sedesCargando} destino="institucional" />}</main>;
  if (cargando) return <div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="mediano" text="Cargando información institucional..." /></div>;
  if (error) return <main className="mx-auto max-w-6xl px-5 py-12"><ErrorState title="No pudimos cargar la información" description={error} onRetry={recargar} /></main>;
  return <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:py-12"><InstitucionalHero informacion={informacion} /><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49200]">Dónde encontrarnos</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Nuestras sedes</h2><div className="mt-5">{sedesError ? <p className="text-sm text-slate-500">No pudimos cargar las sedes en este momento.</p> : <SedesGrid sedes={sedes} cargando={sedesCargando} destino="institucional" />}</div></section><HistoriaSection historia={informacion.historia} /><MisionVisionSection mision={informacion.mision} vision={informacion.vision} /><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49200]">Equipo de gestión</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Autoridades</h2><div className="mt-5"><AutoridadesGrid autoridades={autoridades} /></div></section></main>;
}