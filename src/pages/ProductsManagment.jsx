import { useState, useContext, useRef } from "react";
import "./pagesStyles/ProductsManagment.css";
import "primeicons/primeicons.css";
import BackArrow from "../assets/products-managment-back-icon.svg";
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductList from "../components/ProductsManagmentComponents/ProductList";
import QueryFiltersContext from "../context/filtersContext";
import { useManageProducts } from "../hooks/useManageProducts";
import { Toast } from "primereact/toast";
import { useManageCategories } from "../hooks/useManageCategories";
import { getInitialValues, createProductInitialValues } from "../utils/productInitialValues";

function ProductsManagment() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { searchParams, setFilter, getActiveFilter, removeAllFilters } =
  useContext(QueryFiltersContext);

  //product form properties state
  const [productFormProperties, setProductFormProperties] = useState({
    show: false,
    initialValues: null,
    disabled: false,
    creatingMode: true,
    initialValues: getInitialValues(),
  });

  //categories form properties state
  const [categoryFormProperties, setCategoryFormProperties] = useState({
    show:false,
    initialValues:null,
    disabled:false,
    creatingMode:true
  })

  //function to reset the product Form Properties
  function resetProductFormProperties(){
    setProductFormProperties((prev) => ({
      ...prev,
      show: false,
      creatingMode: true,
      disabled: false,
      initialValues: getInitialValues(),
    }));
  }

  //products managment hook
  const {
    products,
    loading,
    numOfProducts,
    handleDeleteProduct,
    handleDeleteMultipleProducts,
    setUpdateProducts,
    handleUpdateProduct,
    handleCreateProduct
  } = useManageProducts({
    searchParams: searchParams,
    toastRef: toast,
    setSelectedProducts: setSelectedProducts,
    resetProductFormProperties: resetProductFormProperties,
    removeAllFilters:removeAllFilters
  });

  //categories managment hook
  const {
    categories,
    loadingCategories,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
    handleCreateCategory,
    handleUpdateCategory
  } = useManageCategories({
    toastRef: toast,
    setUpdateProducts: setUpdateProducts,
    setSelectedCategories: setSelectedCategories,
    removeAllFilters: removeAllFilters,
    setCategoryFormProperties:setCategoryFormProperties
  });

  function processUpdateProduct(product) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: false,
      initialValues: createProductInitialValues({product: product}),
    }));
  }

  function processDetailProduct(product) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: true,
      initialValues: createProductInitialValues({product: product}),
    }));
  }

  return (
    <section className="products-managment-page">
      <Toast ref={toast} position="bottom-center" />
      <section className="back-button-title-container">
        <button
          className="products-managment-go-back-button btn-general-styles"
          onClick={() => history.back()}
        >
          <img src={BackArrow} />
        </button>
        <h3>Gestión de Productos</h3>
      </section>
      <ProductsManagmentFiltersBar
        loadingCategories={loadingCategories}
        categories = {categories}
        handleDeleteMultipleProducts={handleDeleteMultipleProducts}
        selectedProducts={selectedProducts}
        selectedCategories = {selectedCategories}
        toastRef={toast}
        setUpdateProducts={setUpdateProducts}
        removeAllFilters={removeAllFilters}
        categoryFormProperties = {categoryFormProperties}
        resetProductFormProperties={resetProductFormProperties}
        setProductFormProperties={setProductFormProperties}
        setSelectedCategories={setSelectedCategories}
        setCategoryFormProperties = {setCategoryFormProperties}
        handleCreateCategory = {handleCreateCategory}
        handleUpdateCategory = {handleUpdateCategory}
        handleDeleteCategory = {handleDeleteCategory}
        handleDeleteMultipleCategories={handleDeleteMultipleCategories}
        productFormProperties={productFormProperties}
        handleCreateProduct = {handleCreateProduct}
        handleUpdateProduct = {handleUpdateProduct}
      />
      <ProductList
        products={products}
        numOfProducts={numOfProducts}
        setFilter={setFilter}
        getActiveFilter={getActiveFilter}
        loading={loading}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleDeleteProduct={handleDeleteProduct}
        processDetailProduct = {processDetailProduct}
        processUpdateProduct = {processUpdateProduct}
      />
    </section>
  );
}

export default ProductsManagment;
