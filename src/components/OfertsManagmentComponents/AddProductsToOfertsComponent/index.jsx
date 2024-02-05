import './index.css';
import { Dialog } from "primereact/dialog";
import { useState, useContext, useRef, useEffect } from "react";
import "primeicons/primeicons.css";
import ProductsGridForOfertManagment from '../ProductGrid';
import QueryFiltersContext from "../../../context/filtersContext";
import { useManageProducts } from "../../../hooks/useManageProducts";
import { Toast } from "primereact/toast";
import SearchProducts from '../SearchProducts';
import { addProductsToPromotion } from '../../../services/ManagePromotions/addProductsToOfert';
import AddIcon from "../../../assets/oferts-magnament-add.svg";
import { getProductsOfert } from '../../../services/ManagePromotions/getProductsOfert';
import { useGetProducts } from '../../../hooks/useGetProducts';

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
    const [search, setSearch] = useState('');
    const [numberOfProducts, setNumberOfProducts] = useState(0)
    const [typeOfSaerch,setTypeOfSaerch] = useState("search=")
    const{products,loadingProducts,next,previous} = useGetProducts({searchParams:`${typeOfSaerch}${search}`,setNumOfProducts:setNumberOfProducts})
    const [page,setPage] = useState(1);


    const searchChecked = (id) =>{
      for(let i = 0; i < checkedProducts.length; i++) {
          if(checkedProducts[i] === id){
              return true;
          }
      }
      return false;
    };

    const handleOnsearch = (searchValue) =>{
      setTypeOfSaerch("search=")
      setSearch(searchValue);
    }

    const handleOnChangeNext=()=>{
        console.log(page)
        if(next !=null){
          setTypeOfSaerch("page=")
          setPage(page + 1)
          setSearch(page)
        }
        
          
    }
    const handleOnChangePrevious=()=>{
      console.log(page)
      if(previous !=null ) {
          setTypeOfSaerch("page=")
          setPage(page - 1)
          setSearch(page)
        }
          
    }

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
            <SearchProducts search={search} onHandleChange={handleOnsearch}/>
          </div>
         
          <ProductsGridForOfertManagment 
            products={products}
            loading={loadingProducts}
            handleOnChangeChecked={handleOnChangeChecked}
            searchChecked={searchChecked}
            />
          <div className='btns-paginator-container ' >
              <button onClick={handleOnChangePrevious} >
                <i className='pi pi-angle-left' ></i>
             
              </button>
              <button onClick={handleOnChangeNext}>
                 <i className='pi pi-angle-right' ></i>
              </button>
          </div>
         <button
          className="add-products-button"
            onClick={() => {

              if (checkedProducts.length > 0) {
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