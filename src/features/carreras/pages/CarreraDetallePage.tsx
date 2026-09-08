import { Link, useParams } from "react-router-dom";

import ErrorState from "../../../components/ui/errorState";
import LoadingSpinner from "../../../components/ui/loadingSpinner";

import CarreraHeader from "../components/CarreraHeader";
import { useCarrera } from "../hooks/useCarrera";

export default function CarreraDetallePage() {
  const { id } = useParams();
  const { carrera, cargando, error } = useCarrera(id ?? null);

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="mediano" text="Cargando carrera..." />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-5 py-8 sm:py-12">
      <Link to="/carreras" className="text-sm font-bold text-[#C49200]">
        ← Volver a carreras
      </Link>

      {error || !carrera ? (
        <ErrorState
          title="No encontramos esta carrera"
          description={error ?? "La carrera solicitada no existe o no está disponible."}
        />
      ) : (
        <CarreraHeader carrera={carrera} />
      )}
    </main>
  );
}
