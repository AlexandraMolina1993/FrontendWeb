import { Map } from "lucide-react";
export default function SedeMap({ latitud, longitud, direccion }: { latitud: number | null; longitud: number | null; direccion: string }) {
  const disponible = latitud != null && longitud != null;
  return <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6"><div className="flex items-center gap-2 font-bold text-[#171717]"><Map size={18} className="text-[#C49200]" /> Ubicación</div><p className="mt-3 text-sm text-slate-600">{disponible ? `Coordenadas: ${latitud}, ${longitud}` : direccion}</p>{disponible && <a className="mt-4 inline-block text-sm font-bold text-[#C49200]" href={`https://www.google.com/maps?q=${latitud},${longitud}`} target="_blank" rel="noreferrer">Abrir en Google Maps →</a>}</div>;
}