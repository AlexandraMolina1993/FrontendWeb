import { useEffect, useState } from "react";
import axios from "axios";

import { getApiErrorMessage } from "../../../shared/lib/api/api-error";

import { CARRERA_EJEMPLO_API, coincideConEjemplo } from "../data/carrera.ejemplo";
import { carreraApi } from "../services/carrera.api";
import type { Carrera, CarreraListParams } from "../types/carrera.types";

export function useCarreras(params: CarreraListParams = {}) {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const buscar = params.buscar?.trim() ?? "";
  const modalidad = params.modalidad ?? "";
  const sede = params.sede ?? "";

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);

      try {
        const data = await carreraApi.listar(
          {
            buscar: buscar || undefined,
            modalidad: modalidad || undefined,
            sede: sede || undefined,
          },
          controller.signal,
        );

        if (data.length > 0) {
          setCarreras(data);
          return;
        }

        setCarreras(
          coincideConEjemplo(CARRERA_EJEMPLO_API, buscar, modalidad)
            ? [CARRERA_EJEMPLO_API]
            : [],
        );
      } catch (err) {
        if (controller.signal.aborted || axios.isCancel(err)) return;
        setError(getApiErrorMessage(err));
        setCarreras([]);
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    void cargar();

    return () => controller.abort();
  }, [buscar, modalidad, sede, tick]);

  return {
    carreras,
    cargando,
    error,
    recargar: () => setTick((actual) => actual + 1),
  };
}
