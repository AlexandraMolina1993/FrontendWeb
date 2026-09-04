import { create } from 'zustand';
import type { Usuario } from '../../features/auth/types/auth.types';
import { tokenStorage } from '../../features/auth/utils/token-storage';

// Definimos qué datos va a guardar nuestro estado global
interface AuthState {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  setCredentials: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

// Creamos el "store" (la caja fuerte donde guardamos la sesión)
export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  isAuthenticated: false,
  
  // Esta función se llamará cuando el usuario inicie sesión con éxito
  setCredentials: (usuario, token) => {
    tokenStorage.setToken(token); // Guardamos el token en el navegador
    set({ usuario, isAuthenticated: true }); // Guardamos el usuario en la memoria de React
  },
  
  // Esta función se llamará cuando el usuario haga clic en "Cerrar Sesión"
  logout: () => {
    tokenStorage.clearToken(); // Borramos el token del navegador
    set({ usuario: null, isAuthenticated: false }); // Limpiamos la memoria de React
  },
}));