import { useEffect, useState } from "react";
import axios from "axios";

import { getApiErrorMessage } from "../../../shared/lib/api/api-error";

import { carreraApi } from "../services/carrera.api";
import type { Carrera } from "../types/carrera.types";

export function useCarrera(id: string | null) {
  const [carrera, setCarrera] = useState<Carrera | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCarrera(null);
      setError(null);
      setCargando(false);
      return;
    }

    const carreraId = id;
    const controller = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);

      try {
        const data = await carreraApi.obtenerPorId(carreraId, controller.signal);
        setCarrera(data);
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(getApiErrorMessage(err));
        setCarrera(null);
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    void cargar();

    return () => controller.abort();
  }, [id]);

  return { carrera, cargando, error };
}
