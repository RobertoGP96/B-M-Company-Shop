import { useState, useEffect, useContext } from "react";
import { getCategories } from "../../services/getCategories";
import Loader from "../Loader";
import "./index.css";
import QueryFilterContext from "../../context/filtersContext";
import {getActiveFilter} from '../../utils/getActiveFilter'

function CategorieSideBar(){
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setFilter } = useContext(QueryFilterContext);

  useEffect(() => {
    setLoading(true);
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
      setActiveCategory(getActiveFilter("categoria"))
    });
  }, []);

  return (
    <section className="categories-side-bar">
      <h2>Categorias</h2>
      {loading ? (
        <div className="categories-loader-container">
          <Loader />
        </div>
      ) : (
        <ul>
          <li
              className = {activeCategory === ""?"category-selected":null}
              onClick={() =>
                {
                setActiveCategory("")
                setFilter({ name: "categoria", value: "" })
                }
              }
            >
              <span>Todas</span>
            </li>
          {categories.map((category) => (
            <li
              className = {parseInt(category.id) === parseInt(activeCategory)?"category-selected":null}
              key={category.id}
              onClick={() =>
                {
                setActiveCategory(category.id)
                setFilter({ name: "categoria", value: category.id })
                }
              }
            >
              <span>{category.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CategorieSideBar;
