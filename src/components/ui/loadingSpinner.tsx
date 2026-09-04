import {
  loadingSpinnerContainerStyle,
  loadingSpinnerSizes,
  loadingSpinnerStyle,
  loadingSpinnerTextStyle,
} from "../../shared/styles/loading-spinner.styles.js";

export type LoadingSpinnerSize = "pequeno" | "mediano" | "grande";

interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = "mediano",
  text,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${loadingSpinnerContainerStyle} ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className={`${loadingSpinnerStyle} ${loadingSpinnerSizes[size]}`}
        aria-hidden="true"
      />
      {text ? (
        <span className={loadingSpinnerTextStyle}>{text}</span>
      ) : (
        <span className="sr-only">Cargando</span>
      )}
    </div>
  );
}
