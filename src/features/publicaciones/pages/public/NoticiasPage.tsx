import { usePublicaciones } from "../../hooks/usePublicaciones";
import { PublicacionesGrid } from "../../components/public/PublicacionesGrid";

export default function NoticiasPage() {
  const { data, isLoading, isError, refetch } = usePublicaciones("NOTICIA");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-black text-zinc-950">Noticias</h1>
      <PublicacionesGrid
        publicaciones={data}
        isLoading={isLoading}
        isError={isError}
        onReintentar={() => void refetch()}
      />
    </div>
  );
}
