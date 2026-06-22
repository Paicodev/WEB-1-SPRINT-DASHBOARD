import DashboardCard from '../../components/organisms/DashboardCard';
import './home.css';

const Home = () => {

    //TODO Dato temporal: Reemplazar con la información del usuario cuando se implementen las sesiones.
    const userName = "Geronimo";

    //TODO Datos temporales: Estos valores vendrán de una API en el futuro.
    const productCount = 125;
    const categoryCount = 12;

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
                    count={productCount}
                    listPath="/products"
                    newPath="/products/new"
                    newButtonText="Agregar Producto"
                />
                <DashboardCard 
                    icon="🏪"
                    title="Categorías"
                    count={categoryCount}
                    listPath="/categories"
                    newPath="/categories/new" //TODO Ruta a crear en App.tsx
                    newButtonText="Agregar Categoría"
                />
            </section>
        </div>
    );
};

export default Home;