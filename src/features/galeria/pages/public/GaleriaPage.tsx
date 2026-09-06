import { useAlbums } from "../../hooks/useAlbums";
import { AlbumsGrid } from "../../components/public/AlbumsGrid";

export default function GaleriaPage() {
  const { data, isLoading, isError } = useAlbums();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Galería</h1>
      <AlbumsGrid albums={data} isLoading={isLoading} isError={isError} />
    </div>
  );
}