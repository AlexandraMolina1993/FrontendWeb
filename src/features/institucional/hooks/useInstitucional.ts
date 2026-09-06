import { useEffect, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../../shared/lib/api/api-error";
import { institucionalApi } from "../services/institucional.api";
import { INFORMACION_INSTITUCIONAL_VACIA } from "../schemas/institucional.schema";
import type { Autoridad, InformacionInstitucional } from "../schemas/institucional.schema";

export function useInstitucional() {
  const [informacion, setInformacion] = useState<InformacionInstitucional>(INFORMACION_INSTITUCIONAL_VACIA);
  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const [institucional, autoridadesApi] = await Promise.all([
          institucionalApi.obtener(controller.signal),
          institucionalApi.listarAutoridades(controller.signal),
        ]);
        setInformacion(institucional);
        setAutoridades(autoridadesApi);
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(getApiErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }
    void cargar();
    return () => controller.abort();
  }, [tick]);

  return { informacion, autoridades, cargando, error, recargar: () => setTick((value) => value + 1), setInformacion, setAutoridades };
}