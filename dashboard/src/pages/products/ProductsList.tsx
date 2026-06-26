import React, { useState } from 'react'; // Quitamos useEffect porque ya no lo usamos aquí
import { Link } from 'react-router-dom';

//productos temporales para mostrar en la lista
const productos = [
    { id: 1, name: 'Termo Stanley 1L', category: 'Bazar', price: 85000, stock: 15 },
    { id: 2, name: 'Auriculares Sony WH-1000XM4', category: 'Tecnología', price: 350000, stock: 3 },
    { id: 3, name: 'Café de Especialidad 250g', category: 'Alimentos', price: 9500, stock: 40 },
    { id: 4, name: 'Silla Gamer Ergonómica', category: 'Muebles', price: 120000, stock: 0 },
    { id: 5, name: 'Taza de Cerámica Gato', category: 'Bazar', price: 4500, stock: 10 }
];

const ProductsList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const filteredProducts = productos.filter(product => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        const matchName = product.name.toLowerCase().includes(lowerCaseSearch);
        const matchCategory = product.category.toLowerCase().includes(lowerCaseSearch);
        
        return matchName || matchCategory;
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={{ padding: '2rem' }}>
            
            {/* ENCABEZADO Y BUSCADOR */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ color: '#4d4646' }}>Productos</h1>
                
                {/* Contenedor del Input y el Botón */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o categoría..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{ padding: '0.6rem 1rem', borderRadius: '1rem', border: '1px solid #ccc', outline: 'none', minWidth: '280px' }}
                    />
                    
                    <Link to="/products/new" style={{ backgroundColor: '#1ea811', color: '#fff', padding: '0.6rem 1rem', borderRadius: '1rem', textDecoration: 'none', fontWeight: 'bold' }}>
                        + Agregar Producto
                    </Link>
                </div> {/* ✅ CORRECTO: El div se cierra DESPUÉS de envolver al input y al Link */}
            </header>

            {filteredProducts.length === 0 ? (
                // Si escriben algo que no existe (ej: "Pizza"), mostramos el aviso
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ color: '#4d4646' }}>No se encontraron productos que coincidan con "{searchTerm}"</h3>
                    <button onClick={() => setSearchTerm("")} style={{ marginTop: '1rem', backgroundColor: '#1ea811', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '1rem', cursor: 'pointer' }}>
                        Borrar búsqueda
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {filteredProducts.map(product => (
                        <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.8rem', backgroundColor: '#4d4646', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                                    {product.category}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: product.stock > 0 ? '#1ea811' : 'red', fontWeight: 'bold' }}>
                                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin Stock'}
                                </span>
                            </div>
                            <h3 style={{ color: '#4d4646', margin: '0.5rem 0' }}>{product.name}</h3>
                            <h2 style={{ color: '#1ea811', margin: '0' }}>${product.price}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};   

export default ProductsList;