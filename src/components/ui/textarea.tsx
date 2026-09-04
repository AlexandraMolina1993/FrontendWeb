import { useId } from "react";

import type { TextareaHTMLAttributes } from "react";

import {
  textareaBaseStyle,
  textareaDisabledStyle,
  textareaErrorMessageStyle,
  textareaErrorStyle,
  textareaHelpStyle,
  textareaLabelStyle,
  textareaNormalStyle,
  textareaRequiredStyle,
} from "../../shared/styles/textarea.styles.js";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  ayuda?: string;
}

export default function Textarea({
  id,
  label,
  error,
  ayuda,
  className = "",
  required,
  disabled,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const messageId = `${textareaId}-message`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className={textareaLabelStyle}>
          {label}
          {required && <span className={textareaRequiredStyle}>*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error || ayuda ? messageId : undefined}
        className={`${textareaBaseStyle} ${error ? textareaErrorStyle : textareaNormalStyle} ${textareaDisabledStyle} ${className}`}
        {...props}
      />

      {(error || ayuda) && (
        <p
          id={messageId}
          className={error ? textareaErrorMessageStyle : textareaHelpStyle}
        >
          {error ?? ayuda}
        </p>
      )}
    </div>
  );
}
