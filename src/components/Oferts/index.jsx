import React from "react";
import "./index.css"
import ProductCard from "../ProductCard";
import { useState } from "react";
import Loader from "../Loader"
import 'primeicons/primeicons.css';
import ProductDetails from "../ProductDetails";

function Oferts({lastAded, recomendedProducts,load1,load2,activateProductdetails}){    
    const [showAll1,setShowAll1] = useState(false)
    const [showAll2,setShowAll2] = useState(false)
 
   

    const handdleOnClickButton1 = ()=>{
        setShowAll1(!showAll1)

    }
    const handdleOnClickButton2 = ()=>{
        setShowAll2(!showAll2)
    }

    return(
        <section title="Seccion de ofertas" className="oferts-conteiner">

            <div className="divider-conteiner">
                <h3 style={{display:"inline"}}>Ofertas Recomendadas</h3>
                <hr className="divider"/>
            </div>

            <article title="Productos Recomendados" >
                <div className={showAll1?"oferts expanded":"oferts"}>
                    {   !load1 ?
                        recomendedProducts.map((products,index)=>(
                            <ProductCard 
                                className={"item"}
                                id={products.id} 
                                precio={products.precio} 
                                product_name={products.product_name}
                                key={index}
                                product_img1={products.product_img1}
                                onClick = {()=>activateProductdetails(products)}
                            />
                        ))   
                        
                        : <div className = "loader-container"><Loader/></div>
                    }
                </div>

                <div className="button-container">
                    <button 
                        title={showAll1?"Ver menos":"Ver mas"}
                        onClick = {handdleOnClickButton1} 
                        className={showAll1?"showAll-button button-active":"showAll-button"} 
                     >
                        <i className={showAll1?"pi pi-chevron-up":"pi pi-chevron-down"} style={{ fontSize: '1.3rem' }}></i>
                    </button>     
                </div>     
            </article>

            <div className="divider-conteiner">
                <h3 style={{display:"inline"}}>Últimos Añadidos</h3>
                <hr className="divider"/>
            </div>

            <article title="Últimos Añadidos" >     
                <div className={showAll2?"oferts expanded":"oferts"} >
                    { !load2?
                        lastAded.map((products,index)=>(
                            <ProductCard id={products.id} 
                                precio={products.precio} 
                                product_name={products.product_name}
                                product_img1={products.product_img1}
                                key={index}
                                onClick = {()=>activateProductdetails(products)}
                            />
                        ))
                        : <div className = "loader-container"><Loader/></div>   
                    }
                </div>

                <div className="button-container">
                     <button 
                        title={showAll2?"Ver menos":"Ver mas"}
                        onClick = {handdleOnClickButton2} 
                        className={showAll2?"showAll-button button-active2":"showAll-button"}
                    >   
                        <i className={showAll2?"pi pi-chevron-up":"pi pi-chevron-down"} style={{ fontSize: '1.2rem' }}></i>
                    </button>  
                </div>  
           
            </article>


        </section>
    )

}

export default Oferts;