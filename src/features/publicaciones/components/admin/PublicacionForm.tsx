import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CrearPublicacionSchema,
  type CrearPublicacionFormValues,
} from "../../schemas/publicacion.schema";

interface Props {
  valoresIniciales?: Partial<CrearPublicacionFormValues>;
  onSubmit: (valores: CrearPublicacionFormValues) => void;
  isSubmitting: boolean;
}

export function PublicacionForm({
  valoresIniciales,
  onSubmit,
  isSubmitting,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearPublicacionFormValues>({
    resolver: zodResolver(CrearPublicacionSchema),
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
        <label className="block text-sm font-medium mb-1">Tipo</label>
        <select
          {...register("tipo")}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="NOTICIA">Noticia</option>
          <option value="EVENTO">Evento</option>
        </select>
        {errors.tipo && (
          <p className="text-sm text-red-500 mt-1">{errors.tipo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resumen</label>
        <textarea
          {...register("resumen")}
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.resumen && (
          <p className="text-sm text-red-500 mt-1">
            {errors.resumen.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contenido</label>
        <textarea
          {...register("contenido")}
          rows={6}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.contenido && (
          <p className="text-sm text-red-500 mt-1">
            {errors.contenido.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          URL de imagen
        </label>
        <input
          {...register("imagenUrl")}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
        {errors.imagenUrl && (
          <p className="text-sm text-red-500 mt-1">
            {errors.imagenUrl.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Fecha del evento (opcional)
        </label>
        <input
          type="date"
          {...register("fechaEvento")}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("destacada")}
          id="destacada"
          className="h-4 w-4"
        />
        <label htmlFor="destacada" className="text-sm">
          Destacar esta publicación
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-yellow-500 text-black font-medium px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Guardando..." : "Guardar publicación"}
      </button>
    </form>
  );
}