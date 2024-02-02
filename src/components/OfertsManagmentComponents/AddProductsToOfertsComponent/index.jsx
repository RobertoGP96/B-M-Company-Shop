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
import { addProductsToPromotion } from '../../../services/ManagePromotions/addProductsToOfert';
import AddIcon from "../../../assets/oferts-magnament-add.svg";
import { getProductsOfert } from '../../../services/ManagePromotions/getProductsOfert';


const heaerTitle =(info) => {
  return(
    <div style={{display:"flex", alignItems:"center",gap:"10px"}}> 
      <i className="pi pi-tag "></i>
      <p style={{marginBlock:"0px",fontSize:"1rem"}}>{info}</p>
    </div>
  )
}


function AddProductsToOferts({visible,onHide,show,idPromotion,setProductOferts}){
    const toast = useRef(null);
    const [checkedProducts, setCheckedProducts] = useState([]);
   
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
      resetProductFormProperties: resetProductFormProperties,
      removeAllFilters:removeAllFilters
    });
  
    const searchChecked = (id) =>{
      for(let i = 0; i < checkedProducts.length; i++) {
          if(checkedProducts[i] === id){
              return true;
          }
      }
      return false;
    };

    const handleOnChangeChecked = (data) =>{
      var aux = [];
       if(checkedProducts.length > 0){
       for(let i = 0; i < checkedProducts.length; i++) {
           if(checkedProducts[i] !== data.id){
              aux.push(checkedProducts[i]);
           }
       }
           if(aux.length == checkedProducts.length){ 
              aux.push(data.id);
           }
           setCheckedProducts(aux);
       }else{
           aux.push(data.id)
           setCheckedProducts(aux);
       }
   };

    return(
        <Dialog
              visible={visible}
              onHide={() =>{
                onHide()
                setCheckedProducts([])
              }}
              className='addProductsToOferts-container'
              header  = {heaerTitle("Añadir productos")}
        >
              <Toast ref={toast} position="bottom-center" />
          <div className="addProductsToOferts-search-container">
            <Search/>
          </div>
         
          <ProductsGridForOfertManagment 
            products={products}
            loading={loadingProducts}
            handleOnChangeChecked={handleOnChangeChecked}
            searchChecked={searchChecked}
            />
          <Paginator
            numOfProducts={numOfProducts}
            setFilter={setFilter}
            getActiveFilter={getActiveFilter}
            products={products}
          />
         <button
          className="add-products-button"
            onClick={() => {

              if (checkedProducts.length > 0) {
                console.log(checkedProducts)
                addProductsToPromotion({products:checkedProducts,id:idPromotion}).then(() => {
                  getProductsOfert(idPromotion).then((products) =>{
                    setProductOferts(products.results)
                  })
                  show("Acción completada","success")
                });
              }
                
              else show("Debe seleccionar almenos un elemento", "warn");
            }}
            >
          <img src={AddIcon} alt="delete" width={"13px"} />
          <p>Añadir</p>
        </button>
        </Dialog>
      
   
       
    )
}

export default AddProductsToOferts;