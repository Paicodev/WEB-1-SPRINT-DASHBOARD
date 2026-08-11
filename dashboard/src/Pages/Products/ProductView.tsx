import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../utils/useCategories';
import './ProductView.css';

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [imageInputMode, setImageInputMode] = useState<'file' | 'url'>('file');

  const [product, setProduct] = useState({
    id: id || '1',
    name: 'Auriculares Negratone Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 45000 as string | number,
    stock: 15 as string | number,
    category_id: '' as string | number,
    store: 'Negratone Oficial',
    image: '/img/products/producto-auris.jpg'
  });

  // Estado borrador para el formulario
  const [editForm, setEditForm] = useState(product);

  // 2. Cargar los datos del producto actual
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);

        if (response.ok) {
          const data = await response.json();

          const productData = {
            id: data.id.toString(),
            name: data.name || '',
            description: data.description || '',
            price: Number(data.price) || 0,
            stock: Number(data.stock) || 0,
            category_id: data.category_id || '',
            store: data.store || 'Negratone Oficial',
            image: data.image || ''
          };

          setProduct(productData);
          setEditForm(productData);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  // Manejador para carga de archivo de imagen local (File Picker)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es demasiado pesada. El tamaño máximo permitido es 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditForm(prev => ({
            ...prev,
            image: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejador de los botones + y - para stock
  const handleStockAdjust = (amount: number) => {
    setEditForm(prev => ({
      ...prev,
      stock: Math.max(0, Number(prev.stock || 0) + amount)
    }));
  };

  // Limpiar / Eliminar imagen seleccionada
  const handleRemoveImage = () => {
    setEditForm(prev => ({ ...prev, image: '' }));
  };

  const handleCancelar = () => {
    setEditForm(product);
  };

  const handleGuardar = async () => {
    if (!editForm.name.trim()) {
      alert("Error: El nombre es requerido.");
      return;
    }

    const priceNum = Number(editForm.price);
    const stockNum = Number(editForm.stock);

    if (String(editForm.price).trim() === '' || isNaN(priceNum) || priceNum < 0) {
      alert("Error: El precio debe ser un número mayor o igual a 0.");
      return;
    }

    if (String(editForm.stock).trim() === '' || isNaN(stockNum) || stockNum < 0) {
      alert("Error: El stock debe ser un número mayor o igual a 0.");
      return;
    }

    const payload = {
      ...editForm,
      price: priceNum,
      stock: stockNum,
      category_id: editForm.category_id ? Number(editForm.category_id) : null
    };

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        const formatted = {
          ...updatedProduct,
          id: updatedProduct.id.toString(),
          category_id: updatedProduct.category_id || ''
        };
        setProduct(formatted);
        setEditForm(formatted);
        alert("¡Producto actualizado con éxito!");
        navigate('/products');
      } else {
        alert("No se pudo actualizar el producto en el servidor.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Eliminar este producto permanentemente?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("¡Producto eliminado correctamente!");
        navigate("/products");
      } else {
        alert("No se pudo eliminar el producto.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  // Helper para preview
  const getDisplayImage = () => {
    const img = editForm.image || product.image;
    if (!img) return 'https://placehold.co/100x100/2d3748/ffffff?text=Prod';
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

  return (
    <div className="product-view-container">

      {/* HEADER */}
      <div className="product-view-header">
        <div>
          <Link to="/products" className="back-link">← Volver a Productos</Link>
          <h2>Modificar Producto #{product.id}</h2>
          <p className="subtitle-text">Edita los datos y actualiza el stock o imagen del catálogo.</p>
        </div>
        <button type="button" className="btn-danger-pill" onClick={handleEliminar}>
          🗑️ Eliminar
        </button>
      </div>

      {/* TARJETA DE RESUMEN SUPERIOR */}
      <div className="summary-card">
        <img
          src={getDisplayImage()}
          alt={editForm.name || product.name}
          className="summary-image"
        />

        <div className="summary-details">
          <h3>{editForm.name || product.name}</h3>

          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">${editForm.price}</span>
              <span className="stat-label">PRECIO<br />VENTA</span>
            </div>

            <div className="stat-item">
              <span className="stat-value">{editForm.stock}</span>
              <span className="stat-label">STOCK<br />DISPONIBLE</span>
            </div>

            <div className="store-pill">
              <span className="store-avatar">🏪</span>
              {editForm.store || product.store}
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE EDICIÓN CON FORMATO NEWPRODUCT */}
      <form onSubmit={(e) => e.preventDefault()} className="product-edit-form">
        <div className="form-grid">

          {/* Nombre */}
          <div className="form-group full-width">
            <label>Nombre del Producto *</label>
            <input type="text" name="name" value={editForm.name} onChange={handleInputChange} required />
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label>Categoría</label>
            <select
              name="category_id"
              value={editForm.category_id}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Sin categoría asignada</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tienda */}
          <div className="form-group">
            <label>Tienda</label>
            <select name="store" value={editForm.store} onChange={handleInputChange} className="form-select">
              <option value="Negratone Oficial">Negratone Oficial</option>
              <option value="Olivia Store">Olivia Store</option>
              <option value="Havanna SL">Havanna SL</option>
            </select>
          </div>

          {/* Precio */}
          <div className="form-group">
            <label>Precio ($) *</label>
            <input type="number" name="price" value={editForm.price} onChange={handleInputChange} required />
          </div>

          {/* Stock */}
          <div className="form-group">
            <label>Stock Disponible *</label>
            <div className="stock-controls">
              <button type="button" onClick={() => handleStockAdjust(-1)}>-</button>
              <input type="number" name="stock" value={editForm.stock} onChange={handleInputChange} required />
              <button type="button" onClick={() => handleStockAdjust(1)}>+</button>
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group full-width">
            <label>Descripción del Producto</label>
            <textarea name="description" value={editForm.description} onChange={handleInputChange} rows={3} />
          </div>

          {/* GESTIÓN DE IMAGEN DUAL */}
          <div className="form-group full-width image-upload-section">
            <label>Imagen del Producto</label>

            <div className="image-mode-tabs">
              <button
                type="button"
                className={`mode-tab-btn ${imageInputMode === 'file' ? 'active' : ''}`}
                onClick={() => setImageInputMode('file')}
              >
                📁 Subir desde Archivo Local
              </button>
              <button
                type="button"
                className={`mode-tab-btn ${imageInputMode === 'url' ? 'active' : ''}`}
                onClick={() => setImageInputMode('url')}
              >
                🔗 Ingresar URL de Imagen
              </button>
            </div>

            {imageInputMode === 'file' ? (
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="edit-product-file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                />
                <label htmlFor="edit-product-file" className="custom-file-btn">
                  <span>📷 Seleccionar Foto de la Computadora</span>
                </label>
              </div>
            ) : (
              <input
                type="text"
                name="image"
                value={editForm.image}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            )}

            {/* Previsualización en vivo */}
            {editForm.image ? (
              <div className="image-preview-card">
                <img src={getDisplayImage()} alt="Vista previa" className="preview-img" />
                <div className="preview-info">
                  <span className="preview-label">✅ Imagen cargada</span>
                  <button type="button" className="btn-remove-preview" onClick={handleRemoveImage}>
                    🗑️ Quitar Imagen
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-image-placeholder">
                <span>🖼️ Sin imagen cargada actualmente</span>
              </div>
            )}
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancelar}>
            Restablecer
          </button>
          <button type="button" className="btn-save" onClick={handleGuardar}>
            💾 Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}