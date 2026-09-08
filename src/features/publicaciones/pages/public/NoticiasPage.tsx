import { usePublicaciones } from "../../hooks/usePublicaciones";
import { PublicacionesGrid } from "../../components/public/PublicacionesGrid";

export default function NoticiasPage() {
  const { data, isLoading, isError } = usePublicaciones("NOTICIA");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Noticias</h1>
      <PublicacionesGrid
        publicaciones={data}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}