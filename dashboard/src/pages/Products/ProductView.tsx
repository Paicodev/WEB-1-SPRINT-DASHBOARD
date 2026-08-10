import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductView.css';

interface Category {
  id: number;
  name: string;
}

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [categories, setCategories] = useState<Category[]>([]);
  const [imageInputMode, setImageInputMode] = useState<'file' | 'url'>('file');

  const [product, setProduct] = useState({
    id: id || '1',
    name: 'Auriculares Negratone Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 45000,
    stock: 15,
    category_id: '' as string | number,
    store: 'Negratone Oficial',
    image: '/img/products/producto-auris.jpg'
  });

  // Estado borrador para el formulario
  const [editForm, setEditForm] = useState(product);

  // 1. Cargar las categorías del Backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, [API_URL]);

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

    if (editForm.price === '' || isNaN(priceNum) || priceNum < 0) {
      alert("Error: El precio debe ser un número mayor o igual a 0.");
      return;
    }

    if (editForm.stock === '' || isNaN(stockNum) || stockNum < 0) {
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

  return (
    <div className="product-view-container">
      
      {/* HEADER */}
      <div className="product-view-header">
        <h2><Link to="/products">Productos</Link> &gt; #{product.id}</h2>
        <button className="btn-danger-pill" onClick={handleEliminar}>Eliminar Producto</button>
      </div>

      {/* TARJETA DE RESUMEN */}
      <div className="summary-card">
        <img 
          src={editForm.image || product.image || 'https://placehold.co/100x100/333/white?text=Img'} 
          alt={product.name} 
          className="summary-image"
        />
        
        <div className="summary-details">
          <h3>{editForm.name || product.name}</h3>
          
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">${editForm.price}</span>
              <span className="stat-label">PRECIO<br/>VENTA</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-value">{editForm.stock}</span>
              <span className="stat-label">STOCK<br/>DISPONIBLE</span>
            </div>

            <Link to="/" className="store-pill">
              <span className="store-avatar">🟢</span>
              {editForm.store || product.store}
            </Link>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE EDICIÓN */}
      <div className="product-form-container">
        <h3>Editar Información</h3>
        
        <div className="form-group">
          <label>Nombre del Producto *</label>
          <input type="text" name="name" value={editForm.name} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select 
            name="category_id" 
            value={editForm.category_id} 
            onChange={handleInputChange}
          >
            <option value="">Sin categoría asignada</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Precio ($) *</label>
          <input type="number" name="price" value={editForm.price} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Stock *</label>
          <div className="stock-controls">
            <button type="button" onClick={() => handleStockAdjust(-1)}>-</button>
            <input type="number" name="stock" value={editForm.stock} onChange={handleInputChange} />
            <button type="button" onClick={() => handleStockAdjust(1)}>+</button>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={editForm.description} onChange={handleInputChange} rows={3} />
        </div>

        <div className="form-group">
          <label>Tienda</label>
          <select name="store" value={editForm.store} onChange={handleInputChange}>
            <option value="Negratone Oficial">Negratone Oficial</option>
            <option value="Olivia Store">Olivia Store</option>
            <option value="Havanna SL">Havanna SL</option>
          </select>
        </div>

        {/* GESTIÓN DE IMAGEN DUAL (ARCHIVO LOCAL VS URL) */}
        <h3 style={{ marginTop: '2rem' }}>Imagen del Producto</h3>
        
        <div className="form-group image-upload-box">
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
              <img src={editForm.image} alt="Vista previa de edición" className="preview-img" />
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

        {/* BOTONES DE ACCIÓN */}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancelar}>Restablecer</button>
          <button type="button" className="btn-save" onClick={handleGuardar}>💾 Guardar Cambios</button>
        </div>

      </div>
    </div>
  );
}