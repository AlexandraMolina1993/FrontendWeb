import { Route } from "react-router-dom";
import { UsuariosAdminPage } from "../../features/usuarios/pages/UsuariosAdminPage"; // Ajusta la ruta según dónde tengas tu página

export const AdminRoutes = () => {
  return (
    <>
      <Route key="admin-usuarios" path="/admin/usuarios" element={<UsuariosAdminPage />} />
      {/* Agrega aquí otras rutas de administración si las tienes */}
    </>
  );
};