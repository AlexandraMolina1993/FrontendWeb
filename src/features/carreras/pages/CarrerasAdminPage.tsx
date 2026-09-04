import { useEffect, useState } from "react";

import { BookOpen } from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import ErrorState from "../../../components/ui/errorState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import Modal from "../../../components/ui/modal";

import CarreraFilters from "../components/CarreraFilters";
import CarreraPreview from "../components/CarreraPreview";
import CarreraSearch from "../components/CarreraSearch";
import CarrerasGrid from "../components/CarrerasGrid";
import { CARRERA_EJEMPLO_API } from "../data/carrera.ejemplo";
import { useCarrera } from "../hooks/useCarrera";
import { useCarreras } from "../hooks/useCarreras";
import { validarBusqueda } from "../schemas/carrera.schema";
import type { Carrera, CarreraFiltros } from "../types/carrera.types";

const FILTROS_VACIOS: CarreraFiltros = { modalidad: "" };

export default function CarrerasAdminPage() {
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState("");
  const [filtros, setFiltros] = useState<CarreraFiltros>(FILTROS_VACIOS);
  const [carreraActiva, setCarreraActiva] = useState<Carrera | null>(null);

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

  const {
    carrera: carreraDetalle,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useCarrera(
    carreraActiva && carreraActiva.id !== CARRERA_EJEMPLO_API.id
      ? carreraActiva.id
      : null,
  );

  const carreraModal = carreraDetalle ?? carreraActiva;

  function abrirDetalle(carrera: Carrera) {
    setCarreraActiva(carrera);
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-6">
        <header className="pt-2">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
            Carreras
          </h1>
          <p className="mt-2 text-sm text-zinc-500 sm:text-base">
            Administrá la oferta académica publicada por el instituto.
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
            variante="admin"
            carreras={carreras}
            cargando={cargando}
            onAdministrar={abrirDetalle}
            onVistaPrevia={abrirDetalle}
            tituloVacio="No hay carreras publicadas"
            descripcionVacia="Cuando el instituto cargue carreras en la API van a aparecer acá."
          />
        )}
      </div>

      <Modal
        abierto={Boolean(carreraActiva)}
        cerrar={() => setCarreraActiva(null)}
        titulo="Detalle de la carrera"
        descripcion={carreraModal?.descripcion ?? "Información de la carrera."}
        icono={<BookOpen size={20} />}
        tamano="grande"
      >
        {cargandoDetalle && !carreraModal && (
          <div className="flex min-h-48 items-center justify-center">
            <LoadingSpinner size="mediano" text="Cargando detalle..." />
          </div>
        )}

        {errorDetalle && !carreraModal && (
          <ErrorState
            title="No pudimos cargar el detalle"
            description={errorDetalle}
          />
        )}

        {carreraModal && <CarreraPreview carrera={carreraModal} />}
      </Modal>
    </AdminLayout>
  );
}
