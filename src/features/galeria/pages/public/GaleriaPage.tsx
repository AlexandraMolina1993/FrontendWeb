import { useAlbums } from "../../hooks/useAlbums";
import { AlbumsGrid } from "../../components/public/AlbumsGrid";

export default function GaleriaPage() {
  const { data, isLoading, isError, refetch } = useAlbums();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-black text-zinc-950">Galería</h1>
      <AlbumsGrid
        albums={data}
        isLoading={isLoading}
        isError={isError}
        onReintentar={() => void refetch()}
      />
    </div>
  );
}
