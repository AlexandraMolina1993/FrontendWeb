interface Props {
  filtroActivo: "TODAS" | "NOTICIA" | "EVENTO";
  onCambiarFiltro: (filtro: "TODAS" | "NOTICIA" | "EVENTO") => void;
}

const OPCIONES: { valor: "TODAS" | "NOTICIA" | "EVENTO"; label: string }[] = [
  { valor: "TODAS", label: "Todas" },
  { valor: "NOTICIA", label: "Noticias" },
  { valor: "EVENTO", label: "Eventos" },
];

export function PublicacionFilters({ filtroActivo, onCambiarFiltro }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      {OPCIONES.map((opcion) => (
        <button
          key={opcion.valor}
          onClick={() => onCambiarFiltro(opcion.valor)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filtroActivo === opcion.valor
              ? "bg-yellow-500 text-black"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {opcion.label}
        </button>
      ))}
    </div>
  );
}