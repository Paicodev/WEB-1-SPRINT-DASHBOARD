import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css'; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [isSidebarVisibleOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarVisibleOpen);
    };

    return(
      <div className="layout-container">
        
        {/* Botón mobile */}
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          ☰ Menú
        </button>

        {/* SIDEBAR */}
        <aside className={`sidebar ${isSidebarVisibleOpen ? 'open' : ''}`}>
          
          <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <img src="/img/Negratone2.png" alt="Negratone Dashboard" style={{ maxWidth: '180px', maxHeight: '180px'}} />
          </div>

          {/* ==========================================
              Menú Principal
              ========================================== */}
          <nav className="main-menu">
            {/* Inicio */}
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              🏠 Inicio
            </NavLink>
            
            {/* Productos */}
            <NavLink 
              to="/products" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              📦 Productos
            </NavLink>
            
            {/* Categorías */}
            <NavLink 
              to="/categories" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              🏪 Categorías
            </NavLink>
          </nav>

          {/* ==========================================
              Perfil de Usuario
              ========================================== */}
          <div className="user-profile-link">
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? "profile-item active" : "profile-item"} 
              style={{ color: 'white', textDecoration: 'none' }}
            >
              👤 Mi Perfil
            </NavLink>
          </div>

        </aside>

        {/* MAIN AREA */}
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