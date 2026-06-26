import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductView.css';

export default function ProductView() {
  // Sacamos el ID dinámico de la URL, debido a que en App.tsx pusimos /products/:id
  const { id } = useParams();

  // Aqui simulamos el producto que obtendriamos del API REST
  const [product, setProduct] = useState({
    id: id || '0000',
    name: 'Auriculares Negratone Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 45000,
    stock: 15,
    store: 'Negratone Oficial',
    image: '/img/products/producto-auris.jpg'
  });

  return (
    <div className="product-view-container">
      
      <div className="product-view-header">
        <h2>Productos &gt; #{product.id}</h2>
        <button className="btn-danger">🗑️ Eliminar</button>
      </div>

      {/* ==========================================
          ESCENARIO 1 y 2: Resumen y Tienda
          ========================================== */}
      <div className="summary-card">
        {/* Mostramos la imagen o una por defecto si no tiene */}
        <img 
          src={product.image || '/img/products/default-product.png'} 
          alt={product.name} 
          className="summary-image"
        />
        
        <div className="summary-details">
          <h3>{product.name}</h3>
          <p><strong>Identificador:</strong> #{product.id}</p>
          <p><strong>Stock disponible:</strong> {product.stock} unidades</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p>
            <strong>Tienda vendedora: </strong> 
            {/* ESCENARIO 2: Link al perfil de la tienda */}
            <Link to={`/stores/${product.store}`} className="store-link">
              {product.store}
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}