import type { BadgeVariant } from "../../components/ui/badge";

export const badgeBaseStyle =
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none";

export const badgeVariants: Record<BadgeVariant, string> = {
  primary: "border-[#E4B600] bg-[#FFF4BD] text-[#604D00]",
  secondary: "border-slate-300 bg-slate-100 text-slate-700",
  dark: "border-[#171717] bg-[#171717] text-white",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

export const badgeDotStyle = "size-1.5 rounded-full bg-current";
