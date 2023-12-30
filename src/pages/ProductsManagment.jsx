import { useState, useEffect } from "react";
import "./pagesStyles/ProductsManagment.css";
import 'primeicons/primeicons.css';
import BackArrow from '../assets/products-managment-back-icon.svg'
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductList from "../components/ProductsManagmentComponents/ProductList";
import {getProducts} from '../services/getProducts'

function ProductsManagment() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
    .then(data => {
      setProducts(data.results)
    })
  },[])

  return (
    <section className="products-managment-page">
      <section className = 'back-button-title-container'>
        <button className = "products-managment-go-back-button" onClick={() => history.back()}>
          <img src = {BackArrow}/>
        </button>
        <h3>Gestión de Productos</h3>
      </section>
      <ProductsManagmentFiltersBar/>
      <ProductList products={products}/>
    </section>
    );
}

export default ProductsManagment;
