import "./index.css";
import Search from "../../Search";
import CategoriesManagment from "../CategoriesManagment";
import ViewToggleGrid from "../../../assets/view-toggle-grid.svg";
import ViewToggleList from "../../../assets/view-toggle-list.svg";
import { useState } from "react";
import FiltersModal from "../FiltersModal";
import AddProductIcon from "../../../assets/add-product-icon.svg";
import RemoveProductIcon from "../../../assets/remove-product-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";

function ProductsManagmentFiltersBar({
  selectedProducts,
  handleDeleteMultipleProducts,
  toastRef,
  setUpdateProducts,
  removeAllFilters,
  setProductFormProperties
}) {
  const [listViewType, setListViewType] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  return (
    <section className="products-managment-filters-bar">
      <ConfirmDialog
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        acceptClassName="p-button-danger"
        acceptLabel="Aceptar"
        rejectLabel="Cancelar"
        message="Deseas continuar con la operación?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={() => handleDeleteMultipleProducts(selectedProducts)}
      />
      <div className="search-container">
        <Search />
      </div>
      <div className="categories-managment-button-container">
        <CategoriesManagment
          toastRef={toastRef}
          setUpdateProducts={setUpdateProducts}
          removeAllFilters={removeAllFilters}
        />
      </div>
      <div className="view-toggle-container">
        <span>Vista:</span>
        <img
          src={listViewType ? ViewToggleList : ViewToggleGrid}
          onClick={() => setListViewType(!listViewType)}
        />
      </div>
      <div className="filters-modal-button-container">
        <FiltersModal />
      </div>
      <div className="add-product-button-container">
        <button className="products-managment-filters-bar-button btn-general-styles" onClick={() => setProductFormProperties(prev => ({...prev,show:true}))}>
          <img src={AddProductIcon} />
          <span>Agregar</span>
        </button>
      </div>
      <div className="remove-product-button-container">
        <button
          className="products-managment-filters-bar-button btn-general-styles"
          onClick={() => setShowConfirmDialog(true)}
        >
          <img src={RemoveProductIcon} />
          <span>Eliminar</span>
        </button>
      </div>
    </section>
  );
}

export default ProductsManagmentFiltersBar;
