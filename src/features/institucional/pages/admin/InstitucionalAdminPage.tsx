import { useState } from "react";
import AdminLayout from "../../../../components/layouts/applayout";
import ErrorState from "../../../../components/ui/errorState";
import { useInstitucional } from "../../hooks/useInstitucional";
import { institucionalApi } from "../../services/institucional.api";
import { AUTORIDAD_FORM_VACIO, type AutoridadFormValues, type InstitucionalFormValues } from "../../schemas/institucional.schema";
import { validarAutoridad, validarInstitucional } from "../../schemas/institucional.schema";
import InstitucionalForm from "../../components/InstitucionalForm";
import AutoridadesForm from "../../components/AutoridadesForm";
import AutoridadesList from "../../components/AutoridadesList";

export default function InstitucionalAdminPage() {
  const { informacion, autoridades, cargando, error, recargar, setInformacion, setAutoridades } = useInstitucional();
  const [guardando, setGuardando] = useState(false);
  const [autoridad, setAutoridad] = useState<AutoridadFormValues>(AUTORIDAD_FORM_VACIO);
  const valores: InstitucionalFormValues = { nombreInstitucion: informacion.nombreInstitucion, lema: informacion.lema, historia: informacion.historia, mision: informacion.mision, vision: informacion.vision, valores: informacion.valores };
  async function guardarInformacion() { const errores = validarInstitucional(valores); if (Object.keys(errores).length) { window.alert(Object.values(errores)[0]); return; } setGuardando(true); try { const actualizada = await institucionalApi.actualizar({ ...informacion, ...valores }); setInformacion(actualizada); } catch (err) { window.alert(err instanceof Error ? err.message : "No se pudo guardar la información."); } finally { setGuardando(false); } }
  async function guardarAutoridad() { const errores = validarAutoridad(autoridad); if (Object.keys(errores).length) { window.alert(Object.values(errores)[0]); return; } setGuardando(true); try { const creada = await institucionalApi.crearAutoridad({ ...autoridad, descripcion: autoridad.descripcion || null, imagenUrl: autoridad.imagenUrl || null, orden: Number(autoridad.orden) || 1 }); setAutoridades([...autoridades, creada]); setAutoridad(AUTORIDAD_FORM_VACIO); } catch (err) { window.alert(err instanceof Error ? err.message : "No se pudo guardar la autoridad."); } finally { setGuardando(false); } }
  async function eliminarAutoridad(id: string) { if (!window.confirm("¿Eliminar esta autoridad?")) return; try { await institucionalApi.eliminarAutoridad(id); setAutoridades(autoridades.filter((item) => item.id !== id)); } catch (err) { window.alert(err instanceof Error ? err.message : "No se pudo eliminar la autoridad."); } }
  return <AdminLayout><div className="space-y-8 pb-8"><header><h1 className="text-3xl font-black text-zinc-950 sm:text-4xl">Información institucional</h1><p className="mt-2 text-sm text-zinc-500">Administrá la identidad, historia y autoridades del instituto.</p></header>{error && <ErrorState title="No pudimos cargar la información" description={error} onRetry={recargar} />}{!cargando && <><InstitucionalForm values={valores} onChange={(next) => setInformacion({ ...informacion, ...next })} onSubmit={guardarInformacion} guardando={guardando} /><section className="space-y-5"><div><h2 className="text-2xl font-black text-[#171717]">Autoridades</h2><p className="mt-1 text-sm text-slate-500">Ordená y mantené actualizado el equipo de gestión.</p></div><AutoridadesForm values={autoridad} onChange={setAutoridad} onSubmit={guardarAutoridad} guardando={guardando} /><AutoridadesList autoridades={autoridades} onDelete={(item) => void eliminarAutoridad(item.id)} /></section></>}</div></AdminLayout>;
}