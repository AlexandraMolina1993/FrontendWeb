import LoadingSpinner from "../../../../components/ui/loadingSpinner";
import { useInstitucional } from "../../hooks/useInstitucional";
import AutoridadesGrid from "../../components/AutoridadesGrid";
import HistoriaSection from "../../components/HistoriaSection";
import InstitucionalHero from "../../components/InstitucionalHero";
import MisionVisionSection from "../../components/MisionVisionSection";
import ValoresInstitucionales from "../../components/ValoresInstitucionales";

export default function InstitucionalPage() {
  const { informacion, autoridades, cargando, error } = useInstitucional();
  if (cargando) return <div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="mediano" text="Cargando información institucional..." /></div>;
  if (error) {
    console.warn("La información institucional no está disponible; se muestra contenido de respaldo.");
  }
  return <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:py-12"><InstitucionalHero informacion={informacion} /><HistoriaSection historia={informacion.historia} /><MisionVisionSection mision={informacion.mision} vision={informacion.vision} /><ValoresInstitucionales valores={informacion.valores} /><section><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49200]">Equipo de gestión</p><h2 className="mt-2 text-3xl font-black text-[#171717]">Autoridades</h2><div className="mt-5"><AutoridadesGrid autoridades={autoridades} /></div></section></main>;
}