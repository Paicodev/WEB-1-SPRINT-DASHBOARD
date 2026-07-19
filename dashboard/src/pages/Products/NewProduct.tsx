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
            </form>
        </div>
    );
}