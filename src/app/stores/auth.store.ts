import { create } from "zustand";
import type { Usuario } from "../../features/auth/types/auth.types";
import { tokenStorage } from "../../features/auth/utils/token-storage";

interface AuthState {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  setCredentials: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  isAuthenticated: false,

  setCredentials: (usuario, token) => {
    if (!token || !usuario?.id) {
      throw new Error("La respuesta de autenticación es inválida.");
    }

    tokenStorage.setToken(token);
    set({ usuario, isAuthenticated: true });
  },

  logout: () => {
    tokenStorage.clearToken();
    set({ usuario: null, isAuthenticated: false });
  },
}));
