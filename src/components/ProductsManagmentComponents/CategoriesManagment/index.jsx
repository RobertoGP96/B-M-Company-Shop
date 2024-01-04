import TagIcon from "../../../assets/tag-icon.svg";
import "./index.css";
import { useState } from "react";
import React from "react";
import CategoriesManagmentModal from "./CategoriesManagmentModal";

function CategoriesManagment({ toastRef, setUpdateProducts, removeAllFilters }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <section>
      <button
        className="products-managment-filters-bar-button btn-general-styles"
        onClick={() => setShowModal(true)}
      >
        <img src={TagIcon} />
        <span>Categorias</span>
      </button>
      <CategoriesManagmentModal
        show={showModal}
        setShow={setShowModal}
        toastRef={toastRef}
        setUpdateProducts={setUpdateProducts}
        removeAllFilters={removeAllFilters}
      />
    </section>
  );
}

export default CategoriesManagment;
