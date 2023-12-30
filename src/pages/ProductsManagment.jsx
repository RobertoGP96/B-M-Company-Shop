import { useState, useEffect, useContext } from "react";
import "./pagesStyles/ProductsManagment.css";
import 'primeicons/primeicons.css';
import BackArrow from '../assets/products-managment-back-icon.svg'
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductList from "../components/ProductsManagmentComponents/ProductList";
import {getProducts} from '../services/getProducts'
import QueryFiltersContext from "../context/filtersContext";

function ProductsManagment() {
  const [products, setProducts] = useState([])
  const [numOfProducts, setNumOfProducts] = useState(0)
  const [loading, setLoading] = useState(false)
  const {searchParams, setFilter, getActiveFilter} = useContext(QueryFiltersContext)

  //get products 
  useEffect(() => {
    setLoading(true);
    getProducts(searchParams)
      .then((data) => {
        setProducts(data.results);
        setNumOfProducts(data.count)
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNumOfProducts(0)
      });
  }, [searchParams]);

  return (
    <section className="products-managment-page">
      <section className = 'back-button-title-container'>
        <button className = "products-managment-go-back-button" onClick={() => history.back()}>
          <img src = {BackArrow}/>
        </button>
        <h3>Gestión de Productos</h3>
      </section>
      <ProductsManagmentFiltersBar/>
      <ProductList 
        products={products} 
        numOfProducts = {numOfProducts} 
        setFilter={setFilter} 
        getActiveFilter={getActiveFilter}
        loading={loading}
        />
    </section>
    );
}

export default ProductsManagment;
