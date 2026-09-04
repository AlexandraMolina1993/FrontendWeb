import type { HTMLAttributes, ReactNode } from "react";

import {
  cardAccentStyle,
  cardBaseStyle,
  cardContentStyle,
  cardDescriptionStyle,
  cardFooterStyle,
  cardHeaderStyle,
  cardInteractiveStyle,
  cardTitleStyle,
} from "../../shared/styles/card.styles.js";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  titulo?: string;
  descripcion?: string;
  pie?: ReactNode;
  destacada?: boolean;
  interactiva?: boolean;
  contenidoClassName?: string;
}

export default function Card({
  children,
  titulo,
  descripcion,
  pie,
  destacada = false,
  interactiva = false,
  className = "",
  contenidoClassName = "",
  ...props
}: CardProps) {
  return (
    <article
      className={`${cardBaseStyle} ${destacada ? cardAccentStyle : ""} ${interactiva ? cardInteractiveStyle : ""} ${className}`}
      {...props}
    >
      {(titulo || descripcion) && (
        <header className={cardHeaderStyle}>
          {titulo && <h3 className={cardTitleStyle}>{titulo}</h3>}
          {descripcion && <p className={cardDescriptionStyle}>{descripcion}</p>}
        </header>
      )}

      <div className={`${cardContentStyle} ${contenidoClassName}`}>
        {children}
      </div>

      {pie && <footer className={cardFooterStyle}>{pie}</footer>}
    </article>
  );
}
