import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Image,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Newspaper,
  PackageOpen,
  Users,
  X,
} from "lucide-react";

import type { ReactNode } from "react";

import {
  sidebarAdminAccentStyle,
  sidebarAdminActiveItemStyle,
  sidebarAdminActiveSubmenuItemStyle,
  sidebarAdminBrandButtonStyle,
  sidebarAdminChevronOpenStyle,
  sidebarAdminChevronStyle,
  sidebarAdminClosedStyle,
  sidebarAdminCloseButtonStyle,
  sidebarAdminFooterStyle,
  sidebarAdminHeaderStyle,
  sidebarAdminItemIconStyle,
  sidebarAdminItemStyle,
  sidebarAdminLogoFallbackStyle,
  sidebarAdminLogoStyle,
  sidebarAdminNameStyle,
  sidebarAdminNavStyle,
  sidebarAdminOpenStyle,
  sidebarAdminOverlayStyle,
  sidebarAdminStyle,
  sidebarAdminSubmenuItemStyle,
  sidebarAdminSubmenuStyle,
  sidebarAdminSubtitleStyle,
  sidebarAdminTitleStyle,
} from "../../shared/styles/layouts/navbar.styles";

export interface SidebarSubitem {
  label: string;
  to: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  section?: string;
  to?: string;
  end?: boolean;
  subitems?: SidebarSubitem[];
}

export const sidebarAdminItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    section: "Instituto",
    to: "/dashboard",
    end: true,
    icon: <LayoutDashboard />,
  },
  {
    id: "carreras",
    label: "Carreras",
    to: "/admin/carreras",
    icon: <GraduationCap />,
  },
  {
    id: "preinscripciones",
    label: "Preinscripciones",
    to: "/dashboard/preinscripciones",
    icon: <ClipboardList />,
  },
  {
    id: "institucional",
    label: "Información institucional",
    to: "/admin/institucional",
    icon: <Building2 />,
  },
  {
    id: "galeria",
    label: "Galería",
    section: "Comunicación",
    icon: <Image />,
    subitems: [
      { label: "Agregar fotografías", to: "/admin/galeria/nueva" },
      { label: "Administrar galería", to: "/admin/galeria" },
    ],
  },
  {
    id: "noticias",
    label: "Noticias y actividades",
    to: "/admin/noticias",
    icon: <Newspaper />,
  },
  {
    id: "contacto",
    label: "Contacto",
    to: "/contacto",
    icon: <MessageSquare />,
  },
  {
    id: "sedes",
    label: "Sedes",
    icon: <MapPin />,
    subitems: [
      { label: "Nueva sede", to: "/admin/sedes/nueva" },
      { label: "Ver sedes", to: "/admin/sedes" },
    ],
  },
  {
    id: "usuarios",
    label: "Usuarios",
    icon: <Users />,
    subitems: [
      { label: "Nuevo usuario", to: "/admin/usuarios/nuevo" },
      { label: "Ver usuarios", to: "/admin/usuarios" },
    ],
  },
  {
    id: "componentes",
    label: "Componentes UI",
    section: "Herramientas",
    to: "/dashboard/componentes",
    icon: <PackageOpen />,
  },
];

interface SidebarAdminProps {
  abierto?: boolean;
  cerrar?: () => void;
  items?: SidebarItem[];
  logo?: string;
  nombreInstituto?: string;
  nombreCorto?: string;
  onCerrarSesion?: () => void | Promise<void>;
  rutaLogin?: string;
}

