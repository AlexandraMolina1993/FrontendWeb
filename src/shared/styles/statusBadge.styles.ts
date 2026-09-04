import type { StatusBadgeVariant } from "../../components/ui/statusBadge.js";

export const statusBadgeBaseStyle =
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none";

export const statusBadgeDotStyle = "size-1.5 rounded-full bg-current";

export const statusBadgeVariants: Record<StatusBadgeVariant, string> = {
  activo: "border-emerald-200 bg-emerald-50 text-emerald-700",
  inactivo: "border-slate-300 bg-slate-100 text-slate-600",
  pendiente: "border-amber-200 bg-amber-50 text-amber-700",
  borrador: "border-slate-300 bg-white text-slate-600",
  publicado: "border-blue-200 bg-blue-50 text-blue-700",
  rechazado: "border-red-200 bg-red-50 text-red-700",
};

export const statusBadgeLabels: Record<StatusBadgeVariant, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
  pendiente: "Pendiente",
  borrador: "Borrador",
  publicado: "Publicado",
  rechazado: "Rechazado",
};
