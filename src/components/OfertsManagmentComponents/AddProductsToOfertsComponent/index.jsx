import { Dialog } from "primereact/dialog";
import { useState, useContext, useRef, useEffect } from "react";
import "primeicons/primeicons.css";
import ProductsManagmentFiltersBar from "../../ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductsGrid from "../../ProductsManagmentComponents/ProductsGrid";
import QueryFiltersContext from "../../../context/filtersContext";
import { useManageProducts } from "../../../hooks/useManageProducts";
import Paginator from "../../Paginator";
import { Toast } from "primereact/toast";
import { useManageCategories } from "../../../hooks/useManageCategories";
import { getInitialValues,createProductInitialValues } from "../../../utils/productInitialValues";
import { useIsMobileMode } from "../../../hooks/useIsMobileMode";
import { useGetPromotions } from "../../../hooks/useGetPromotionsFromProducts";


function AddProductsToOferts({visible,onHide}){
    const toast = useRef(null);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const { searchParams, setFilter, getActiveFilter, removeAllFilters } =
    useContext(QueryFiltersContext);
  
    //product form properties state

  
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
    } = useManageProducts({
      searchParams: searchParams,
      toastRef: toast,
      setSelectedProducts: setSelectedProducts,
      resetProductFormProperties: resetProductFormProperties,
      removeAllFilters:removeAllFilters
    });
  


    return(
        <Dialog
            visible={visible}
            onHide={() =>onHide()}
        >
            <Toast ref={toast} position="bottom-center" />


      <ProductsGrid 
        products={products}
        loading={loadingProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        />
      <Paginator
        numOfProducts={numOfProducts}
        setFilter={setFilter}
        getActiveFilter={getActiveFilter}
        products={products}
      />

    </Dialog>
    )
}

export default AddProductsToOferts;