import { useEffect, useState } from 'react';
import { usuarioApi } from '../services/usuario.api';
import type { Usuario } from '../../auth/types/auth.types';

export const UsuariosAdminPage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargamos la lista de usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setIsLoading(true);
        const data = await usuarioApi.obtenerTodos();
        setUsuarios(data);
      } catch (err) {
        setError('No se pudo cargar la lista de usuarios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando usuarios...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#1A1A1A' }}>Panel de Administración de Usuarios</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '1rem' }}>ID</th>
              <th style={{ padding: '1rem' }}>Correo Electrónico</th>
              <th style={{ padding: '1rem' }}>Rol</th>
              <th style={{ padding: '1rem' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              usuarios.map((usuario: any) => (
                <tr key={usuario.id || usuario._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem', color: '#555' }}>{usuario.id || usuario._id}</td>
                  <td style={{ padding: '1rem' }}>{usuario.email}</td>
                  <td style={{ padding: '1rem' }}>{usuario.rol || 'Usuario'}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.85rem',
                      backgroundColor: usuario.activo !== false ? '#e6f4ea' : '#fce8e6',
                      color: usuario.activo !== false ? '#137333' : '#c5221f'
                    }}>
                      {usuario.activo !== false ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};