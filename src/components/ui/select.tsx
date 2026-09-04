import { useId } from "react";

import type { SelectHTMLAttributes } from "react";

import { ChevronDown } from "lucide-react";

import {
  selectBaseStyle,
  selectDisabledStyle,
  selectErrorMessageStyle,
  selectErrorStyle,
  selectHelpStyle,
  selectIconStyle,
  selectLabelStyle,
  selectNormalStyle,
  selectRequiredStyle,
} from "../../shared/styles/select.styles.js";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  ayuda?: string;
  placeholder?: string;
  opciones: SelectOption[];
}

export default function Select({
  id,
  label,
  error,
  ayuda,
  placeholder = "Seleccionar una opción",
  opciones,
  className = "",
  required,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className={selectLabelStyle}>
          {label}
          {required && <span className={selectRequiredStyle}>*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error || ayuda ? messageId : undefined}
          className={`${selectBaseStyle} ${error ? selectErrorStyle : selectNormalStyle} ${selectDisabledStyle} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {opciones.map((opcion) => (
            <option
              key={opcion.value}
              value={opcion.value}
              disabled={opcion.disabled}
            >
              {opcion.label}
            </option>
          ))}
        </select>
        <ChevronDown className={selectIconStyle} aria-hidden="true" />
      </div>

      {(error || ayuda) && (
        <p
          id={messageId}
          className={error ? selectErrorMessageStyle : selectHelpStyle}
        >
          {error ?? ayuda}
        </p>
      )}
    </div>
  );
}
