import { CircleAlert, RefreshCw } from "lucide-react";

import {
  errorStateButtonStyle,
  errorStateContainerStyle,
  errorStateDescriptionStyle,
  errorStateIconStyle,
  errorStateTitleStyle,
} from "../../shared/styles/error-state.styles.js";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export default function ErrorState({
  title = "Ocurrió un error",
  description = "No pudimos cargar la información. Intentá nuevamente.",
  onRetry,
  retryLabel = "Reintentar",
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`${errorStateContainerStyle} ${className}`} role="alert">
      <div className={errorStateIconStyle} aria-hidden="true">
        <CircleAlert size={27} />
      </div>
      <h3 className={errorStateTitleStyle}>{title}</h3>
      <p className={errorStateDescriptionStyle}>{description}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={errorStateButtonStyle}
        >
          <RefreshCw size={16} aria-hidden="true" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}
