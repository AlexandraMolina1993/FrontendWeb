import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CrearAlbumSchema,
  type CrearAlbumFormValues,
} from "../../schemas/album.schema";

interface Props {
  valoresIniciales?: Partial<CrearAlbumFormValues>;
  onSubmit: (valores: CrearAlbumFormValues) => void;
  isSubmitting: boolean;
}

export function AlbumForm({
  valoresIniciales,
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearAlbumFormValues>({
    resolver: zodResolver(CrearAlbumSchema),
    defaultValues: valoresIniciales,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          {...register("titulo")}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.titulo && (
          <p className="text-sm text-red-500 mt-1">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          {...register("descripcion")}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.descripcion && (
          <p className="text-sm text-red-500 mt-1">
            {errors.descripcion.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fecha</label>
        <input
          type="date"
          {...register("fecha")}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.fecha && (
          <p className="text-sm text-red-500 mt-1">{errors.fecha.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-yellow-500 text-black font-medium px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Guardando..." : "Guardar álbum"}
      </button>
    </form>
  );
}