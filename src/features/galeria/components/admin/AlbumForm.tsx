import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../../components/ui/input";
import Textarea from "../../../../components/ui/textarea";
import {
  CrearAlbumSchema,
  type CrearAlbumFormValues,
} from "../../schemas/album.schema";

interface Props {
  formId: string;
  valoresIniciales?: Partial<CrearAlbumFormValues>;
  onSubmit: (valores: CrearAlbumFormValues) => void;
}

export function AlbumForm({ formId, valoresIniciales, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CrearAlbumFormValues>({
    resolver: zodResolver(CrearAlbumSchema),
    defaultValues: valoresIniciales,
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      <Input
        label="Título"
        required
        error={errors.titulo?.message}
        {...register("titulo")}
      />

      <Textarea
        label="Descripción"
        rows={3}
        required
        error={errors.descripcion?.message}
        {...register("descripcion")}
      />

      <Input
        label="Fecha"
        type="date"
        required
        ayuda="Fecha del evento que retrata el álbum."
        error={errors.fecha?.message}
        {...register("fecha")}
      />
    </form>
  );
}
