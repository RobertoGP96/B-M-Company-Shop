import "./index.css";
import Search from "../../Search";
import CategoriesManagment from "../CategoriesManagment/index";
import ViewToggleGrid from "../../../assets/view-toggle-grid.svg";
import ViewToggleList from "../../../assets/view-toggle-list.svg";
import { useState } from "react";
import FiltersModal from "../FiltersModal";
import AddProductIcon from "../../../assets/add-product-icon.svg";
import RemoveProductIcon from "../../../assets/remove-product-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";
import ProductForm from "../ProductForm";

function ProductsManagmentFiltersBar({
  categories,
  loadingCategories,
  selectedProducts,
  selectedCategories,
  setSelectedCategories,
  handleDeleteMultipleProducts,
  resetProductFormProperties,
  setProductFormProperties,
  categoryFormProperties, 
  setCategoryFormProperties,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleDeleteMultipleCategories,
  productFormProperties,
  handleCreateProduct,
  handleUpdateProduct,
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
          loadingCategories={loadingCategories}
          categories = {categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categoryFormProperties = {categoryFormProperties}
          setCategoryFormProperties = {setCategoryFormProperties}
          handleCreateCategory = {handleCreateCategory}
          handleUpdateCategory = {handleUpdateCategory}
          handleDeleteCategory = {handleDeleteCategory}
          handleDeleteMultipleCategories = {handleDeleteMultipleCategories}
          />
        <ProductForm
        productFormProperties={productFormProperties}
        resetProductFormProperties={resetProductFormProperties}
        handleCreateProduct = {handleCreateProduct}
        handleUpdateProduct = {handleUpdateProduct}
        categories={categories}
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
        <FiltersModal 
        categories = {categories} loadingCategories = {loadingCategories}/>
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
