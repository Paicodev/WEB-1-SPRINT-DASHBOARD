import React, { useState } from 'react';
import type { ReactNode } from 'react';
import './Layout.css'; // Importamos los estilos

//Props que recibe este componente 
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
            <div className="layout-container">
                {/* Botón temporal para abrir el menú en móviles */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        ☰ Menú
        </button>

        {/* SIDEBAR: 296px */}
      <aside className={`sidebar ${isSidebarVisibleOpen ? 'open' : ''}`}>
        {/*<p style={{ padding: '20px' }}>Menú principal</p>*/}
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <img src= "/img/Negratone2.png" alt="Negratone Dashboard" style={{ maxWidth: '180px', maxHeight: '180px'}} />
            {/* Nota: el filter hace que el logo se vea blanco. Si tu logo ya tiene letras blancas, borrale el style del filter */}
      </div>

      </aside>


      {/* MAIN AREA: Ocupa el resto de la pantalla */}
      <main className="main-area">
        {/*(Home, Productos, etc.) */}
        {children}
      </main>
            </div>

    );
};

export default Layout;