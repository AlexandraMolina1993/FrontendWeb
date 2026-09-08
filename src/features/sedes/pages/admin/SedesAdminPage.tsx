import { useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../../../components/layouts/applayout";
import ErrorState from "../../../../components/ui/errorState";
import { useSedes } from "../../hooks/useSedes";
import SedeForm from "../../components/SedeForm";
import SedesTable from "../../components/SedesTable";
import { sedeApi } from "../../services/sede.api";
import type { Sede, SedeFormValues } from "../../schemas/sede.schema";
import { validarSede } from "../../schemas/sede.schema";
import { formularioASede, sedeAFormulario } from "../../utils/sede.utils";

export default function SedesAdminPage() {
  const { sedes, cargando, error, recargar } = useSedes();
  const [seleccionada, setSeleccionada] = useState<Sede | null>(null);
  const [values, setValues] = useState<SedeFormValues | null>(null);
  const [guardando, setGuardando] = useState(false);

  function editar(sede: Sede) {
    setSeleccionada(sede);
    setValues(sedeAFormulario(sede));
  }

  async function guardarEdicion() {
    if (!seleccionada || !values) return;
    const errores = validarSede(values);
    if (Object.keys(errores).length > 0) {
      window.alert(Object.values(errores)[0]);
      return;
    }

    setGuardando(true);
    try {
      await sedeApi.actualizar(seleccionada.id, formularioASede(values, seleccionada.id));
      setSeleccionada(null);
      setValues(null);
      recargar();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo actualizar la sede.");
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(sede: Sede) {
    if (!window.confirm(`¿Eliminar ${sede.nombre}?`)) return;
    try {
      await sedeApi.eliminar(sede.id);
      recargar();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo eliminar la sede.");
    }
  }

  async function alternar(sede: Sede) {
    try {
      await sedeApi.cambiarEstado(sede.id, !sede.activa);
      recargar();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo actualizar el estado.");
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-zinc-950 sm:text-4xl">Sedes</h1>
            <p className="mt-2 text-sm text-zinc-500">Consultá y administrá las sedes cargadas en la API.</p>
          </div>
          <Link to="/admin/sedes/nueva" className="rounded-xl bg-[#FFD21A] px-5 py-3 text-sm font-bold text-[#171717]">
            Nueva sede
          </Link>
        </header>

        {error && <ErrorState title="No pudimos cargar las sedes" description={error} onRetry={recargar} />}

        {!cargando && !error && (
          <>
            <SedesTable sedes={sedes} onEdit={editar} onDelete={(sede) => void eliminar(sede)} onToggle={(sede) => void alternar(sede)} />
            {seleccionada && values && (
              <section>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-black text-[#171717]">Editar sede</h2>
                  <button type="button" onClick={() => { setSeleccionada(null); setValues(null); }} className="text-sm font-bold text-slate-500 hover:text-[#171717]">Cancelar</button>
                </div>
                <SedeForm values={values} onChange={setValues} onSubmit={guardarEdicion} guardando={guardando} />
              </section>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
