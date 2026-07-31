import { Routes, Route } from 'react-router-dom';

import Home from './PagesTemp/HomeTemp/Home';
import ProductsList from './PagesTemp/ProductsTemp/ProductsList';
import ProductView from './PagesTemp/ProductsTemp/ProductView';
import Profile from './PagesTemp/ProfileTemp/Profile';
import Layout from './ComponentsTemp/OrganismsTemp/Layout';
import NewProduct from './PagesTemp/ProductsTemp/NewProduct';
import CategoriesList from "./PagesTemp/CategoriesTemp/CategoriesList";
import CategoryView from "./PagesTemp/CategoriesTemp/CategoryView";
import NewCategory from "./PagesTemp/CategoriesTemp/NewCategory";

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