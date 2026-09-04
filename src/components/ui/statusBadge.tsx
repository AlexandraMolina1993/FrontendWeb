import type { HTMLAttributes } from "react";

import {
  statusBadgeBaseStyle,
  statusBadgeDotStyle,
  statusBadgeLabels,
  statusBadgeVariants,
} from "../../shared/styles/statusBadge.styles.js";

export type StatusBadgeVariant =
  | "activo"
  | "inactivo"
  | "pendiente"
  | "borrador"
  | "publicado"
  | "rechazado";

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusBadgeVariant;
  label?: string;
  mostrarPunto?: boolean;
}

export default function StatusBadge({
  status,
  label,
  mostrarPunto = true,
  className = "",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`${statusBadgeBaseStyle} ${statusBadgeVariants[status]} ${className}`}
      {...props}
    >
      {mostrarPunto && (
        <span className={statusBadgeDotStyle} aria-hidden="true" />
      )}
      {label ?? statusBadgeLabels[status]}
    </span>
  );
}
