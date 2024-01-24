import { useState, useContext, useRef, useEffect } from "react";
import "./pagesStyles/ProductsManagment.css";
import "primeicons/primeicons.css";
import BackArrow from "../assets/products-managment-back-icon.svg";
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductList from "../components/ProductsManagmentComponents/ProductList";
import ProductsGrid from "../components/ProductsManagmentComponents/ProductsGrid";
import QueryFiltersContext from "../context/filtersContext";
import { useManageProducts } from "../hooks/useManageProducts";
import Paginator from "../components/Paginator";
import { Toast } from "primereact/toast";
import { useManageCategories } from "../hooks/useManageCategories";
import { getInitialValues, createProductInitialValues } from "../utils/productInitialValues";
import { useIsMobileMode } from "../hooks/useIsMobileMode";
import { useGetPromotions } from "../hooks/useGetPromotionsFromProducts";

function ProductsManagment() {
  const toast = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [listView, setListView] = useState(true);
  const {mobileMode} = useIsMobileMode({})
  const {promotions} = useGetPromotions()
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
    loadingProducts,
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
    setCategoryFormProperties:setCategoryFormProperties,
    searchParams:searchParams
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

  //effect to change the view type to grid or list depending of the mobileMode
  useEffect(() => {
    if(mobileMode){
      setListView(false)
    }
    else{
      setListView(true)
    }
  },[mobileMode])

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
        loadingProducts={loadingProducts}
        listView={listView}
        setListView = {setListView}
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
        promotions = {promotions}
      />
      {listView?
      <ProductList
        products={products}
        loading={loadingProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleDeleteProduct={handleDeleteProduct}
        processDetailProduct = {processDetailProduct}
        processUpdateProduct = {processUpdateProduct}
      />:
      <ProductsGrid 
        products={products}
        loading={loadingProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleDeleteProduct={handleDeleteProduct}
        processDetailProduct = {processDetailProduct}
        processUpdateProduct = {processUpdateProduct}
        />
      }
      <Paginator
        numOfProducts={numOfProducts}
        setFilter={setFilter}
        getActiveFilter={getActiveFilter}
        products={products}
      />
    </section>
  );
}

export default ProductsManagment;
