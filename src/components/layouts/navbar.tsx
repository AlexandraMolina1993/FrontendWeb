import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Building2,
  ChevronDown,
  GraduationCap,
  Image,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
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
  sidebarAdminLogoutButtonStyle,
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
  to?: string;
  end?: boolean;
  subitems?: SidebarSubitem[];
}

export const sidebarAdminItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    to: "/admin",
    end: true,
    icon: <LayoutDashboard />,
  },
  {
    id: "carreras",
    label: "Carreras",
    icon: <GraduationCap />,
    subitems: [
      { label: "Nueva carrera", to: "/admin/carreras/nueva" },
      { label: "Ver carreras", to: "/admin/carreras" },
    ],
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
    icon: <Image />,
    subitems: [
      { label: "Agregar fotografías", to: "/admin/galeria/nueva" },
      { label: "Administrar galería", to: "/admin/galeria" },
    ],
  },
  {
    id: "contacto",
    label: "Contacto",
    to: "/admin/contacto",
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
        className={`${sidebarAdminStyle} ${abierto ? sidebarAdminOpenStyle : sidebarAdminClosedStyle}`}
        aria-label="Navegación administrativa"
      >
        <header className={sidebarAdminHeaderStyle}>
          <div className={sidebarAdminAccentStyle} />

          <button
            type="button"
            onClick={() => {
              navigate("/admin");
              cerrar?.();
            }}
            className={sidebarAdminBrandButtonStyle}
          >
            {logo ? (
              <img src={logo} alt="" className={sidebarAdminLogoStyle} />
            ) : (
              <span className={sidebarAdminLogoFallbackStyle}>
                {nombreCorto}
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
          <p className={sidebarAdminTitleStyle}>Menú principal</p>

          {items.map((item) => {
            const tieneSubmenu = Boolean(item.subitems?.length);
            const estaAbierto = menuAbierto === item.id;

            if (!tieneSubmenu && item.to) {
              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  end={item.end}
                  onClick={cerrar}
                  className={({ isActive }) =>
                    `${sidebarAdminItemStyle} ${isActive ? sidebarAdminActiveItemStyle : ""}`
                  }
                >
                  <span className={sidebarAdminItemIconStyle}>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            return (
              <div key={item.id}>
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
          <button
            type="button"
            onClick={() => void salir()}
            disabled={cerrandoSesion}
            className={sidebarAdminLogoutButtonStyle}
          >
            <LogOut size={17} aria-hidden="true" />
            {cerrandoSesion ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </footer>
      </aside>
    </>
  );
}
