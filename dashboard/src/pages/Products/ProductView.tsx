import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductView.css';

export default function ProductView() {
  const { id } = useParams();

  const [product, setProduct] = useState({
    id: id || '0000',
    name: 'Auriculares Negratone Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 45000,
    stock: 15,
    store: 'Negratone Oficial',
    image: '/img/products/producto-auris.jpg'
  });

  // Estado borrador para el formulario (permite editar sin pisar los datos reales hasta guardar)
  const [editForm, setEditForm] = useState(product);

  // Escenario 3: Manejador para los inputs de texto y números
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    });
  };

  // Escenario 5: Manejador de los botones + y -
  const handleStockAdjust = (amount: number) => {
    setEditForm(prev => ({
      ...prev,
      stock: Math.max(0, prev.stock + amount) // Evita que el stock baje de 0
    }));
  };

  // Escenario 7: Eliminar la URL de la imagen
  const handleRemoveImage = () => {
    setEditForm({
      ...editForm,
      image: ''
    });
  };

  return (
    <div className="product-view-container">
      
      <div className="product-view-header">
        <h2>Productos &gt; #{product.id}</h2>
        <button className="btn-danger">🗑️ Eliminar</button>
      </div>

      <div className="summary-card">
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
            <Link to={`/stores/${product.store}`} className="store-link">
              {product.store}
            </Link>
          </p>
        </div>
      </div>

      {/* ==========================================
          FORMULARIO DE EDICIÓN (Escenarios 3, 4, 5, 6, 7)
          ========================================== */}
      <div className="product-form-container">
        <h3>Editar Producto</h3>
        
        <div className="form-group">
          <label>Nombre del producto</label>
          <input 
            type="text" 
            name="name" 
            value={editForm.name} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea 
            name="description" 
            value={editForm.description} 
            onChange={handleInputChange} 
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Precio ($)</label>
          <input 
            type="number" 
            name="price" 
            value={editForm.price} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <div className="stock-controls">
            <button type="button" className="btn-icon" onClick={() => handleStockAdjust(-1)}>➖</button>
            <input 
              type="number" 
              name="stock" 
              value={editForm.stock} 
              onChange={handleInputChange} 
            />
            <button type="button" className="btn-icon" onClick={() => handleStockAdjust(1)}>➕</button>
          </div>
        </div>

        <div className="form-group">
          <label>URL de la Imagen</label>
          <div className="image-controls">
            <input 
              type="text" 
              name="image" 
              value={editForm.image} 
              onChange={handleInputChange} 
              placeholder="https://..."
            />
            <button type="button" className="btn-secondary" onClick={handleRemoveImage}>
              Volar Imagen
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}