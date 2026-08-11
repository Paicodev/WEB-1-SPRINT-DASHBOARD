import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import useTheme from '../../utils/useTheme';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarVisibleOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Abre/Cierra el menú con el botón
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarVisibleOpen);
  };

  // Función específica para forzar el cierre (al tocar afuera o al navegar)
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout-container">

      {/* ==========================================
           Fondo oscuro para cerrar al clickear fuera del sidebar en móviles
            ========================================== */}
      <div
        className={`sidebar-overlay ${isSidebarVisibleOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Botón Mobile */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        ☰ Menú
      </button>

      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarVisibleOpen ? 'open' : ''}`}>

        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <img src="/img/Negratone2.png" alt="Negratone Dashboard" style={{ maxWidth: '180px', maxHeight: '180px' }} />
        </div>

        <nav className="main-menu">
          {/* Le agregamos onClick={closeSidebar} a cada link para que se cierre al navegar en móviles */}
          <NavLink to="/" onClick={closeSidebar} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            🏠 Inicio
          </NavLink>
          <NavLink to="/products" onClick={closeSidebar} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            📦 Productos
          </NavLink>
          <NavLink to="/categories" onClick={closeSidebar} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            🏪 Categorías
          </NavLink>
          <NavLink to="/users" onClick={closeSidebar} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            👥 Usuarios
          </NavLink>
        </nav>

        <div className="user-profile-link">
          <NavLink to="/profile" onClick={closeSidebar} className={({ isActive }) => isActive ? "profile-item active" : "profile-item"} style={{ color: 'white', textDecoration: 'none' }}>
            👤 Mi Perfil
          </NavLink>
        </div>

      </aside>

      {/* MAIN AREA */}
      <main className="main-area">
        <header className="main-header">
          <h3 className="header-title-text" style={{ margin: 0 }}>Panel de Control</h3>
          <div className="header-actions-box">
            <button 
              type="button" 
              className="theme-switch-btn" 
              onClick={toggleTheme} 
              title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label="Toggle dark mode"
            >
              {isDark ? "☀️ Claro" : "🌙 Oscuro"}
            </button>
          </div>
        </header>
        <div className="main-content">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;
