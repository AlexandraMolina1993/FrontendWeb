import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      // El error se muestra visualmente gracias al hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {error && (
        <div className="text-red-600 mb-4 font-bold text-sm">{error}</div>
      )}

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-[var(--color-dark,#1A1A1A)]"
        >
          Correo Electrónico
        </label>
        <Input
          placeholder="Ingresa tu correo electrónico"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:[#FFD21A] text-sm"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-[var(--color-dark,#1A1A1A)]"
        >
          Contraseña
        </label>
        <Input
          placeholder="Ingresa tu contraseña"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:[#FFD21A] text-sm"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        {isLoading ? "Verificando datos..." : "Ingresar al sistema"}
      </Button>
    </form>
  );
};
