import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList';
import ProductView from './pages/Products/ProductView';
import Profile from './pages/Profile/Profile';
import Layout from './components/organisms/Layout';
import NewProduct from './pages/Products/NewProduct';
import CategoriesList from "./pages/Categories/CategoriesList";
import CategoryView from "./pages/Categories/CategoryView";
import NewCategory from "./pages/Categories/NewCategory";

function App() {
  return (
    <Layout> {/* El Layout envuelve a todas las rutas para mantener la estructura consistente */}
    {/*<Routes> agrupa todas las rutas de nuestra aplicación */}
    <Routes>
      
      {/* Mapeo de rutas a componentes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      
      {/* Rutas dinámicas y específicas */}
      <Route path="/products/new" element={<NewProduct />} />
      <Route path="/products/:id" element={<ProductView />} />
      
      <Route path="/categories" element={<CategoriesList />} />
      <Route path="/categories/new" element={<NewCategory />} />
      <Route path="/categories/:id" element={<CategoryView />} />

      <Route path="/profile" element={<Profile />} />

      {/* Ruta por default para el Error 404 */}
      <Route path="*" element={<h1 style={{ color: 'red' }}>Error 404: Página no encontrada</h1>} />
      
    </Routes>
    </Layout>
  );
}

export default App;