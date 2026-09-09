type FiltroPublicacion = "TODAS" | "NOTICIA" | "EVENTO";

interface Props {
  filtroActivo: FiltroPublicacion;
  onCambiarFiltro: (filtro: FiltroPublicacion) => void;
}

const OPCIONES: { valor: FiltroPublicacion; label: string }[] = [
  { valor: "TODAS", label: "Todas" },
  { valor: "NOTICIA", label: "Noticias" },
  { valor: "EVENTO", label: "Eventos" },
];

export function PublicacionFilters({ filtroActivo, onCambiarFiltro }: Props) {
  return (
    <div className="mb-6 flex gap-2" role="group" aria-label="Filtrar publicaciones">
      {OPCIONES.map((opcion) => {
        const activo = filtroActivo === opcion.valor;

        return (
          <button
            key={opcion.valor}
            type="button"
            onClick={() => onCambiarFiltro(opcion.valor)}
            aria-pressed={activo}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-[#FFD21A]/30 ${
              activo
                ? "border border-[#E4B600] bg-[#FFD21A] text-[#171717]"
                : "border border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {opcion.label}
          </button>
        );
      })}
    </div>
  );
}
