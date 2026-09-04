import { useId } from "react";

import type { InputHTMLAttributes } from "react";

import { Search, X } from "lucide-react";

import {
  searchInputClearStyle,
  searchInputContainerStyle,
  searchInputErrorMessageStyle,
  searchInputErrorStyle,
  searchInputIconStyle,
  searchInputStyle,
} from "../../shared/styles/searchInput.styles.js";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  error?: string;
  onClear?: () => void;
}

export default function SearchInput({
  id,
  value,
  error,
  onClear,
  className = "",
  placeholder = "Buscar...",
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const showClearButton = onClear && String(value ?? "").length > 0;

  return (
    <div className="w-full">
      <div className={searchInputContainerStyle}>
        <Search className={searchInputIconStyle} aria-hidden="true" />
        <input
          id={inputId}
          type="search"
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${searchInputStyle} ${error ? searchInputErrorStyle : ""} ${className}`}
          {...props}
        />

        {showClearButton && (
          <button
            type="button"
            onClick={onClear}
            className={searchInputClearStyle}
            aria-label="Limpiar búsqueda"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className={searchInputErrorMessageStyle}>
          {error}
        </p>
      )}
    </div>
  );
}
