import Loader from "../../Loader";
import "./index.css";

function CategoriesList({
  categories,
  loading,
  setActiveCategory,
  setFilter,
  activeCategory,
}) {
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
            className={activeCategory === "" ? "category-selected" : null}
            onClick={() => {
              setActiveCategory("");
              setFilter({ name: "categoria", value: "" });
            }}
          >
            <span>Todas</span>
          </li>
          {categories.map((category) => (
            <li
              className={
                parseInt(category.id) === parseInt(activeCategory)
                  ? "category-selected"
                  : null
              }
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setFilter({ name: "categoria", value: category.id });
              }}
            >
              <span>{category.nombre}</span>
            </li>
          ))}
          <li className="ofers-category">
            <span>Ofertas</span>
          </li>
        </ul>
      )}
    </section>
  );
}

export default CategoriesList;
