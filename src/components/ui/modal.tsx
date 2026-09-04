import { useEffect, useId } from "react";

import type { ReactNode } from "react";

import { X } from "lucide-react";

export type TamanoModal = "pequeno" | "mediano" | "grande" | "completo";

type ModalProps = {
  abierto: boolean;
  titulo: string;
  cerrar: () => void;
  children: ReactNode;

  descripcion?: string;
  icono?: ReactNode;
  pie?: ReactNode;
  tamano?: TamanoModal;
  cerrarAlHacerClickFuera?: boolean;
  mostrarBotonCerrar?: boolean;
  className?: string;
  contenidoClassName?: string;
};

const tamanos: Record<TamanoModal, string> = {
  pequeno: "max-w-lg",
  mediano: "max-w-3xl",
  grande: "max-w-6xl",
  completo: "max-w-[1500px]",
};

export default function Modal({
  abierto,
  titulo,
  cerrar,
  children,
  descripcion,
  icono,
  pie,
  tamano = "mediano",
  cerrarAlHacerClickFuera = true,
  mostrarBotonCerrar = true,
  className = "",
  contenidoClassName = "",
}: ModalProps) {
  const tituloId = useId();
  const descripcionId = useId();

  useEffect(() => {
    if (!abierto) return;

    const overflowAnterior = document.body.style.overflow;

    const cerrarConEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        cerrar();
      }
    };

    document.addEventListener("keydown", cerrarConEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", cerrarConEscape);
      document.body.style.overflow = overflowAnterior;
    };
  }, [abierto, cerrar]);

  if (!abierto) return null;

  const manejarClickFondo = () => {
    if (cerrarAlHacerClickFuera) {
      cerrar();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#171717]/70
        p-3
        backdrop-blur-sm
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby={tituloId}
      aria-describedby={descripcion ? descripcionId : undefined}
      onMouseDown={manejarClickFondo}
    >
      <div
        className={`
          flex
          max-h-[90vh]
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-zinc-300
          bg-white
          shadow-2xl
          ${tamanos[tamano]}
          ${className}
        `}
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        {/* Detalle amarillo superior */}
        <div className="h-1.5 shrink-0 bg-[#FFD21A]" />

        {/* Encabezado */}
        <header
          className="
            shrink-0
            border-b
            border-zinc-800
            bg-[#171717]
            px-5
            py-4
            text-white
            sm:px-6
          "
        >
          <div className="flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-3">
              {icono && (
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FFD21A]
                    text-[#171717]
                  "
                  aria-hidden="true"
                >
                  {icono}
                </span>
              )}

              <div className="min-w-0">
                <h2 id={tituloId} className="text-xl font-bold tracking-tight">
                  {titulo}
                </h2>

                {descripcion && (
                  <p
                    id={descripcionId}
                    className="mt-1 text-sm leading-5 text-zinc-400"
                  >
                    {descripcion}
                  </p>
                )}
              </div>
            </div>

            {mostrarBotonCerrar && (
              <button
                type="button"
                onClick={cerrar}
                className="
                  grid
                  h-10
                  w-10
                  shrink-0
                  place-items-center
                  rounded-xl
                  border
                  border-white/15
                  bg-white/5
                  text-zinc-300
                  transition-all
                  duration-200

                  hover:border-[#FFD21A]
                  hover:bg-[#FFD21A]
                  hover:text-[#171717]

                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#FFD21A]/30

                  active:scale-95
                "
                aria-label="Cerrar modal"
              >
                <X size={20} aria-hidden="true" />
              </button>
            )}
          </div>
        </header>

        {/* Contenido */}
        <div
          className={`
            min-h-0
            flex-1
            overflow-y-auto
            bg-[#F5F5F6]
            p-4
            [scrollbar-color:#a1a1aa_transparent]
            [scrollbar-width:thin]
            sm:p-6
            ${contenidoClassName}
          `}
        >
          {children}
        </div>

        {/* Pie */}
        {pie && (
          <footer
            className="
              shrink-0
              border-t
              border-zinc-200
              bg-white
              px-4
              py-4
              sm:px-6
            "
          >
            {pie}
          </footer>
        )}
      </div>
    </div>
  );
}
