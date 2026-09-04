import SearchInput from "../../../components/ui/searchInput";

interface CarreraSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function CarreraSearch({
  value,
  onChange,
  onClear,
  placeholder = "Buscar carrera por nombre o título...",
  error,
  className = "",
}: CarreraSearchProps) {
  return (
    <SearchInput
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onClear={onClear ?? (() => onChange(""))}
      placeholder={placeholder}
      error={error}
      className={className}
      aria-label="Buscar carreras"
    />
  );
}
