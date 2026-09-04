import Select from "../../../components/ui/select";
import StatusBadge from "../../../components/ui/statusBadge";

interface CarreraStatusSelectorProps {
  value: boolean;
  onChange: (activa: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const ESTADO_OPCIONES = [
  { value: "true", label: "Publicada" },
  { value: "false", label: "Inactiva" },
];

export default function CarreraStatusSelector({
  value,
  onChange,
  disabled,
  error,
  className = "",
}: CarreraStatusSelectorProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Select
        label="Estado"
        value={String(value)}
        opciones={ESTADO_OPCIONES}
        disabled={disabled}
        error={error}
        placeholder=""
        onChange={(event) => onChange(event.target.value === "true")}
      />
      <StatusBadge
        status={value ? "activo" : "inactivo"}
        label={value ? "Publicada" : "Inactiva"}
        mostrarPunto={false}
      />
    </div>
  );
}
