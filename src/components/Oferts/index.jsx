import React from "react";
import "./index.css"
import ProductCard from "../ProductCard";

function Oferts(){
    return(
        <div className="ofertsConteiner">
            <div className="dividerConteiner">
                <h3 style={{display:"inline"}}>Ofertas</h3>
                <hr className="divider"/>
            </div>
            <div className="oferts">
                <div className="cardOferts-Conteiner" >
                    <ProductCard id={" "} precio={2} product_name={" "}/>
                    <ProductCard id={" "} precio={3} product_name={" "}/>
                    <ProductCard id={" "} precio={4} product_name={" "}/>
                    <ProductCard id={" "} precio={5} product_name={" "}/>                  
                </div>
           
            </div>
            <div className="dividerConteiner">
                <h3 style={{display:"inline"}}>Últimos Añadidos</h3>
                <hr className="divider"/>
            </div>
            <div className="oferts">
               
                <div className="cardOferts-Conteiner" >
                    <ProductCard id={" "} precio={6} product_name={" "}/>
                    <ProductCard id={" "} precio={7} product_name={" "}/>
                    <ProductCard id={" "} precio={8} product_name={" "}/>
                    <ProductCard id={" "} precio={9} product_name={" "}/>                  
                </div>
           
            </div>
            
        </div>
    )

}

export default Oferts;