import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/auth";
import "./NewCategory.css";

export default function NewCategory() {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({
            name: e.target.value
        });
    };

    const handleCancel = () => {
        navigate('/categories');
    };

    const handleSave = async () => {
        if(category.name.trim() === ""){
            alert("Debe ingresar un nombre para la categoría.");
            return;
        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try{
            const response = await authFetch(`${API_URL}/api/categories`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            });

            if(response.ok){
                alert("¡Categoría creada correctamente!");
                navigate('/categories');
            }else{
                alert("No se pudo crear la categoría.");
            }
        }catch(error){
            console.error("Error al crear categoría:", error);
            alert("Error de conexión con el backend.");
        }
    };

    return(
        <div className="new-category-container">
            <div className="new-category-header">
                <Link to="/categories" className="back-link">← Volver a Categorías</Link>
                <h2>Dar de alta una nueva categoría</h2>
                <p className="subtitle-text">Ingresa el nombre de la nueva categoría para el catálogo.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="new-category-form">
                <div className="form-group">
                    <label>Nombre de la Categoría *</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        placeholder="Ej: Computación"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="btn-save"
                        onClick={handleSave}
                    >
                        💾 Guardar Categoría
                    </button>
                </div>
            </form>
        </div>
    );
}
