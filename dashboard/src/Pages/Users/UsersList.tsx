import React, { useState, useEffect } from 'react';
import './UsersList.css';

// Definición de la interfaz TypeScript para la entidad Usuario
interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

const UsersList: React.FC = () => {
  // Estados locales para almacenar usuarios, estado de carga y término de búsqueda
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // URL del backend obtenida dinámicamente con fallback local
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // useEffect para consultar la API de usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // Petición GET al endpoint /api/users
        const response = await fetch(`${API_URL}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Guardamos la lista de usuarios en el estado
        } else {
          console.error("El servidor respondió con un error:", response.status);
        }
      } catch (error) {
        console.error("Error de red al intentar conectar con el backend:", error);
      } finally {
        setLoading(false); // Finalizamos el estado de carga
      }
    };

    fetchUsers();
  }, []);

  // Filtrado dinámico en tiempo real por nombre o correo electrónico
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-list-container">
      {/* Encabezado con título y barra de búsqueda */}
      <header className={`products-list-header ${isSearchActive ? 'search-active' : ''}`}>
        <h1 className="header-title">Usuarios Registrados</h1>

        <div className="header-actions">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />
        </div>
      </header>
      {/* Contenido principal: Tabla de usuarios o loader */}
      <div className="products-list-content">
        {loading ? (
          <div className="loading-message">Cargando usuarios...</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td style={{ fontWeight: '600' }}>👤 {user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* Formateo de fecha amigable para el usuario */}
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Mensaje cuando no hay coincidencias en la búsqueda */}
        {!loading && filteredUsers.length === 0 && (
          <div className="no-results-message">
            No se encontraron usuarios que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
