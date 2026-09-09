import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../app/stores/auth.store';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-gray,#F4F4F4)]">
      <div className="bg-[var(--color-light,#FFFFFF)] p-12 px-8 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] w-full max-w-[400px]">
        <div className="text-center mb-8">
          {/* Aquí tus compañeros podrán reutilizar el logo real después */}
          <h2 className="text-[var(--color-dark,#1A1A1A)] mb-2 text-xl font-bold">
            Acceso al Sistema
          </h2>
          <p className="text-[#666] text-sm">
            Ingresa tus credenciales para continuar
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};