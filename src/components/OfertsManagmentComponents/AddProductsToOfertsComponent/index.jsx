import './index.css';
import { Dialog } from "primereact/dialog";
import { useState, useContext, useRef, useEffect } from "react";
import "primeicons/primeicons.css";
import ProductsGridForOfertManagment from '../ProductGrid';
import QueryFiltersContext from "../../../context/filtersContext";
import { useManageProducts } from "../../../hooks/useManageProducts";
import Paginator from "../../Paginator";
import { Toast } from "primereact/toast";
import { getInitialValues } from "../../../utils/productInitialValues";
import Search from "../../Search";

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
      <div className="addProductsToOferts-search-container">
         <Search/>
      </div>
       
      <ProductsGridForOfertManagment 
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