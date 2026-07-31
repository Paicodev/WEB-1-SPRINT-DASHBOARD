import DashboardCard from '../../Components/Organisms/DashboardCard';
import { useState } from 'react';
import { useEffect } from 'react';
import './home.css';

const Home = () => {

    //TODO Dato temporal: Reemplazar con la información del usuario cuando se implementen las sesiones.
    const userName = "Geronimo";

    const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0
    });
    
    useEffect(() => {
    const fetchStats = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/stats");

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
                    newPath="/categories/new" //TODO Ruta a crear en App.tsx
                    newButtonText="Agregar Categoría"
                />
            </section>
        </div>
    );
};

export default Home;