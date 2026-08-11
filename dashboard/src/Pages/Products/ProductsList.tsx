import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithLoader from './ImageWithLoader';
import './ProductsList.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  imageUrl?: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products`);
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("El servidor respondió con un error:", response.status);
        }
      } catch (error) {
        console.error("Error de red al intentar conectar con el backend:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [API_URL]);

  // Helper para construir la URL completa de la imagen (Base64, URL externa, /img/... o nombre de archivo)
  const getImageUrl = (img?: string) => {
    if (!img) return 'https://placehold.co/60x60/2d3748/ffffff?text=Prod';
    if (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    if (img.startsWith('/img/') || img.startsWith('img/')) {
      const cleanPath = img.startsWith('/') ? img : `/${img}`;
      return `${API_URL}${cleanPath}`;
    }
    const cleanImg = img.startsWith('/') ? img.slice(1) : img;
    return `${API_URL}/img/${cleanImg}`;
  };

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
          <div className="loading-message">Cargando productos...</div>
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
                    <ImageWithLoader 
                      src={getImageUrl(product.image || product.imageUrl)} 
                      alt={product.name} 
                      className="product-image" 
                    />
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category || 'Sin categoría'}</td>
                  <td>${product.price}</td>
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