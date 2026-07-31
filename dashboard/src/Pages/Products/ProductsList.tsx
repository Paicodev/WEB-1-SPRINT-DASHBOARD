import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithLoader from './ImageWithLoader';
import './ProductsList.css';

// TODO (adaptar al modelo de DB) Definimos el tipo de dato 
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Petición GET al endpoint principal de productos en el backend
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        
        if (response.ok) {
          // Si Express responde con un status 200, parseamos el JSON
          const data = await response.json();
          setProducts(data); // Guardamos los datos reales en el estado de React
        } else {
          console.error("El servidor respondió con un error:", response.status);
        }
      } catch (error) {
        console.error("Error de red al intentar conectar con el backend:", error);
      } finally {
        // Independientemente de si falla o tiene éxito, quitamos el loader
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que la petición ocurra una sola vez al cargar la página

  // Filtramos los productos basándonos en el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-list-container">
      <header className={`products-list-header ${isSearchActive ? 'search-active' : ''}`}>
        <h1 className="header-title">Productos</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />
          <Link to="/products/new" className="add-button">
            <span className="add-button-icon">+</span>
            <span className="add-button-text">Agregar Producto</span>
          </Link>
        </div>
      </header>

      <div className="products-list-content">
        {loading ? (
          <div className="loading-message">Cargando...</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th className="column-image">Imagen</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                  <td className="cell-image">
                    <ImageWithLoader src={product.imageUrl} alt={product.name} className="product-image" />
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && filteredProducts.length === 0 && (
            <div className="no-results-message">
                No se encontraron productos que coincidan con la búsqueda.
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;