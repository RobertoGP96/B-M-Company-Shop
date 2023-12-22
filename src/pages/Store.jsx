import CategorieSideBar from "../components/CategorieSideBar";
import ProductsGrid from "../components/ProductsGrid";
import SearchProduct from "../components/SearchProduct";
import './pagesStyles/Store.css'
import ProductDetails from "../components/ProductDetails";
import { useState,useEffect } from "react";

function Store() {  
    const [activeProductDetails, setActiveProductDetails] = useState(false);
    const [data,setdata] = useState([]);

    useEffect(() => {
        if(document.body.style.overflow !== 'hidden'){
            document.body.style.overflow = activeProductDetails ? 'hidden' : 'auto';
            return () => {
            document.body.style.overflow = 'auto';
        }
        };
      }, [activeProductDetails]);
  
    const handleOnactivateProductdetails = (products) => {
        setdata(products);
        setActiveProductDetails(true); 
    }
    return ( 
        <section className = {"store-page"}>
            <aside><CategorieSideBar/></aside>
            <search><SearchProduct/></search>
            <main><ProductsGrid  activateProductdetails={handleOnactivateProductdetails}/></main>
            <ProductDetails active={activeProductDetails} onHide={()=>setActiveProductDetails(false)} data={data}/> 
        </section>
     );
}

export default Store;
