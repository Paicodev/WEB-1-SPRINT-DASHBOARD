import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom'; // Importación necesaria para la navegación
import './Layout.css'; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    // Estado para controla si el sidebar esta visible en moviles
    const [isSidebarVisibleOpen, setSidebarOpen] = useState(false);

    // Esta funcion se encarga de cambiar el estado del sidebar, si esta abierto lo cierra y viceversa
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarVisibleOpen);
    };

    return(
        </button>

        {/* SIDEBAR: 296px */}
        <aside className={`sidebar ${isSidebarVisibleOpen ? 'open' : ''}`}>
          <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <img src="/img/Negratone2.png" alt="Negratone Dashboard" style={{ maxWidth: '180px', maxHeight: '180px'}} />
          </div>

          {/* Menú de Navegación para mas adelante*/}
          <nav className="main-menu">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              🏠 Inicio
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              📦 Productos
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              🏪 Categorías
            </NavLink>
          </nav>

          <div className="user-profile-link">
            <NavLink to="/profile" className="profile-item" style={{ color: 'white', textDecoration: 'none' }}>
              👤 Mi Perfil
            </NavLink>
          </div>
        </aside>

        <main className="main-area">
          
          <header className="main-header">
            <h3 style={{ margin: 0, color: '#4d4646' }}>Panel de Control</h3>
          </header>

          <div className="main-content">
            {children}
          </div>

        </main>

      </div>
    );
};

export default Layout;