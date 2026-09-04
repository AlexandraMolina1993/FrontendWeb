import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
// Importaremos la página de administración cuando la creemos:
import { UsuariosAdminPage } from '../../features/usuarios/pages/UsuariosAdminPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        {/* Aquí tus compañeros de los otros módulos agregarán la página de Inicio, Carreras, etc. */}
        <Route path="/login" element={<LoginPage />} />

        {/* RUTAS PROTEGIDAS (Solo accesibles si estás logueado) */}
        <Route element={<ProtectedRoute />}>
          {/* Cuando crees el componente UsuariosAdminPage, descomenta esta línea: */}
          {<Route path="/admin/usuarios" element={<UsuariosAdminPage />} />}
          
          {/* Ruta temporal para probar que funciona el login */}
          <Route path="/admin" element={<div style={{ padding: '2rem' }}>¡Bienvenido al panel de administración!</div>} />
        </Route>

        {/* REDIRECCIÓN POR DEFECTO: Si escriben una URL que no existe, los mandamos al inicio o al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};