import React, { useState } from "react";
import "./NewCategory.css";

export default function NewCategory() {

    const [category, setCategory] = useState({
        name: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setCategory({
            name: e.target.value
        });

    };

    const handleCancel = () => {

        setCategory({
            name: ""
        });

    };

    const handleSave = async () => {

        if(category.name.trim() === ""){

            alert("Debe ingresar un nombre.");
            return;

        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try{

            const response = await fetch(`${API_URL}/api/categories`,{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(category)

            });

            if(response.ok){

                alert("Categoría creada correctamente.");
                handleCancel();

            }else{

                alert("No se pudo crear la categoría.");

            }

        }catch(error){

            console.error(error);
            alert("Error de conexión.");

        }

    };

    return(

        <div className="new-product-container">

            <h2>Dar de alta una nueva categoría</h2>

            <form>

                <div className="form-group">

                    <label>Nombre</label>

                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
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
                        Guardar Categoría
                    </button>

                </div>

            </form>

        </div>

    );

}