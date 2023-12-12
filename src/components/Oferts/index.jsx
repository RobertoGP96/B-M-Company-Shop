import React from "react";
import "./index.css"
import ProductCard from "../ProductCard";

function Oferts(){
    return(
        <div className="ofertsConteiner">
            <div className="oferts">
                <h3 style={{display:"inline",position:"absolute",top:"-35px",left:"0"}}>Ofertas</h3>
                <div className="cardOferts-Conteiner" >
                    <ProductCard id={" "} precio={2} product_name={" "}/>
                    <ProductCard id={" "} precio={3} product_name={" "}/>
                    <ProductCard id={" "} precio={4} product_name={" "}/>
                    <ProductCard id={" "} precio={5} product_name={" "}/>                  
                </div>
           
            </div>
            
            <div className="oferts">
                <h3 style={{display:"inline",position:"absolute",top:"-35px",left:"0"}}>Últimos Añadidos</h3>
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