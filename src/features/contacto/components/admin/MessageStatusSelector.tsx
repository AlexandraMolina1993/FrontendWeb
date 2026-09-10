import type { ContactMessageStatus } from "../../types/contact.types";

export default function MessageStatusSelector({ value, disabled, onChange }: { value: ContactMessageStatus; disabled?: boolean; onChange: (value: ContactMessageStatus) => void }) {
  return <label className="text-sm font-bold text-[#171717]">Estado<select disabled={disabled} value={value} onChange={(event) => onChange(event.target.value as ContactMessageStatus)} className="mt-2 w-full border border-slate-300 bg-white px-3 py-2 font-normal outline-none focus:border-[#C49200]"><option value="NUEVO">Nuevo</option><option value="LEIDO">Leído</option><option value="RESPONDIDO">Respondido</option><option value="ARCHIVADO">Archivado</option></select></label>;
}
