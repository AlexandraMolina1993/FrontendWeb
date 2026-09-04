import { useId } from "react";

import type { InputHTMLAttributes } from "react";

import {
  checkboxContainerStyle,
  checkboxDescriptionStyle,
  checkboxDisabledLabelStyle,
  checkboxErrorStyle,
  checkboxInputStyle,
  checkboxLabelStyle,
} from "../../shared/styles/checkbox.styles.js";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  descripcion?: string;
  error?: string;
}

export default function Checkbox({
  id,
  label,
  descripcion,
  error,
  className = "",
  disabled,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const messageId = `${checkboxId}-message`;

  return (
    <div>
      <div className={checkboxContainerStyle}>
        <input
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={descripcion || error ? messageId : undefined}
          className={`${checkboxInputStyle} ${className}`}
          {...props}
        />

        <div>
          <label
            htmlFor={checkboxId}
            className={`${checkboxLabelStyle} ${disabled ? checkboxDisabledLabelStyle : ""}`}
          >
            {label}
          </label>

          {(error || descripcion) && (
            <p
              id={messageId}
              className={error ? checkboxErrorStyle : checkboxDescriptionStyle}
            >
              {error ?? descripcion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
