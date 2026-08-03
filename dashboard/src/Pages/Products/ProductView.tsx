import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductView.css';

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  store: string;
  image: string;
}

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductData>({
    id: id || '1',
    name: 'Auriculares Negratone Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido.',
    price: 45000,
    stock: 15,
    store: 'Negratone Oficial',
    image: '/img/products/producto-auris.jpg'
  });

  // Estado borrador para el formulario (permite editar sin pisar los datos reales hasta guardar)
  const [editForm, setEditForm] = useState<ProductData>(product);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            // Hacemos el fetch dinámico usando el ID capturado de la URL
            const response = await fetch(`${API_URL}/api/products/${id}`);
            
            if (response.ok) {
                const data = await response.json();
                
                // Mapeamos los campos que vienen de tu BD
                const productData = {
                    id: data.id.toString(),
                    name: data.name,
                    description: data.description || 'Descripción no disponible',
                    price: data.price,
                    stock: data.stock,
                    store: 'Negratone Oficial', // O el campo de tienda que tengas en BD
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
}, [id]); // Esto asegura que si cambias de producto, se vuelva a pedir al servidor

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'stock') {
      if (value === '' || /^\d*$/.test(value)) {
        setEditForm({
          ...editForm,
          [name]: value
        });
      }
      return;
    }

    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  // Escenario 5: Manejador de los botones + y -
  const handleStockAdjust = (amount: number) => {
    setEditForm(prev => {
      const currentStock = Number(prev.stock) || 0;
      return {
        ...prev,
        stock: Math.max(0, currentStock + amount)
      };
    });
  };

  // Escenario 7: Eliminar la URL de la imagen
  const handleRemoveImage = () => {
    setEditForm({ ...editForm, image: '' });
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
      alert("Error: El precio debe ser un número entero válido.");
      return;
    }

    if (String(editForm.stock).trim() === '' || isNaN(stockNum) || stockNum < 0) {
      alert("Error: El stock debe ser un número entero válido.");
      return;
    }

    const payload = {
      ...editForm,
      price: priceNum,
      stock: stockNum
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
          description: updatedProduct.description || 'Descripción no disponible',
          store: 'Negratone Oficial',
          image: updatedProduct.image || ''
        };
        setProduct(formatted);
        setEditForm(formatted);
        alert("¡Producto actualizado!");
      } else {
        alert("No se pudo actualizar el producto.");
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
      alert("¡Producto eliminado!");
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
        <button className="btn-danger-pill" onClick={handleEliminar}>Eliminar</button>
      </div>

      {/*  TARJETAS DE RESUMEN */}
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

            <Link to="/" className="store-pill">
              <span className="store-avatar">🟢</span>
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
            <button type="button" className="btn-secondary" onClick={handleRemoveImage}>Eliminar Imagen</button>
          </div>
        </div>

        {/* BOTONES DE ACCION*/}
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={handleCancelar}>Cancelar</button>
          <button type="button" className="btn-save" onClick={handleGuardar}>Guardar Cambios</button>
        </div>

      </div>
    </div>
  );
}