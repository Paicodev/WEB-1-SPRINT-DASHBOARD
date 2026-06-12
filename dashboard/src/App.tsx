import { Routes, Route } from 'react-router-dom';

// Importamos los esqueletos de las páginas que creamos en el Paso 1
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList';
import ProductView from './pages/Products/ProductView';
import Profile from './pages/Profile/Profile';
import About from './pages/About/About';


function App() {
  return (
    // <Routes> agrupa todas las rutas de nuestra aplicación
    <Routes>
      
      {/* Mapeo exacto pedido en la US2 */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      
      {/* Rutas dinámicas y específicas */}
      <Route path="/products/new" element={<h1>➕ Agregar Producto</h1>} />
      <Route path="/products/:id" element={<ProductView />} />
      <Route path="/about/" element={<About />} />
      
      <Route path="/profile" element={<Profile />} />

      {/* Ruta por default para el Error 404 */}
      <Route path="*" element={<h1 style={{ color: 'red' }}>Error 404: Página no encontrada</h1>} />
      
    </Routes>
  );
}

export default App;