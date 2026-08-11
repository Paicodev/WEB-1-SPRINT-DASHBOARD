import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CategoryView.css";

export default function CategoryView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const [category, setCategory] = useState({
        id: "",
        name: ""
    });

    const [editForm, setEditForm] = useState(category);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${API_URL}/api/categories/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    const categoryData = {
                        id: data.id.toString(),
                        name: data.name
                    };
                    setCategory(categoryData);
                    setEditForm(categoryData);
                }
            } catch (error) {
                console.error("Error al obtener categoría:", error);
            }
        };

        fetchCategory();
    }, [id, API_URL]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({
            ...editForm,
            name: e.target.value
        });
    };

    const handleCancelar = () => {
        navigate('/categories');
    };

    const handleGuardar = async () => {
        if (editForm.name.trim() === "") {
            alert("Debe ingresar un nombre de categoría.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editForm)
            });

            if (response.ok) {
                const updatedCategory = await response.json();
                setCategory(updatedCategory);
                setEditForm(updatedCategory);
                alert("¡Categoría actualizada con éxito!");
                navigate('/categories');
            } else {
                alert("No se pudo actualizar la categoría.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor.");
        }
    };

    const handleEliminar = async () => {
        if (!window.confirm("¿Deseas eliminar esta categoría permanentemente?")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/categories/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Categoría eliminada.");
                navigate("/categories");
            } else {
                alert("No se pudo eliminar la categoría.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor.");
        }
    };

    return (
        <div className="category-view-container">
            {/* HEADER */}
            <div className="category-view-header">
                <div>
                    <Link to="/categories" className="back-link">← Volver a Categorías</Link>
                    <h2>Modificar Categoría #{category.id}</h2>
                    <p className="subtitle-text">Actualiza el nombre de la categoría en el catálogo.</p>
                </div>
                <button type="button" className="btn-danger-pill" onClick={handleEliminar}>
                    🗑️ Eliminar
                </button>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={(e) => e.preventDefault()} className="category-form">
                <div className="form-group">
                    <label>Nombre de la Categoría *</label>
                    <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        placeholder="Ej: Indumentaria"
                        required
                    />
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancelar}>
                        Cancelar
                    </button>
                    <button type="button" className="btn-save" onClick={handleGuardar}>
                        💾 Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
}