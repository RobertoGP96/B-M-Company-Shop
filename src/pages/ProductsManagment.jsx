import { useState } from "react";
import "./pagesStyles/ProductsManagment.css";
import 'primeicons/primeicons.css';
import BackArrow from '../assets/products-managment-back-icon.svg'
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";


function ProductsManagment() {
  
  return (
    <section className="products-managment-page">
      <section className = 'back-button-title-container'>
        <button className = "products-managment-go-back-button" onClick={() => history.back()}>
          <img src = {BackArrow}/>
        </button>
        <h3>Gestión de Productos</h3>
      </section>
      <ProductsManagmentFiltersBar/>
    </section>
    );
}

export default ProductsManagment;
