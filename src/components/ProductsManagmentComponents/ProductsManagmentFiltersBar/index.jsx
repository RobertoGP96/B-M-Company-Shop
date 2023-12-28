import "./index.css";
import Search from "../../Search";
import CategoriesManagment from "../CategoriesManagment";
import ViewToggleGrid from "../../../assets/view-toggle-grid.svg";
import ViewToggleList from "../../../assets/view-toggle-list.svg";
import { useState } from "react";
import FiltersModal from "../FiltersModal";
import AddProductIcon from '../../../assets/add-product-icon.svg';
import RemoveProductIcon from '../../../assets/remove-product-icon.svg';

function ProductsManagmentFiltersBar() {
  const [listViewType, setListViewType] = useState(true);
  return (
    <section className="products-managment-filters-bar">
      <div className="search-container">
        <Search />
      </div>
      <div className="categories-managment-button-container">
        <CategoriesManagment />
      </div>
      <div className="view-toggle-container">
        <span>Vista:</span>
        <img
          src={listViewType ? ViewToggleList : ViewToggleGrid}
          onClick={() => setListViewType(!listViewType)}
        />
      </div>
      <div className = "filters-modal-button-container">
        <FiltersModal/>
      </div>
      <div className = "add-product-button-container">
        <button className = "products-managment-filters-bar-button">
            <img src = {AddProductIcon}/>
            <span>Agregar</span>
        </button>
      </div>
      <div className = "remove-product-button-container">
        <button className = "products-managment-filters-bar-button">
            <img src = {RemoveProductIcon}/>
            <span>Eliminar</span>
        </button>
      </div>
    </section>
  );
}

export default ProductsManagmentFiltersBar;
