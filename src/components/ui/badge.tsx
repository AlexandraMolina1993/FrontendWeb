import type { HTMLAttributes, ReactNode } from "react";

import {
  badgeBaseStyle,
  badgeDotStyle,
  badgeVariants,
} from "../../shared/styles/badge.styles.js";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  mostrarPunto?: boolean;
}

export default function Badge({
  children,
  variant = "primary",
  mostrarPunto = false,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`${badgeBaseStyle} ${badgeVariants[variant]} ${className}`}
      {...props}
    >
      {mostrarPunto && <span className={badgeDotStyle} aria-hidden="true" />}
      {children}
    </span>
  );
}
