import { useState, useEffect } from 'react';

export interface Category {
  id: number;
  name: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          console.error("Error al obtener categorías:", response.status);
        }
      } catch (error) {
        console.error("Error de red al cargar categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [API_URL]);

  return { categories, loading };
}

export default useCategories;
