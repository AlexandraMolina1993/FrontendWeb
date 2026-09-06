import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import Dashboard from "../../features/Dashboard/views/Dashboard";
import CarrerasAdminPage from "../../features/carreras/pages/CarrerasAdminPage";
import InstitucionalPage from "../../features/institucional/pages/public/InstitucionalPage";
import InstitucionalAdminPage from "../../features/institucional/pages/admin/InstitucionalAdminPage";
import SedesPage from "../../features/sedes/pages/public/SedesPage";
import SedeDetallePage from "../../features/sedes/pages/public/SedeDetallePage";
import SedesAdminPage from "../../features/sedes/pages/admin/SedesAdminPage";
import SedeNuevaPage from "../../features/sedes/pages/admin/SedeNuevaPage";
import PublicacionesAdminPage from "../../features/publicaciones/pages/admin/PublicacionesAdminPage";
import ActividadesPage from "../../features/publicaciones/pages/public/ActividadesPage";
import NoticiasPage from "../../features/publicaciones/pages/public/NoticiasPage";
import PublicacionDetallePage from "../../features/publicaciones/pages/public/PublicacionDetallePage";
import GaleriaAdminPage from "../../features/galeria/pages/admin/GaleriaAdminPage";
import AlbumDetallePage from "../../features/galeria/pages/public/AlbumDetallePage";
import GaleriaPage from "../../features/galeria/pages/public/GaleriaPage";
import { UsuariosAdminPage } from "../../features/usuarios/pages/UsuariosAdminPage";
import HomePage from "../../features/home/pages/HomePage";
import ContactoPage from "../../features/contacto/pages/public/ContactoPage";
import ContactoAdminPage from "../../features/contacto/pages/admin/ContactoAdminPage";
import NotFoundPage from "../../shared/pages/NotFoundPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/carreras" element={<CarrerasAdminPage />} />
        <Route path="/noticias" element={<NoticiasPage />} />
        <Route path="/noticias/:id" element={<PublicacionDetallePage />} />
        <Route path="/actividades" element={<ActividadesPage />} />
        <Route path="/galeria" element={<GaleriaPage />} />
        <Route path="/galeria/:slug" element={<AlbumDetallePage />} />
        
        <Route path="/institucional" element={<InstitucionalPage />} />
        <Route path="/sedes" element={<SedesPage />} />
        <Route path="/sedes/:slug" element={<SedeDetallePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/preinscripciones" element={<Dashboard />} />
            <Route path="/dashboard/componentes" element={<Dashboard />} />
            <Route path="/admin/carreras" element={<CarrerasAdminPage />} />
            <Route path="/admin/institucional" element={<InstitucionalAdminPage />} />
            <Route path="/admin/sedes" element={<SedesAdminPage />} />
            <Route path="/admin/sedes/nueva" element={<SedeNuevaPage />} />
            <Route path="/admin/usuarios" element={<UsuariosAdminPage />} />
            <Route path="/admin/contacto" element={<ContactoAdminPage />} />
            <Route path="/admin/noticias" element={<PublicacionesAdminPage />} />
            <Route path="/admin/galeria" element={<GaleriaAdminPage />} />
            <Route path="/admin/galeria/nueva" element={<GaleriaAdminPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

