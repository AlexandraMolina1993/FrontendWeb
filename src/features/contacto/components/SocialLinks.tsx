import { Link2, MessageCircle } from "lucide-react";
import type { ContactInformation } from "../types/contact.types";

export default function SocialLinks({ information }: { information: ContactInformation }) {
  const links = [{ label: "Instagram", href: information.instagram, icon: <Link2 size={19} /> }, { label: "Facebook", href: information.facebook, icon: <Link2 size={19} /> }, { label: "WhatsApp", href: information.whatsapp, icon: <MessageCircle size={19} /> }].filter((link) => link.href);
  if (!links.length) return null;
  return <div className="flex flex-wrap gap-3">{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="inline-flex items-center gap-2 border border-slate-300 px-3 py-2 text-sm font-bold text-[#171717] hover:border-[#C49200] hover:text-[#C49200]">{link.icon}{link.label}</a>)}</div>;
}
