import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../../features/Dashboard/views/Dashboard";
import CarreraDetallePage from "../../features/carreras/pages/CarreraDetallePage";
import CarrerasAdminPage from "../../features/carreras/pages/CarrerasAdminPage";
import CarrerasPage from "../../features/carreras/pages/CarrerasPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preinscripciones" element={<Dashboard />} />
        <Route path="/dashboard/componentes" element={<Dashboard />} />
        <Route path="/carreras" element={<CarrerasPage />} />
        <Route path="/carreras/:id" element={<CarreraDetallePage />} />
        <Route path="/admin/carreras" element={<CarrerasAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};
