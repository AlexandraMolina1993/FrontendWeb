import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { PanelLeftOpen } from "lucide-react";

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
  const [sidebarAbierto, setSidebarAbierto] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );

  useEffect(() => {
    const escritorio = window.matchMedia("(min-width: 1024px)");
    const adaptarSidebar = (event: MediaQueryListEvent) => {
      setSidebarAbierto(event.matches);
    };

    escritorio.addEventListener("change", adaptarSidebar);
    return () => escritorio.removeEventListener("change", adaptarSidebar);
  }, []);

  const fechaActual = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const fechaCapitalizada =
    fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1);

  return (
    <div className={adminLayoutStyle}>
      <SidebarAdmin
        abierto={sidebarAbierto}
        cerrar={() => {
          if (!window.matchMedia("(min-width: 1024px)").matches) {
            setSidebarAbierto(false);
          }
        }}
        items={items}
        logo={logo}
        nombreInstituto={nombreInstituto}
        onCerrarSesion={onCerrarSesion}
      />

      <div
        className={`${adminLayoutContentStyle} pt-[74px] ${sidebarAbierto ? "lg:ml-72" : "lg:ml-0"}`}
      >
        <header className={`fixed inset-x-0 top-0 z-30 flex h-[74px] items-center gap-3 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8 ${sidebarAbierto ? "lg:left-72" : "lg:left-0"}`}>
          <button
            type="button"
            onClick={() => setSidebarAbierto((actual) => !actual)}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-zinc-700 transition hover:bg-zinc-100 focus:outline-none focus:ring-4 focus:ring-[#FFD21A]/25"
            aria-label={sidebarAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={sidebarAbierto}
            aria-controls="sidebar-admin"
          >
            <PanelLeftOpen
              size={20}
              className={`transition-transform ${sidebarAbierto ? "rotate-180" : ""}`}
            />
          </button>
          <span className="hidden h-8 w-px bg-zinc-200 sm:block" />
          <p className="hidden whitespace-nowrap text-sm text-zinc-500 sm:block">
            {fechaCapitalizada}
          </p>

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
