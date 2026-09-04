import { useEffect, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../../shared/lib/api/api-error";
import { sedeApi } from "../services/sede.api";
import type { Sede } from "../schemas/sede.schema";

export function useSedes() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    sedeApi.listar(controller.signal).then(setSedes).catch((err) => {
      if (!controller.signal.aborted && !axios.isCancel(err)) setError(getApiErrorMessage(err));
    }).finally(() => { if (!controller.signal.aborted) setCargando(false); });
    return () => controller.abort();
  }, [tick]);
  return { sedes, cargando, error, recargar: () => { setCargando(true); setTick((value) => value + 1); } };
}