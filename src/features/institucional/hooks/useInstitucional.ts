import { useEffect, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../../shared/lib/api/api-error";
import { institucionalApi } from "../services/institucional.api";
import { INFORMACION_INSTITUCIONAL_VACIA } from "../schemas/institucional.schema";
import type { Autoridad, InformacionInstitucional } from "../schemas/institucional.schema";

export function useInstitucional(sedeId?: string) {
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
      if (!sedeId) {
        setError("No se indicó la sede para consultar la información institucional.");
        setCargando(false);
        return;
      }
      try {
        const institucional = await institucionalApi.obtener(sedeId, controller.signal);
        if (!institucional) {
          setInformacion({ ...INFORMACION_INSTITUCIONAL_VACIA, sedeId });
          setAutoridades([]);
          return;
        }
        setInformacion(institucional);
        setAutoridades(institucional.autoridades);
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(getApiErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }
    void cargar();
    return () => controller.abort();
  }, [sedeId, tick]);

  return { informacion, autoridades, cargando, error, recargar: () => setTick((value) => value + 1), setInformacion, setAutoridades };
}