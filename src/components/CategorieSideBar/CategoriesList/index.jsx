import Loader from "../../Loader";
import "./index.css";
import CloseIcon from '../../../assets/close-icon.svg'

function CategoriesList({
  categories,
  loading,
  setActiveCategory,
  setFilter,
  activeCategory,
  showPromotionsModal,
  getActiveFilter
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
            <span onClick = {() => showPromotionsModal(true)}>Ofertas</span>
            {getActiveFilter("promotion") !== ""?
              <div className = "clear-promotion-filter" onClick = {() => setFilter({name: "promotion", value:""})}><img src = {CloseIcon} alt = "close"/></div>:<div></div>
            }
          </li>
        </ul>
      )}
    </section>
  );
}

export default CategoriesList;
