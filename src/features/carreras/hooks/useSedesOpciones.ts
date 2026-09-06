import { useEffect, useState } from "react";
import axios from "axios";

import { getApiErrorMessage } from "../../../shared/lib/api/api-error";

import { carreraApi } from "../services/carrera.api";
import type { SedeOpcion } from "../types/carrera.types";

export function useSedesOpciones(habilitado = true) {
  const [sedes, setSedes] = useState<SedeOpcion[]>([]);
  const [cargando, setCargando] = useState(habilitado);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!habilitado) {
      setCargando(false);
      return;
    }

    const controller = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);

      try {
        const data = await carreraApi.listarSedes(controller.signal);
        setSedes(data);
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(getApiErrorMessage(err));
        setSedes([]);
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    void cargar();

    return () => controller.abort();
  }, [habilitado, tick]);

  return {
    sedes,
    cargando,
    error,
    recargar: () => setTick((actual) => actual + 1),
  };
}
