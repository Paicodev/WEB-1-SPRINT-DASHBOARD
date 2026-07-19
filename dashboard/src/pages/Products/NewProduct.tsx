import React, {useState} from 'react';
import './newProduct.css';

export default function NewProduct() {

    const[product, setProduct] = useState(
        {
        name: "", 
        description: "", 
        price: 0,
        stock: 0, 
        store: 'Negratone', 
        image: ""
        } 
    );

    //controlador de eventos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setProduct({
            ...product, //copio el estado anterior
            [name]: name ==='price' || name === 'stock' ? Number(value) : value
        });
    };
    // Controlador para el botón Cancelar 
    const handleCancel = () => {
        setProduct({
            name: "", 
            description: "", 
            price: 0,
            stock: 0, 
            store: "Negratone Oficial", 
            image: ""
        });
    };

    // Controlador asíncrono para el botón Guardar 
    const handleSave = async () => {
        // VALIDACIONES 
        if (product.name.trim() === "") {
            alert("Error: El nombre del producto es obligatorio.");
            return; // Corta la ejecución aquí si falla
        }
        if (!Number.isInteger(product.price) || !Number.isInteger(product.stock)) {
            alert("Error: El precio y el stock deben ser números enteros.");
            return;
        }

        //PETICIÓN HTTP AL BACKEND
        try {
            // Usamos la API fetch nativa para hacer el POST al servidor Express
            const response = await fetch('http://localhost:3000/products/new', {
                method: 'POST', // Indicamos que es una inserción
                headers: {
                    'Content-Type': 'application/json' // Le avisamos a Express que enviamos JSON
                },
                body: JSON.stringify(product) // Convertimos el estado de React a formato texto JSON
            });

            // RESPUESTA DEL SERVIDOR
            if (response.ok) {
                alert("¡Producto creado con éxito en la base de datos!");
                handleCancel(); // Vaciamos el formulario para cargar otro si se desea
            } else {
                alert("Hubo un problema al guardar en el servidor.");
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de conexión. Asegúrate de que el backend en el puerto 3000 esté corriendo.");
        }
    };
    //Renderizado de la vista 
    return (
        <div className="new-product-container">
            <h2>Dar de alta un nuevo producto</h2>
            
            <form>
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
                    />
                </div>

                <div className="form-group">
                    <label>Stock del Producto</label>
                    <input 
                        type="text" 
                        name="stock" 
                        value={product.stock} 
                        onChange={handleChange} 
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


                <button type="button" className="btn-save">
                    Guardar Producto
                </button>

               
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