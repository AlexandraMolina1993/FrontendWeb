import { QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router/AppRouter";
import { queryClient } from "../shared/lib/query-client";
import { AuthProvider } from "./providers/AuthProvider";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
};