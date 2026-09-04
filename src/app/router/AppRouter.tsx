import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../../features/Dashboard/views/Dashboard";
import CarrerasAdminPage from "../../features/carreras/pages/CarrerasAdminPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preinscripciones" element={<Dashboard />} />
        <Route path="/dashboard/componentes" element={<Dashboard />} />
        <Route path="/admin/carreras" element={<CarrerasAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};
