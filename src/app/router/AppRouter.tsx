import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../features/Dashboard/views/Dashboard";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/preinscripciones" element={<Dashboard />} />
        <Route path="/dashboard/componentes" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
