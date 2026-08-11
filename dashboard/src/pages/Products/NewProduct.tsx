import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../utils/useCategories';
import './NewProduct.css';

export default function NewProduct() {
    const navigate = useNavigate();
    const { categories } = useCategories();

    const [imageInputMode, setImageInputMode] = useState<'file' | 'url'>('file');

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "" as string | number,
        stock: "" as string | number,
        category_id: "" as string | number,
        store: 'Negratone Oficial',
        image: ""
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Controlador de eventos para inputs de texto, números y selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'price' || name === 'stock') {
            // Permite string vacío al borrar o solo dígitos numéricos
            if (value === '' || /^\d*$/.test(value)) {
                setProduct(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
            return;
        }

        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 2. Controlador para cargar imagen desde archivo local (File Picker)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validación de tamaño (máx 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("La imagen es demasiado pesada. El tamaño máximo permitido es 5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setProduct(prev => ({
                        ...prev,
                        image: reader.result as string
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Eliminar la imagen seleccionada / limpiar previsualización
    const handleRemoveImage = () => {
        setProduct(prev => ({ ...prev, image: "" }));
    };

    // Botón Cancelar (vuelve al listado de productos)
    const handleCancel = () => {
        navigate('/products');
    };

    // Controlador asíncrono para Guardar el Producto (POST)
    const handleSave = async () => {
        // VALIDACIONES
        if (product.name.trim() === "") {
            alert("Error: El nombre del producto es obligatorio.");
            return;
        }

        const priceNum = Number(product.price);
        const stockNum = Number(product.stock);

        if (product.price === "" || isNaN(priceNum) || priceNum < 0) {
            alert("Error: El precio debe ser un número entero válido mayor o igual a 0.");
            return;
        }
        if (product.stock === "" || isNaN(stockNum) || stockNum < 0) {
            alert("Error: El stock debe ser un número entero válido mayor o igual a 0.");
            return;
        }

        const payload = {
            ...product,
            price: priceNum,
            stock: stockNum,
            category_id: product.category_id ? Number(product.category_id) : null
        };

        // PETICIÓN HTTP AL BACKEND (POST /api/products)
        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("¡Producto creado con éxito en la base de datos!");
                navigate('/products');
            } else {
                alert("Hubo un problema al guardar en el servidor.");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de conexión. Asegúrate de que el backend en el puerto 3000 esté corriendo.");
        }
    };

    return (
        <div className="new-product-container">
            <div className="new-product-header">
                <h2>Dar de alta un nuevo producto</h2>
                <p className="subtitle-text">Completa los datos del producto para agregarlo al catálogo.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="new-product-form">
                <div className="form-grid">
                    {/* Nombre */}
                    <div className="form-group full-width">
                        <label>Nombre del Producto *</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Ej: Auriculares Negratone Pro"
                            required
                        />
                    </div>

                    {/* Categoría */}
                    <div className="form-group">
                        <label>Categoría</label>
                        <select
                            name="category_id"
                            value={product.category_id}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">Selecciona una categoría</option>
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
                        <select
                            name="store"
                            value={product.store}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="Negratone Oficial">Negratone Oficial</option>
                            <option value="Olivia Store">Olivia Store</option>
                            <option value="Havanna SL">Havanna SL</option>
                        </select>
                    </div>

                    {/* Precio */}
                    <div className="form-group">
                        <label>Precio ($) *</label>
                        <input
                            type="text"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="Ej: 45000"
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div className="form-group">
                        <label>Stock Disponible *</label>
                        <input
                            type="text"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            placeholder="Ej: 15"
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="form-group full-width">
                        <label>Descripción del Producto</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Escribe una breve descripción del producto..."
                            rows={3}
                        />
                    </div>

                    {/* Carga de Imagen: Modo Archivo vs URL */}
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
                                    id="product-file-input"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden-file-input"
                                />
                                <label htmlFor="product-file-input" className="custom-file-btn">
                                    <span>📷 Seleccionar Foto de la Computadora</span>
                                </label>
                            </div>
                        ) : (
                            <input
                                type="text"
                                name="image"
                                value={product.image}
                                onChange={handleChange}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        )}

                        {/* Previsualización en Vivo de la Imagen */}
                        {product.image ? (
                            <div className="image-preview-card">
                                <img src={product.image} alt="Vista previa" className="preview-img" />
                                <div className="preview-info">
                                    <span className="preview-label">✅ Imagen cargada correctamente</span>
                                    <button type="button" onClick={handleRemoveImage} className="btn-remove-preview">
                                        🗑️ Quitar Imagen
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="no-image-placeholder">
                                <span>🖼️ Sin imagen seleccionada (se usará una por defecto)</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button type="button" className="btn-save" onClick={handleSave}>
                        💾 Guardar Producto
                    </button>
                </div>
            </form>
        </div>
    );
}