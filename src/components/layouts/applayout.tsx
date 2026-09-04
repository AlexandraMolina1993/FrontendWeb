import { useState } from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import FooterAdmin from "./footer";
import SidebarAdmin from "./navbar";
import type { SidebarItem } from "./navbar";

import {
  adminLayoutContainerStyle,
  adminLayoutContentStyle,
  adminLayoutMainStyle,
  adminLayoutStyle,
} from "../../shared/styles/layouts/applayout.style";

interface AdminLayoutProps {
  children?: ReactNode;
  items?: SidebarItem[];
  logo?: string;
  nombreInstituto?: string;
  onCerrarSesion?: () => void | Promise<void>;
}

export default function AdminLayout({
  children,
  items,
  logo,
  nombreInstituto,
  onCerrarSesion,
}: AdminLayoutProps) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className={adminLayoutStyle}>
      <SidebarAdmin
        abierto={sidebarAbierto}
        cerrar={() => setSidebarAbierto(false)}
        items={items}
        logo={logo}
        nombreInstituto={nombreInstituto}
        onCerrarSesion={onCerrarSesion}
      />

      <div className={adminLayoutContentStyle}>
        <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarAbierto(true)}
            className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-700 hover:border-[#E4B600] hover:bg-[#FFD21A]"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
        </header>

        <main className={adminLayoutMainStyle}>
          <div className={adminLayoutContainerStyle}>
            {children ?? <Outlet />}
          </div>
        </main>

        <FooterAdmin nombreInstituto={nombreInstituto} />
      </div>
    </div>
  );
}
