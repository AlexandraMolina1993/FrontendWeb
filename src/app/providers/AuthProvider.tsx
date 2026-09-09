import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "../stores/auth.store";
import { authApi } from "../../features/auth/services/auth.api";
import { tokenStorage } from "../../features/auth/utils/token-storage";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [estado, setEstado] = useState<"verificando" | "listo" | "error">(
    "verificando",
  );
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;

    const verificarSesion = async () => {
      const token = tokenStorage.getToken();

      if (!token) {
        useAuthStore.getState().logout();
        setEstado("listo");
        return;
      }

      try {
        const usuario = await authApi.getMe();

        if (cancelado) return;

        // Evita restaurar una sesión que cambió durante la consulta.
        if (tokenStorage.getToken() !== token) {
          setEstado("listo");
          return;
        }

        useAuthStore.getState().setCredentials(usuario, token);
        setEstado("listo");
      } catch {
        if (cancelado) return;

        // El interceptor elimina el token si el servidor responde 401.
        if (!tokenStorage.getToken()) {
          setEstado("listo");
          return;
        }

        setEstado("error");
      }
    };

    void verificarSesion();

    return () => {
      cancelado = true;
    };
  }, [intento]);

  if (estado === "verificando") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p role="status">Verificando sesión...</p>
      </div>
    );
  }

  if (estado === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p role="alert">No pudimos verificar tu sesión. Intentá nuevamente.</p>

        <button
          type="button"
          onClick={() => {
            setEstado("verificando");
            setIntento((valor) => valor + 1);
          }}
        >
          Reintentar
        </button>

        <button
          type="button"
          onClick={() => {
            useAuthStore.getState().logout();
            setEstado("listo");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
