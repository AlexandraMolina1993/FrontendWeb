import { QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router/AppRouter";
import { queryClient } from "../shared/lib/query-client";

export const App = () => {
  return (
    // Aquí más adelante tus compañeros agregarán el AuthProvider si lo necesitan
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};