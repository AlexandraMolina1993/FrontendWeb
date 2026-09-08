import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorState from "../../../components/ui/errorState";

import CarreraFilters from "../components/CarreraFilters";
import CarreraSearch from "../components/CarreraSearch";
import CarrerasGrid from "../components/CarrerasGrid";
import { useCarreras } from "../hooks/useCarreras";
import { validarBusqueda } from "../schemas/carrera.schema";
import type { Carrera, CarreraFiltros } from "../types/carrera.types";

const FILTROS_VACIOS: CarreraFiltros = { modalidad: "" };

export default function CarrerasPage() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState("");
  const [filtros, setFiltros] = useState<CarreraFiltros>(FILTROS_VACIOS);

  const errorBusqueda = validarBusqueda(busqueda);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setBusquedaDebounced(errorBusqueda ? "" : busqueda.trim());
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [busqueda, errorBusqueda]);

  const { carreras, cargando, error, recargar } = useCarreras({
    buscar: busquedaDebounced || undefined,
    modalidad: filtros.modalidad || undefined,
  });

  function verDetalle(carrera: Carrera) {
    navigate(`/carreras/${carrera.id}`);
  }

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:py-12">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49200]">
          Oferta académica
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-[#171717]">
          Carreras
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Conocé las tecnicaturas y propuestas de formación del instituto.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
        <CarreraSearch
          value={busqueda}
          onChange={setBusqueda}
          error={errorBusqueda}
          placeholder="Buscar carrera por nombre..."
        />
        <CarreraFilters
          filtros={filtros}
          onChange={setFiltros}
          onReset={() => setFiltros(FILTROS_VACIOS)}
        />
      </div>

      {error ? (
        <ErrorState
          title="No pudimos cargar las carreras"
          description={error}
          onRetry={recargar}
        />
      ) : (
        <CarrerasGrid
          variante="publica"
          carreras={carreras}
          cargando={cargando}
          onSelect={verDetalle}
          tituloVacio="No hay carreras publicadas"
          descripcionVacia="Cuando el instituto publique carreras van a aparecer acá."
        />
      )}
    </main>
  );
}
