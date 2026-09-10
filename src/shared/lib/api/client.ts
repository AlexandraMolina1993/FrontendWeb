import axios from "axios";
import { useAuthStore } from "../../../app/stores/auth.store";
import { tokenStorage } from "../../../features/auth/utils/token-storage";

export const API_URL = import.meta.env.VITE_API_URL;
export const API_DOCS_URL = import.meta.env.VITE_API_DOCS_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const token = tokenStorage.getToken();
      const authorization = error.config?.headers?.Authorization;
      const esLogin = error.config?.url === "/usuarios/login";

      if (!esLogin && token && authorization === `Bearer ${token}`) {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);
