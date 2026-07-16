import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductView.css';

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: id || '1',
    name: 'Auriculares Negratone Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 45000,
    stock: 15,
    store: 'Negratone Oficial',
    image: '/img/products/producto-auris.jpg'
  });

  // Estado borrador para el formulario (permite editar sin pisar los datos reales hasta guardar)
  const [editForm, setEditForm] = useState(product);

useEffect(() => {
    
    const mockProducts = [
      { id: 1, name: 'Laptop Gamer Pro', category: 'Electrónica', price: 1200, stock: 15, imageUrl: 'https://placehold.co/400x400/4d4646/white?text=Laptop&slow=1' },
      { id: 2, name: 'Smartphone X1', category: 'Electrónica', price: 800, stock: 30, imageUrl: 'https://placehold.co/400x400/4d4646/white?text=Phone&slow=1' },
      { id: 3, name: 'Auriculares Inalámbricos', category: 'Accesorios', price: 150, stock: 50, imageUrl: 'https://placehold.co/400x400/4d4646/white?text=Headphones&slow=1' },
      { id: 4, name: 'Teclado Mecánico RGB', category: 'Accesorios', price: 100, stock: 40, imageUrl: 'https://placehold.co/400x400/4d4646/white?text=Keyboard&slow=1' },
      { id: 5, name: 'Monitor 4K 27"', category: 'Monitores', price: 450, stock: 20, imageUrl: 'https://placehold.co/400x400/4d4646/white?text=Monitor&slow=1' },
    ];

    // 2. Buscamos el producto. Number() para igualarlos)
    const productoEncontrado = mockProducts.find(p => p.id === Number(id));

    // 3. Si lo encontramos, lo adaptamos al formulario
    if (productoEncontrado) {
      const datosAdaptados = {
        id: productoEncontrado.id.toString(),
        name: productoEncontrado.name,
        description: 'Descripción no disponible en el listado general.',
        price: productoEncontrado.price,
        stock: productoEncontrado.stock,
        store: 'Negratone Oficial',
        image: productoEncontrado.imageUrl
      };

      setProduct(datosAdaptados);
      setEditForm(datosAdaptados);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      stock: Math.max(0, prev.stock + amount)
    }));
  };

  // Escenario 7: Eliminar la URL de la imagen
  const handleRemoveImage = () => {
    setEditForm({ ...editForm, image: '' });
  };

  const handleCancelar = () => {
    setEditForm(product);
  };

  const handleGuardar = () => {
    if (!editForm.name.trim()) {
      alert("Error: El nombre es requerido.");
      return;
    }
    if (!Number.isInteger(editForm.price) || !Number.isInteger(editForm.stock)) {
      alert("Error: El precio y el stock deben ser enteros.");
      return;
    }

    console.log(`[PUT] /products/${id}/edit`, editForm);
    setProduct(editForm);
    alert("¡Producto actualizado!");
  };

  const handleEliminar = () => {
    if (window.confirm("¿Eliminar este producto permanentemente?")) {
      console.log(`[DELETE] /products/${id}/delete`);
      navigate("/products");
    }
  };

  return (
    <div className="product-view-container">
      
      {/* HEADER */}
      <div className="product-view-header">
        <h2>Productos &gt; #{product.id}</h2>
        <button className="btn-danger-pill" onClick={handleEliminar}>Eliminar</button>
      </div>

      {/* SUMMARY CARD (Adaptado al diseño) */}
      <div className="summary-card">
        <img 
          src={product.image || 'https://placehold.co/100x100/333/white?text=Img'} 
          alt={product.name} 
          className="summary-image"
        />
        
        <div className="summary-details">
          <h3>{product.name}</h3>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">{product.price}</span>
              <span className="stat-label">PUNTOS<br/>SUPERCLUB</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-value">{product.stock}</span>
              <span className="stat-label">STOCK<br/>DISPONIBLE</span>
            </div>

            <Link to={`/stores/${product.store}`} className="store-pill">
              <span className="store-avatar">🐶</span>
              {product.store}
            </Link>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE EDICIÓN */}
      <div className="product-form-container">
        <h3>Información</h3>
        
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="name" value={editForm.name} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Valor</label>
          <input type="number" name="price" value={editForm.price} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <div className="stock-controls">
            <button type="button" onClick={() => handleStockAdjust(-1)}>-</button>
            <input type="number" name="stock" value={editForm.stock} onChange={handleInputChange} />
            <button type="button" onClick={() => handleStockAdjust(1)}>+</button>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={editForm.description} onChange={handleInputChange} rows={4} />
        </div>

        <div className="form-group">
          <label>Tienda</label>
          <select name="store" value={editForm.store} onChange={handleInputChange}>
            <option value="Negratone Oficial">Negratone Oficial</option>
            <option value="Olivia Store">Olivia Store</option>
            <option value="Havanna SL">Havanna SL</option>
          </select>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Galería de Imágenes</h3>
        
        <div className="form-group">
          <label>Nueva Imagen</label>
          <div className="image-controls">
            <input type="text" name="image" value={editForm.image} onChange={handleInputChange} placeholder="URL de la Imagen" />
            <button type="button" className="btn-secondary" onClick={handleRemoveImage}>Volar Imagen</button>
          </div>
        </div>

        {/* ¡LOS BOTONES DEBEN IR AQUÍ ADENTRO DEL RETURN! */}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancelar}>Cancelar</button>
          <button type="button" className="btn-save" onClick={handleGuardar}>Guardar Cambios</button>
        </div>

      </div>
    </div>
  );
}