import React from "react";
import { useState, useEffect, useContext, Suspense } from "react";
import { getCategories } from "../../services/getCategories";
import QueryFilterContext from "../../context/filtersContext";
import CategoryIcon from "../../assets/category-icon.svg";
import CategoriesList from "./CategoriesList";
import { Dialog } from "primereact/dialog";
import { useIsMobileMode } from "../../hooks/useIsMobileMode";
import "./index.css";

function CategorieSideBar({forceMobileMode = false}) {
  const {mobileMode} = useIsMobileMode({forceMobileMode:forceMobileMode})
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setFilter, getActiveFilter } = useContext(QueryFilterContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
      setActiveCategory(getActiveFilter("categoria"));
    });
  }, []);

  function handleSetActiveCategory(category) {
    setActiveCategory(category);
    setShowModal(false);
  }

  function getActiveCategoryName(){
    const matchedCategory = categories.find(category => category.id == getActiveFilter("categoria"));
    return matchedCategory !== undefined && matchedCategory !== null ? matchedCategory.nombre : "Categorias"
  }

  return (
    <>
      {forceMobileMode === true || mobileMode === true? (
        <section className="mobile-mode-categories-container">
          <h3 className="h3-title">Productos</h3>
          <button
            onClick={() => setShowModal(true)}
            className="show-categories-modal-button btn-general-styles"
          >
            <span>{getActiveCategoryName()}</span>
            <img src={CategoryIcon} />
          </button>
            <Dialog
              contentClassName="categories-mobile-modal-content"
              visible={showModal}
              position="top"
              showHeader={false}
            >
              <button
                className="modal-close-button btn-general-styles"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
                <CategoriesList
                  categories={categories}
                  loading={loading}
                  setActiveCategory={handleSetActiveCategory}
                  setFilter={setFilter}
                  activeCategory={activeCategory}
                />
            </Dialog>
        </section>
      ) :(
          <CategoriesList
            categories={categories}
            loading={loading}
            setActiveCategory={handleSetActiveCategory}
            setFilter={setFilter}
            activeCategory={activeCategory}
          />
      )}
    </>
  );
}

export default CategorieSideBar;
