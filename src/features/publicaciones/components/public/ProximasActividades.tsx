import { usePublicaciones } from "../../hooks/usePublicaciones";

export function ProximasActividades() {
  const { data, isLoading } = usePublicaciones("EVENTO");

  const proximas = data
    ?.filter((p) => p.fechaEvento && new Date(p.fechaEvento) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.fechaEvento!).getTime() - new Date(b.fechaEvento!).getTime()
    )
    .slice(0, 3);

  if (isLoading) return null;
  if (!proximas || proximas.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <h2 className="mb-3 text-sm font-bold text-zinc-700">
        Próximas actividades
      </h2>
      <ul className="space-y-2">
        {proximas.map((actividad) => (
          <li key={actividad.id} className="text-sm">
            <span className="font-semibold text-zinc-900">
              {actividad.titulo}
            </span>
            <span className="ml-2 text-zinc-400">
              {new Date(actividad.fechaEvento!).toLocaleDateString("es-AR")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
