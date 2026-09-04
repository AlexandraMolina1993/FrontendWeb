import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'var(--color-gray, #F4F4F4)' 
    }}>
      <div style={{ 
        backgroundColor: 'var(--color-light, #FFFFFF)', 
        padding: '3rem 2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {/* Aquí tus compañeros podrán reutilizar el logo real después */}
          <h2 style={{ color: 'var(--color-dark, #1A1A1A)', marginBottom: '0.5rem' }}>
            Acceso al Sistema
          </h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Ingresa tus credenciales para continuar
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};