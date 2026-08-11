import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CategoriesList.css";

interface Category {
  id: number;
  name: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-list-container">
      <header
        className={`products-list-header ${
          isSearchActive ? "search-active" : ""
        }`}
      >
        <h1 className="header-title">Categorías</h1>

        <div className="header-actions">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
          />

          <Link to="/categories/new" className="add-button">
            <span className="add-button-icon">+</span>
            <span className="add-button-text">
              Agregar Categoría
            </span>
          </Link>
        </div>
      </header>

      <div className="products-list-content">
        {loading ? (
          <div className="loading-message">
            Cargando...
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  onClick={() =>
                    navigate(`/categories/${category.id}`)
                  }
                >
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredCategories.length === 0 && (
          <div className="no-results-message">
            No se encontraron categorías.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;