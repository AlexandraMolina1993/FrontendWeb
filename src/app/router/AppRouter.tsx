import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "../../features/Dashboard/views/Dashboard";
import CarrerasAdminPage from "../../features/carreras/pages/CarrerasAdminPage";
import InstitucionalPage from "../../features/institucional/pages/public/InstitucionalPage";
import InstitucionalAdminPage from "../../features/institucional/pages/admin/InstitucionalAdminPage";
import SedesPage from "../../features/sedes/pages/public/SedesPage";
import SedeDetallePage from "../../features/sedes/pages/public/SedeDetallePage";
import SedesAdminPage from "../../features/sedes/pages/admin/SedesAdminPage";
import SedeNuevaPage from "../../features/sedes/pages/admin/SedeNuevaPage";
import PublicacionesAdminPage from "../../features/publicaciones/pages/admin/PublicacionesAdminPage";
import GaleriaAdminPage from "../../features/galeria/pages/admin/GaleriaAdminPage";
import { UsuariosAdminPage } from "../../features/usuarios/pages/UsuariosAdminPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección para la raíz */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Tus rutas actuales */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preinscripciones" element={<Dashboard />} />
        <Route path="/dashboard/componentes" element={<Dashboard />} />
        <Route path="/admin/carreras" element={<CarrerasAdminPage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/sedes" element={<SedesPage />} />
        <Route path="/sedes/:slug" element={<SedeDetallePage />} />
        <Route path="/admin/institucional" element={<InstitucionalAdminPage />} />
        <Route path="/admin/sedes" element={<SedesAdminPage />} />
        <Route path="/admin/sedes/nueva" element={<SedeNuevaPage />} />
  <Route path="/admin/usuarios" element={<UsuariosAdminPage />} />
        <Route path="/admin/noticias" element={<PublicacionesAdminPage />} />
        <Route path="/admin/galeria" element={<GaleriaAdminPage />} />
        <Route path="/admin/galeria/nueva" element={<GaleriaAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

