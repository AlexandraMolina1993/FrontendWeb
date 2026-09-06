import { CalendarDays } from "lucide-react";
import { usePublicaciones } from "../../publicaciones/hooks/usePublicaciones";

export default function UpcomingActivities() {
  const { data, isLoading, isError } = usePublicaciones("EVENTO");
  const actividades = data?.filter((item) => item.fechaEvento).slice(0, 3) ?? [];
  return <section className="bg-[#171717] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#FFD21A]"><CalendarDays size={16} /> Agenda</p><h2 className="mt-2 text-3xl font-black">Próximas actividades</h2>{isLoading && <p className="mt-8 text-white/60">Cargando agenda...</p>}{isError && <p className="mt-8 text-white/60">No pudimos cargar la agenda.</p>}{!isLoading && !isError && actividades.length === 0 && <p className="mt-8 text-white/60">No hay actividades próximas.</p>}<div className="mt-8 grid gap-4 md:grid-cols-3">{actividades.map((actividad) => <article key={actividad.id} className="border border-white/15 p-5"><p className="text-sm font-bold text-[#FFD21A]">{actividad.fechaEvento ? new Date(actividad.fechaEvento).toLocaleDateString("es-AR", { day: "numeric", month: "long" }) : "Fecha a confirmar"}</p><h3 className="mt-3 text-xl font-bold">{actividad.titulo}</h3><p className="mt-2 text-sm leading-6 text-white/65">{actividad.resumen}</p></article>)}</div></div></section>;
}
