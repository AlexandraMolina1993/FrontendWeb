import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export const ProtectedRoute = () => {
  // Le preguntamos a nuestro gestor de estado si el usuario está conectado
  const { isAuthenticated } = useAuthStore();

  // Si no está autenticado, lo redirigimos a la página de login.
  // El "replace" evita que el usuario pueda volver atrás usando la flecha del navegador.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizamos la página que solicitó (el Outlet representa las rutas hijas)
  return <Outlet />;
};