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
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Próximas actividades
      </h2>
      <ul className="space-y-2">
        {proximas.map((actividad) => (
          <li key={actividad.id} className="text-sm">
            <span className="font-medium">{actividad.titulo}</span>
            <span className="text-gray-400 ml-2">
              {new Date(actividad.fechaEvento!).toLocaleDateString("es-AR")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}