import { useState, useEffect } from "react";
import { getCategories } from "../../services/getCategories";
import Loader from "../Loader";
import "./index.css";

function CategorieSideBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className = "categories-side-bar">
      <h2>Categorias</h2>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.nombre}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CategorieSideBar;
