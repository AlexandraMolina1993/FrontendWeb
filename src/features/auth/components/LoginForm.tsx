import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el enrutador
import { useAuth } from '../hooks/useAuth';
import '../../../index.css'; 

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate(); // 2. Inicializamos el hook de navegación
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // 3. Forzamos la redirección al panel de administración que creamos
      navigate('/admin/usuarios');
    } catch (err) {
      // El error se muestra visualmente gracias al hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
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