export default function SidebarAdmin({
  abierto = false,
  cerrar,
  items = sidebarAdminItems,
  logo,
  nombreInstituto = "Instituto Superior Villa del Rosario",
  nombreCorto = "ISVDR",
  onCerrarSesion,
  rutaLogin = "/admin/login",
}: SidebarAdminProps) {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  function alternarMenu(id: string) {
    setMenuAbierto((actual) => (actual === id ? null : id));
  }

  async function salir() {
    try {
      setCerrandoSesion(true);
      await onCerrarSesion?.();
      navigate(rutaLogin);
    } finally {
      setCerrandoSesion(false);
    }
  }

  return (
    <>
      {abierto && (
        <button
          type="button"
          className={sidebarAdminOverlayStyle}
          onClick={cerrar}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        id="sidebar-admin"
        className={`${sidebarAdminStyle} ${abierto ? sidebarAdminOpenStyle : sidebarAdminClosedStyle}`}
        aria-label="Navegación administrativa"
      >
        <header className={sidebarAdminHeaderStyle}>
          <div className={sidebarAdminAccentStyle} />

          <button
            type="button"
            onClick={() => {
              navigate("/dashboard");
              cerrar?.();
            }}
            className={sidebarAdminBrandButtonStyle}
          >
            {logo ? (
              <img src={logo} alt="" className={sidebarAdminLogoStyle} />
            ) : (
              <span
                className={sidebarAdminLogoFallbackStyle}
                aria-label={nombreCorto}
              >
                <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
                  <span className="size-3 bg-[#FFD21A]" />
                  <span className="size-3 bg-[#FFD21A]" />
                  <span className="size-3 bg-[#FFD21A]" />
                  <span className="size-3 bg-[#171717]" />
                </span>
              </span>
            )}

            <div className="min-w-0 pr-7 lg:pr-0">
              <p className={sidebarAdminNameStyle}>{nombreInstituto}</p>
              <p className={sidebarAdminSubtitleStyle}>Panel administrativo</p>
            </div>
          </button>

          <button
            type="button"
            onClick={cerrar}
            className={sidebarAdminCloseButtonStyle}
            aria-label="Cerrar menú"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <nav className={sidebarAdminNavStyle}>
          {items.map((item, index) => {
            const tieneSubmenu = Boolean(item.subitems?.length);
            const estaAbierto = menuAbierto === item.id;
            const mostrarSeccion =
              item.section && item.section !== items[index - 1]?.section;

            if (!tieneSubmenu && item.to) {
              return (
                <div key={item.id}>
                  {mostrarSeccion && (
                    <p className={sidebarAdminTitleStyle}>{item.section}</p>
                  )}
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={cerrar}
                    className={({ isActive }) =>
                      `${sidebarAdminItemStyle} ${isActive ? sidebarAdminActiveItemStyle : ""}`
                    }
                  >
                    <span className={sidebarAdminItemIconStyle}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                </div>
              );
            }

            return (
              <div key={item.id}>
                {mostrarSeccion && (
                  <p className={sidebarAdminTitleStyle}>{item.section}</p>
                )}
                <button
                  type="button"
                  onClick={() => alternarMenu(item.id)}
                  className={sidebarAdminItemStyle}
                  aria-expanded={estaAbierto}
                >
                  <span className={sidebarAdminItemIconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`${sidebarAdminChevronStyle} ${estaAbierto ? sidebarAdminChevronOpenStyle : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {estaAbierto && item.subitems && (
                  <div className={sidebarAdminSubmenuStyle}>
                    {item.subitems.map((subitem) => (
                      <NavLink
                        key={subitem.to}
                        to={subitem.to}
                        onClick={cerrar}
                        className={({ isActive }) =>
                          `${sidebarAdminSubmenuItemStyle} ${isActive ? sidebarAdminActiveSubmenuItemStyle : ""}`
                        }
                      >
                        {subitem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <footer className={sidebarAdminFooterStyle}>
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-2.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#FFD21A] text-xs font-black text-[#171717]">
              AD
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                Administración
              </p>
              <p className="truncate text-xs text-slate-400">
                admin@isvdr.edu.ar
              </p>
            </div>
            <button
              type="button"
              onClick={() => void salir()}
              disabled={cerrandoSesion}
              className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-[#FFD21A] hover:text-[#171717] disabled:opacity-50"
              aria-label="Cerrar sesión"
            >
              <LogOut size={17} aria-hidden="true" />
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}
