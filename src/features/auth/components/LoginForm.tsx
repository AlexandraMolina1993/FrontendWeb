import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../../../index.css'; // Aseguramos que tome los estilos globales

export const LoginForm = () => {
  // Solo importamos lo que necesitamos de nuestro hook
  const { login, isLoading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Si el login es exitoso, el enrutador detectará el cambio de estado 
      // automáticamente y redirigirá al usuario.
    } catch (err) {
      // El error ya se maneja y se muestra visualmente gracias al estado 'error' del hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Mostrar error si las credenciales son incorrectas */}
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading} 
        className="btn-primary"
        style={{ width: '100%', padding: '1rem' }}
      >
        {isLoading ? 'Verificando datos...' : 'Ingresar al sistema'}
      </button>
    </form>
  );
};