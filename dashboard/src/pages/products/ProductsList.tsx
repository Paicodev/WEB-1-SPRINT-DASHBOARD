import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductsList.css';

// TODO (adaptar al modelo de DB) Definimos el tipo de dato 
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// --- SIMULACIÓN DE API ---
// TODO En un futuro, esto vendrá de una petición real a "fetch('/api/products')""
const mockProducts: Product[] = [
  { id: 1, name: 'Laptop Gamer Pro', category: 'Electrónica', price: 1200, stock: 15 },
  { id: 2, name: 'Smartphone X1', category: 'Electrónica', price: 800, stock: 30 },
  { id: 3, name: 'Auriculares Inalámbricos', category: 'Accesorios', price: 150, stock: 50 },
  { id: 4, name: 'Teclado Mecánico RGB', category: 'Accesorios', price: 100, stock: 40 },
  { id: 5, name: 'Monitor 4K 27"', category: 'Monitores', price: 450, stock: 20 },
];

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos la llamada a la API con un retardo de 1.5 segundos
    setLoading(true);
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1500);

    // Buena práctica: limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez

  // Filtramos los productos basándonos en el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-list-container">
      <header className="products-list-header">
        <h1>Productos</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/products/new" className="add-button">
            Agregar Producto
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