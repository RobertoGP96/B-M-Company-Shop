import React from "react";
import "./index.css"
import ProductCard from "../ProductCard";
import { useState } from "react";

function Oferts({lastAded, recomendedProducts}){    
    const [showAll1,setShowAll1] = useState(false)
    const [showAll2,setShowAll2] = useState(false)

    const handdleOnClickButton1 = ()=>{
        setShowAll1(!showAll1)

    }
    const handdleOnClickButton2 = ()=>{
        setShowAll2(!showAll2)
    }

    return(
        <section title="Seccion de ofertas" className="ofertsConteiner">
            <div className="dividerConteiner">
                <h3 style={{display:"inline"}}>Ofertas Recomendadas</h3>
                <hr className="divider"/>
            </div>
            <article title="Productos Recomendados" className={showAll1?"allOferts":"oferts"}>
                {
                    recomendedProducts.map((products,index)=>(
                        <ProductCard id={products.id} 
                            precio={products.precio} 
                            product_name={products.product_name}
                            key={index}
                            product_img1={products.product_img1}
                        />
                    ))   
                }
                <button 
                    onClick = {handdleOnClickButton1} 
                    className={showAll1?"showAll-button button-active":"showAll-button"} 
                >
                    {
                       showAll1?" Ver menos...":"Ver mas..."
                    }
                </button>                
            </article>
            <div className="dividerConteiner">
                <h3 style={{display:"inline"}}>Últimos Añadidos</h3>
                <hr className="divider"/>
            </div>
            <article title="Últimos Añadidos" style={{paddingBottom:"10px"}} className={showAll2?"allOferts":"oferts"}>          
                {
                    lastAded.map((products,index)=>(
                        <ProductCard id={products.id} 
                            precio={products.precio} 
                            product_name={products.product_name}
                            product_img1={products.product_img1}
                            key={index}
                        />
                    ))   
                }   
                <button 
                    onClick = {handdleOnClickButton2} 
                    className={showAll2?"showAll-button button-active2":"showAll-button"}
                >   
                    {
                       showAll2?" Ver menos...":"Ver mas..."
                    }
                </button>             
            </article>
        </section>
    )

}

export default Oferts;