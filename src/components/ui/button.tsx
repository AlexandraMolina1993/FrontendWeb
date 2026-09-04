import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "correct";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    border border-[#E4B600]
    bg-[#FFD21A]
    text-[#171717]
    shadow-sm
    hover:border-[#D5A900]
    hover:bg-[#F0C400]
    focus:ring-[#FFD21A]/30
  `,

  secondary: `
    border border-[#171717]
    bg-[#171717]
    text-white
    shadow-sm
    hover:bg-[#2A2A2A]
    focus:ring-black/20
  `,

  danger: `
    border border-red-700
    bg-red-600
    text-white
    shadow-sm
    hover:bg-red-700
    focus:ring-red-500/25
  `,

  correct: `
    border border-emerald-700
    bg-emerald-600
    text-white
    shadow-sm
    hover:bg-emerald-700
    focus:ring-emerald-500/25
  `,
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        h-11
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        text-sm
        font-semibold
        transition-all
        duration-200

        focus:outline-none
        focus:ring-4

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:active:scale-100

        [&_svg]:size-4
        [&_svg]:shrink-0

        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
