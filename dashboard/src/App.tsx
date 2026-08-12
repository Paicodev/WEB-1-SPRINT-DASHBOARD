import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Auth/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Layout from './Components/Organisms/Layout';

import Home from './Pages/Home/Home';
import ProductsList from './Pages/Products/ProductsList';
import ProductView from './Pages/Products/ProductView';
import NewProduct from './Pages/Products/NewProduct';
import CategoriesList from "./Pages/Categories/CategoriesList";
import CategoryView from "./Pages/Categories/CategoryView";
import NewCategory from './Pages/Categories/NewCategory';
import UsersList from "./Pages/Users/UsersList";
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <Routes>
      {/* Ruta pública de Login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas del Dashboard envueltas con ProtectedRoute y Layout */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/products/new" element={<NewProduct />} />
                <Route path="/products/:id" element={<ProductView />} />
                
                <Route path="/categories" element={<CategoriesList />} />
                <Route path="/categories/new" element={<NewCategory />} />
                <Route path="/categories/:id" element={<CategoryView />} />

                <Route path="/users" element={<UsersList />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="*" element={<h1 style={{ color: 'red' }}>Error 404: Página no encontrada</h1>} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;