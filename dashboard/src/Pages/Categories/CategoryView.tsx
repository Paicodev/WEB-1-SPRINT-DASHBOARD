import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CategoryView.css";

export default function CategoryView() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        id: "",
        name: ""
    });

    const [editForm, setEditForm] = useState(category);

    useEffect(() => {

        const fetchCategory = async () => {

            try {

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`);

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

                console.error(error);

            }

        };

        fetchCategory();

    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setEditForm({
            ...editForm,
            name: e.target.value
        });

    };

    const handleCancelar = () => {

        setEditForm(category);

    };

    const handleGuardar = async () => {

        if (editForm.name.trim() === "") {

            alert("Debe ingresar un nombre.");
            return;

        }

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {

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

                alert("Categoría actualizada.");

            } else {

                alert("No se pudo actualizar.");

            }

        } catch (error) {

            console.error(error);
            alert("Error de conexión.");

        }

    };

    const handleEliminar = async () => {

        if (!window.confirm("¿Eliminar esta categoría?")) {
            return;
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`, {

                method: "DELETE"

            });

            if (response.ok) {

                alert("Categoría eliminada.");
                navigate("/categories");

            } else {

                alert("No se pudo eliminar.");

            }

        } catch (error) {

            console.error(error);
            alert("Error de conexión.");

        }

    };

    return (

        <div className="product-view-container">

            <div className="product-view-header">

                <h2>

                    <Link to="/categories">
                        Categorías
                    </Link>

                    {" > "}#{category.id}

                </h2>

                <button
                    className="btn-danger-pill"
                    onClick={handleEliminar}
                >
                    Eliminar
                </button>

            </div>

            <div className="product-form-container">

                <h3>Información</h3>

                <div className="form-group">

                    <label>Nombre</label>

                    <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-actions">

                    <button
                        className="btn-cancel"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-save"
                        onClick={handleGuardar}
                    >
                        Guardar Cambios
                    </button>

                </div>

            </div>

        </div>

    );

}