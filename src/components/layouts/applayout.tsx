import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Bell, ChevronDown, PanelLeftOpen, Search } from "lucide-react";

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
        cerrar={() => setSidebarAbierto(false)}
        items={items}
        logo={logo}
        nombreInstituto={nombreInstituto}
        onCerrarSesion={onCerrarSesion}
      />

      <div
        className={`${adminLayoutContentStyle} ${sidebarAbierto ? "lg:ml-72" : "lg:ml-0"}`}
      >
        <header className="sticky top-0 z-30 flex h-[74px] items-center gap-3 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
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

          <div className="ml-auto hidden w-full max-w-sm items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-zinc-500 lg:flex">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              aria-label="Buscar en esta sección"
              placeholder="Buscar en esta sección..."
              className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-500"
            />
          </div>

          <button
            type="button"
            className="relative ml-auto grid size-10 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition hover:border-[#E4B600] hover:bg-[#FFD21A] lg:ml-0"
            aria-label="Ver notificaciones"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#E4B600]" />
          </button>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-zinc-100"
            aria-label="Abrir menú de administración"
          >
            <span className="grid size-9 place-items-center rounded-full bg-[#171717] text-xs font-black text-white">AD</span>
            <span className="hidden text-sm font-bold text-zinc-900 md:block">Administración</span>
            <ChevronDown className="hidden text-zinc-400 md:block" size={16} />
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
