import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminLayout from "../../../../components/layouts/applayout";
import SedeForm from "../../components/SedeForm";
import { validarSede } from "../../schemas/sede.schema";
import { sedeApi } from "../../services/sede.api";
import { SEDE_FORM_VACIO } from "../../schemas/sede.schema";
import type { SedeFormValues } from "../../schemas/sede.schema";
import { formularioASede } from "../../utils/sede.utils";

export default function SedeNuevaPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<SedeFormValues>(SEDE_FORM_VACIO);
  const [guardando, setGuardando] = useState(false);

  async function guardar() {
    const errores = validarSede(values);
    if (Object.keys(errores).length > 0) {
      window.alert(Object.values(errores)[0]);
      return;
    }

    setGuardando(true);
    try {
      await sedeApi.crear(formularioASede(values));
      navigate("/admin/sedes");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo crear la sede.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8">
        <header>
          <Link to="/admin/sedes" className="text-sm font-bold text-[#C49200]">
            ← Ver sedes
          </Link>
          <h1 className="mt-4 text-3xl font-black text-zinc-950 sm:text-4xl">Nueva sede</h1>
          <p className="mt-2 text-sm text-zinc-500">Cargá la información que se publicará en la API de sedes.</p>
        </header>
        <SedeForm values={values} onChange={setValues} onSubmit={guardar} guardando={guardando} />
      </div>
    </AdminLayout>
  );
}