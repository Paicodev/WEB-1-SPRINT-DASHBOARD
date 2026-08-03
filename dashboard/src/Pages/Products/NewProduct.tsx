import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';

export default function NewProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "", 
        description: "", 
        price: "" as string | number,
        stock: "" as string | number, 
        store: 'Negratone', 
        image: ""
    });

    // Controlador de eventos para inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'price' || name === 'stock') {
            // Permite string vacío (al borrar) o únicamente dígitos enteros
            if (value === '' || /^\d*$/.test(value)) {
                setProduct({
                    ...product,
                    [name]: value
                });
            }
            return;
        }

        setProduct({
            ...product,
            [name]: value
        });
    };

    // Controlador para el botón Cancelar (vuelve al listado de productos)
    const handleCancel = () => {
        navigate('/products');
    };

    // Controlador asíncrono para el botón Guardar 
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

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        const payload = {
            ...product,
            price: priceNum,
            stock: stockNum
        };

        // PETICIÓN HTTP AL BACKEND
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
            <h2>Dar de alta un nuevo producto</h2>
            
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Nombre del Producto</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={product.name} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label>Descripcion del Producto</label>
                    <input 
                        type="text" 
                        name="description" 
                        value={product.description} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label>Precio del Producto</label>
                    <input 
                        type="text" 
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        placeholder="Ej: 1500"
                    />
                </div>

                <div className="form-group">
                    <label>Stock del Producto</label>
                    <input 
                        type="text" 
                        name="stock" 
                        value={product.stock} 
                        onChange={handleChange} 
                        placeholder="Ej: 10"
                    />
                </div>

                <div className="form-group">
                    <label>Imágen del Producto</label>
                    <input 
                        type="text" 
                        name="image" 
                        value={product.image} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancel}>
                        Cancelar
                    </button>
                    <button type="button" className="btn-save" onClick={handleSave}>
                        Guardar Producto
                    </button>
                </div>
            </form>
        </div>
    );
}