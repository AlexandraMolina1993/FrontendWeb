import { useId } from "react";

import type { InputHTMLAttributes } from "react";

import {
  inputBaseStyle,
  inputDisabledStyle,
  inputErrorMessageStyle,
  inputErrorStyle,
  inputHelpStyle,
  inputLabelStyle,
  inputNormalStyle,
  inputRequiredStyle,
} from "../../shared/styles/input.syles.js";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ayuda?: string;
}

export default function Input({
  id,
  label,
  error,
  ayuda,
  className = "",
  required,
  disabled,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={inputLabelStyle}>
          {label}
          {required && <span className={inputRequiredStyle}>*</span>}
        </label>
      )}

      <input
        id={inputId}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error || ayuda ? messageId : undefined}
        className={`${inputBaseStyle} ${error ? inputErrorStyle : inputNormalStyle} ${inputDisabledStyle} ${className}`}
        {...props}
      />

      {(error || ayuda) && (
        <p
          id={messageId}
          className={error ? inputErrorMessageStyle : inputHelpStyle}
        >
          {error ?? ayuda}
        </p>
      )}
    </div>
  );
}
