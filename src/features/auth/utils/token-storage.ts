// Definimos una constante para el nombre de la llave, así evitamos errores de tipeo
const TOKEN_KEY = 'token';

export const tokenStorage = {
  /**
   * Obtiene el token guardado. 
   * (Esta es la función que usa nuestro client.ts para inyectarlo en las peticiones)
   */
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Guarda el token en el navegador tras un inicio de sesión exitoso.
   */
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Borra el token cuando el usuario cierra sesión.
   */
  clearToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  }
};