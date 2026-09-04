import type { TamanoModal } from "../../components/ui/modal.js";

export const modalSizes: Record<TamanoModal, string> = {
  pequeno: "max-w-lg",
  mediano: "max-w-3xl",
  grande: "max-w-6xl",
  completo: "max-w-[1500px]",
};

export const modalOverlayStyle =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6";

export const modalContainerStyle =
  "relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl";

export const modalAccentStyle = "absolute inset-x-0 top-0 h-1 bg-[#FFD21A]";

export const modalHeaderStyle =
  "flex shrink-0 items-start justify-between gap-5 border-b border-slate-200 bg-white px-5 py-5 sm:px-6";

export const modalTitleStyle = "text-lg font-bold text-[#171717]";

export const modalDescriptionStyle = "mt-1 text-sm text-slate-500";

export const modalCloseButtonStyle =
  "grid size-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 outline-none transition hover:border-[#E4B600] hover:bg-[#FFD21A] hover:text-[#171717] focus:ring-4 focus:ring-[#FFD21A]/25";

export const modalContentStyle =
  "min-h-0 flex-1 overflow-y-auto bg-slate-50 p-4 [scrollbar-color:rgb(148_163_184)_transparent] [scrollbar-width:thin] sm:p-6";

export const modalFooterStyle =
  "shrink-0 border-t border-slate-200 bg-white px-4 py-4 sm:px-6";
