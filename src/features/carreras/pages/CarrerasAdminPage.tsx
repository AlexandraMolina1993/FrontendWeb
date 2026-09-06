import { useEffect, useState } from "react";

import { BookOpen, Pencil, Plus } from "lucide-react";

import AdminLayout from "../../../components/layouts/applayout";
import Button from "../../../components/ui/button";
import ErrorState from "../../../components/ui/errorState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import Modal from "../../../components/ui/modal";
import { getApiErrorMessage } from "../../../shared/lib/api/api-error";

import CarreraDeleteDialog from "../components/CarreraDeleteDialog";
import CarreraFilters from "../components/CarreraFilters";
import CarreraForm from "../components/CarreraForm";
import CarreraPreview from "../components/CarreraPreview";
import CarreraSearch from "../components/CarreraSearch";
import CarrerasGrid from "../components/CarrerasGrid";
import { useCarrera } from "../hooks/useCarrera";
import { useCarreras } from "../hooks/useCarreras";
import { formularioACarreraInput, validarBusqueda } from "../schemas/carrera.schema";
import { carreraApi } from "../services/carrera.api";
import type { Carrera, CarreraFiltros, CarreraFormValues } from "../types/carrera.types";

const FILTROS_VACIOS: CarreraFiltros = { modalidad: "" };

type ModalAdmin = "crear" | "editar" | "preview" | null;

export default function CarrerasAdminPage() {
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDebounced, setBusquedaDebounced] = useState("");
  const [filtros, setFiltros] = useState<CarreraFiltros>(FILTROS_VACIOS);
  const [modal, setModal] = useState<ModalAdmin>(null);
  const [carreraActiva, setCarreraActiva] = useState<Carrera | null>(null);
  const [carreraABaja, setCarreraABaja] = useState<Carrera | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);

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
  } = useCarrera(modal === "preview" && carreraActiva ? carreraActiva.id : null);

  const carreraModal = carreraDetalle ?? carreraActiva;

  function abrirCrear() {
    setErrorAccion(null);
    setCarreraActiva(null);
    setModal("crear");
  }

  function abrirEditar(carrera: Carrera) {
    setErrorAccion(null);
    setCarreraActiva(carrera);
    setModal("editar");
  }

  function abrirPreview(carrera: Carrera) {
    setErrorAccion(null);
    setCarreraActiva(carrera);
    setModal("preview");
  }

  function cerrarModal() {
    if (guardando) return;
    setModal(null);
    setCarreraActiva(null);
    setErrorAccion(null);
  }

  async function guardarCarrera(values: CarreraFormValues) {
    setGuardando(true);
    setErrorAccion(null);

    try {
      const payload = formularioACarreraInput(values);

      if (modal === "editar" && carreraActiva) {
        await carreraApi.actualizar(carreraActiva.id, payload);
      } else {
        await carreraApi.crear(payload);
      }

      recargar();
      setModal(null);
      setCarreraActiva(null);
    } catch (err) {
      setErrorAccion(getApiErrorMessage(err));
    } finally {
      setGuardando(false);
    }
  }

  async function confirmarBaja() {
    if (!carreraABaja) return;

    setGuardando(true);
    setErrorAccion(null);

    try {
      await carreraApi.darDeBaja(carreraABaja.id);
      setCarreraABaja(null);
      recargar();
    } catch (err) {
      setErrorAccion(getApiErrorMessage(err));
    } finally {
      setGuardando(false);
    }
  }

  const modalAbierto = modal === "crear" || modal === "editar" || modal === "preview";

  return (
    <AdminLayout>
      <div className="space-y-8 pb-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="pt-2">
            <h1 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Carreras
            </h1>
            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              Administrá la oferta académica publicada por el instituto.
            </p>
          </div>
          <Button onClick={abrirCrear}>
            <Plus size={16} aria-hidden="true" />
            Nueva carrera
          </Button>
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

        {errorAccion && !modal && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorAccion}
          </p>
        )}

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
            onAdministrar={abrirEditar}
            onEditar={abrirEditar}
            onVistaPrevia={abrirPreview}
            onDarDeBaja={setCarreraABaja}
            tituloVacio="No hay carreras publicadas"
            descripcionVacia="Cuando cargues una carrera en la API va a aparecer acá."
            accionVacia={
              <Button onClick={abrirCrear}>
                <Plus size={16} aria-hidden="true" />
                Nueva carrera
              </Button>
            }
          />
        )}
      </div>

      <Modal
        abierto={modalAbierto}
        cerrar={cerrarModal}
        titulo={
          modal === "crear"
            ? "Nueva carrera"
            : modal === "editar"
              ? "Editar carrera"
              : "Detalle de la carrera"
        }
        descripcion={
          modal === "preview"
            ? (carreraModal?.descripcion ?? "Información de la carrera.")
            : "Completá los datos que acepta la API. El slug y el estado los define el servidor."
        }
        icono={modal === "preview" ? <BookOpen size={20} /> : <Pencil size={20} />}
        tamano="grande"
      >
        {errorAccion && (modal === "crear" || modal === "editar") && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorAccion}
          </p>
        )}

        {(modal === "crear" || modal === "editar") && (
          <CarreraForm
            key={carreraActiva?.id ?? "nueva"}
            carrera={modal === "editar" ? carreraActiva : null}
            onSubmit={(values) => void guardarCarrera(values)}
            onCancel={cerrarModal}
            cargando={guardando}
          />
        )}

        {modal === "preview" && cargandoDetalle && !carreraModal && (
          <div className="flex min-h-48 items-center justify-center">
            <LoadingSpinner size="mediano" text="Cargando detalle..." />
          </div>
        )}

        {modal === "preview" && errorDetalle && !carreraModal && (
          <ErrorState
            title="No pudimos cargar el detalle"
            description={errorDetalle}
          />
        )}

        {modal === "preview" && carreraModal && (
          <CarreraPreview carrera={carreraModal} />
        )}
      </Modal>

      <CarreraDeleteDialog
        abierto={Boolean(carreraABaja)}
        carrera={carreraABaja}
        confirmar={() => void confirmarBaja()}
        cancelar={() => {
          if (!guardando) setCarreraABaja(null);
        }}
        cargando={guardando}
      />
    </AdminLayout>
  );
}
