import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import ProductsList from './pages/Products/ProductsList';
import ProductView from './pages/Products/ProductView';
import Profile from './pages/profile/profile';
import Layout from './components/organisms/Layout';
import NewProduct from './pages/Products/NewProduct';

function App() {
  return (
    <Layout> {/* El Layout envuelve a todas las rutas para mantener la estructura consistente */}
    {/*<Routes> agrupa todas las rutas de nuestra aplicación */}
    <Routes>
      
      {/* Mapeo exacto pedido en la US2 */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      
      {/* Rutas dinámicas y específicas */}
      <Route path="/products/new" element={<NewProduct />} />
      <Route path="/products/:id" element={<ProductView />} />
      
      <Route path="/categories/new" element={<h1>➕ Agregar Categoría</h1>} />

      <Route path="/profile" element={<Profile />} />

      {/* Ruta por default para el Error 404 */}
      <Route path="*" element={<h1 style={{ color: 'red' }}>Error 404: Página no encontrada</h1>} />
      
    </Routes>
    </Layout>
  );
}

export default App;