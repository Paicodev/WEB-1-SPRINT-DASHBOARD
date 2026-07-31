import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import ProductsList from './Pages/Products/ProductsList';
import ProductView from './Pages/Products/ProductView';
import Profile from './Pages/Profile/Profile';
import Layout from './Components/Organisms/Layout';
import NewProduct from './Pages/Products/NewProduct';
import CategoriesList from "./Pages/Categories/CategoriesList";
import CategoryView from "./Pages/Categories/CategoryView";
import NewCategory from "./Pages/Categories/NewCategory";

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