import { useEffect, useId, useRef, useState } from "react";

import type { ReactNode } from "react";

import {
  dropdownContainerStyle,
  dropdownDangerItemStyle,
  dropdownIconStyle,
  dropdownItemStyle,
  dropdownMenuStyle,
  dropdownSeparatorStyle,
  dropdownTriggerStyle,
} from "../../shared/styles/dropDown-menu.styles.js";

export interface DropdownMenuItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  separatorBefore?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  ariaLabel?: string;
  className?: string;
}

export default function DropdownMenu({
  trigger,
  items,
  ariaLabel = "Abrir menú",
  className = "",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${dropdownContainerStyle} ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={dropdownTriggerStyle}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
      >
        {trigger}
      </button>

      {open && (
        <div id={menuId} role="menu" className={dropdownMenuStyle}>
          {items.map((item) => (
            <div key={item.id}>
              {item.separatorBefore && (
                <div className={dropdownSeparatorStyle} role="separator" />
              )}
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={`${dropdownItemStyle} ${item.danger ? dropdownDangerItemStyle : ""}`}
              >
                {item.icon && (
                  <span className={dropdownIconStyle}>{item.icon}</span>
                )}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
