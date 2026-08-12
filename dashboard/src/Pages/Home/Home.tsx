import DashboardCard from '../../Components/Organisms/DashboardCard';
import { useState, useEffect } from 'react';
import { getUser } from '../../utils/auth';
import './Home.css';

const Home = () => {
    const currentUser = getUser();
    const userName = currentUser ? currentUser.name : 'Administrador';

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalUsers: 0
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_URL}/api/stats`);

                if (!response.ok) {
                    throw new Error("No se pudieron obtener las estadísticas.");
                }

                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error al cargar las estadísticas:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>¡Hola, {userName}!</h1>
                <p>Aquí tienes un resumen de la actividad de tu tienda.</p>
            </header>

            <section className="dashboard-grid">
                <DashboardCard
                    icon="📦"
                    title="Productos"
                    count={stats.totalProducts}
                    listPath="/products"
                    newPath="/products/new"
                    newButtonText="Agregar Producto"
                />
                <DashboardCard
                    icon="🏪"
                    title="Categorías"
                    count={stats.totalCategories}
                    listPath="/categories"
                    newPath="/categories/new"
                    newButtonText="Agregar Categoría"
                />
                {/* Tarjeta de métrica de usuarios registrados */}
                <DashboardCard
                    icon="👥"
                    title="Usuarios"
                    count={stats.totalUsers}
                    listPath="/users"
                    newPath="/users"
                    listButtonText="Ver Usuarios"
                    newButtonText="Listado"
                />
            </section>
        </div>
    );
};

export default Home;