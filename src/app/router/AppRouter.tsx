import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import Dashboard from "../../features/Dashboard/views/Dashboard";
import CarreraDetallePage from "../../features/carreras/pages/CarreraDetallePage";
import CarrerasAdminPage from "../../features/carreras/pages/CarrerasAdminPage";
import CarrerasPage from "../../features/carreras/pages/CarrerasPage";
import InstitucionalPage from "../../features/institucional/pages/public/InstitucionalPage";
import InstitucionalAdminPage from "../../features/institucional/pages/admin/InstitucionalAdminPage";
import SedesPage from "../../features/sedes/pages/public/SedesPage";
import SedeDetallePage from "../../features/sedes/pages/public/SedeDetallePage";
import SedesAdminPage from "../../features/sedes/pages/admin/SedesAdminPage";
import SedeNuevaPage from "../../features/sedes/pages/admin/SedeNuevaPage";
import PublicacionesAdminPage from "../../features/publicaciones/pages/admin/PublicacionesAdminPage";
import GaleriaAdminPage from "../../features/galeria/pages/admin/GaleriaAdminPage";
import { UsuariosAdminPage } from "../../features/usuarios/pages/UsuariosAdminPage";
import ContactoPage from "../../features/contacto/pages/public/ContactoPage";
import PreinscripcionesPage from "../../features/preinscripciones/pages/PreinscripcionesPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/preinscripciones" element={<PreinscripcionesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preinscripciones" element={<Dashboard />} />
        <Route path="/dashboard/contacto" element={<Dashboard />} />
        <Route path="/dashboard/componentes" element={<Dashboard />} />
        <Route path="/carreras" element={<CarrerasPage />} />
        <Route path="/carreras/:id" element={<CarreraDetallePage />} />
        <Route path="/admin/carreras" element={<CarrerasAdminPage />} />
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/sedes" element={<SedesPage />} />
        <Route path="/sedes/:slug" element={<SedeDetallePage />} />
        <Route
          path="/admin/institucional"
          element={<InstitucionalAdminPage />}
        />
        <Route path="/admin/sedes" element={<SedesAdminPage />} />
        <Route path="/admin/sedes/nueva" element={<SedeNuevaPage />} />
        <Route path="/admin/usuarios" element={<UsuariosAdminPage />} />
        <Route path="/admin/noticias" element={<PublicacionesAdminPage />} />
        <Route path="/admin/galeria" element={<GaleriaAdminPage />} />
        <Route path="/admin/galeria/nueva" element={<GaleriaAdminPage />} />
        <Route
          path="/admin/contacto"
          element={<Navigate to="/dashboard/contacto" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
