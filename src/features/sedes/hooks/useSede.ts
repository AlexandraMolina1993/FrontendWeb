import { useEffect, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../../shared/lib/api/api-error";
import { sedeApi } from "../services/sede.api";
import type { Sede } from "../schemas/sede.schema";

export function useSede(id: string | null) {
  const [sede, setSede] = useState<Sede | null>(null);
  const [cargando, setCargando] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) { setSede(null); setCargando(false); return; }
    const controller = new AbortController();
    setCargando(true); setError(null);
    sedeApi.obtenerPorId(id, controller.signal).then(setSede).catch((err) => {
      if (!controller.signal.aborted && !axios.isCancel(err)) setError(getApiErrorMessage(err));
    }).finally(() => { if (!controller.signal.aborted) setCargando(false); });
    return () => controller.abort();
  }, [id]);
  return { sede, cargando, error };
}