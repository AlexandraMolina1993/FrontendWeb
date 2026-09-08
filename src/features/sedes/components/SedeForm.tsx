import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import type { SedeFormValues } from "../schemas/sede.schema";

export default function SedeForm({ values, onChange, onSubmit, guardando }: { values: SedeFormValues; onChange: (values: SedeFormValues) => void; onSubmit: () => void; guardando?: boolean }) {
  const cambiar = (field: keyof SedeFormValues, value: string | boolean) => onChange({ ...values, [field]: value });
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="space-y-5 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nombre" required value={values.nombre} onChange={(event) => cambiar("nombre", event.target.value)} />
        <Input label="Dirección" required value={values.direccion} onChange={(event) => cambiar("direccion", event.target.value)} />
        <Input label="Ciudad" required value={values.ciudad} onChange={(event) => cambiar("ciudad", event.target.value)} />
        <Input label="Provincia" value={values.provincia} onChange={(event) => cambiar("provincia", event.target.value)} />
        <Input label="Teléfono" value={values.telefono} onChange={(event) => cambiar("telefono", event.target.value)} />
        <Input label="Correo electrónico" type="email" value={values.email} onChange={(event) => cambiar("email", event.target.value)} />
      </div>
      <Button type="submit" disabled={guardando} className="w-full">{guardando ? "Guardando..." : "Guardar sede"}</Button>
    </form>
  );
}