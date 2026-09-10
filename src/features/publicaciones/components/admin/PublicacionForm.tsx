import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Checkbox from "../../../../components/ui/checkbox";
import Input from "../../../../components/ui/input";
import Select from "../../../../components/ui/select";
import Textarea from "../../../../components/ui/textarea";
import {
  CrearPublicacionSchema,
  type CrearPublicacionFormValues,
} from "../../schemas/publicacion.schema";

interface Props {
  formId: string;
  valoresIniciales?: Partial<CrearPublicacionFormValues>;
  onSubmit: (valores: CrearPublicacionFormValues) => void;
}

const OPCIONES_TIPO = [
  { value: "NOTICIA", label: "Noticia" },
  { value: "EVENTO", label: "Evento" },
];

export function PublicacionForm({
  formId,
  valoresIniciales,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CrearPublicacionFormValues>({
    resolver: zodResolver(CrearPublicacionSchema),
    defaultValues: { tipo: "NOTICIA", ...valoresIniciales },
  });

  // La API sólo acepta fechaEvento en publicaciones de tipo evento.
  const esEvento = watch("tipo") === "EVENTO";

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

      <Select
        label="Tipo"
        required
        placeholder=""
        opciones={OPCIONES_TIPO}
        error={errors.tipo?.message}
        {...register("tipo")}
      />

      <Textarea
        label="Resumen"
        rows={2}
        required
        ayuda="Texto corto que se muestra en el listado."
        error={errors.resumen?.message}
        {...register("resumen")}
      />

      <Textarea
        label="Contenido"
        rows={6}
        required
        error={errors.contenido?.message}
        {...register("contenido")}
      />

      <Input
        label="URL de imagen"
        required
        placeholder="https://..."
        error={errors.imagenUrl?.message}
        {...register("imagenUrl")}
      />

      {esEvento && (
        <Input
          label="Fecha del evento"
          type="date"
          required
          ayuda="Obligatoria para los eventos."
          error={errors.fechaEvento?.message}
          {...register("fechaEvento")}
        />
      )}

      <Checkbox
        label="Destacar esta publicación"
        descripcion="Las publicaciones destacadas se muestran primero."
        error={errors.destacada?.message}
        {...register("destacada")}
      />
    </form>
  );
}
