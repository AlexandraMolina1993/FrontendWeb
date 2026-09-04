import type { LoadingSpinnerSize } from "../../components/ui/loadingSpinner.js";

export const loadingSpinnerContainerStyle =
  "inline-flex items-center justify-center gap-2.5 text-slate-600";

export const loadingSpinnerStyle =
  "animate-spin rounded-full border-solid border-slate-200 border-t-[#E4B600]";

export const loadingSpinnerSizes: Record<LoadingSpinnerSize, string> = {
  pequeno: "size-4 border-2",
  mediano: "size-7 border-[3px]",
  grande: "size-11 border-4",
};

export const loadingSpinnerTextStyle = "text-sm font-medium";
