import { useState, useEffect, useContext, useRef } from "react";
import "./pagesStyles/ProductsManagment.css";
import 'primeicons/primeicons.css';
import BackArrow from '../assets/products-managment-back-icon.svg'
import ProductsManagmentFiltersBar from "../components/ProductsManagmentComponents/ProductsManagmentFiltersBar";
import ProductList from "../components/ProductsManagmentComponents/ProductList";
import {getProducts} from '../services/getProducts'
import QueryFiltersContext from "../context/filtersContext";
import { Toast } from 'primereact/toast';

function ProductsManagment() {
  const [products, setProducts] = useState([])
  const [numOfProducts, setNumOfProducts] = useState(0)
  const [loading, setLoading] = useState(false)
  const {searchParams, setFilter, getActiveFilter} = useContext(QueryFiltersContext)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [updateProducts, setUpdateProducts] = useState(false) //state to mark when to re-fetch the products 
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Éxito', detail:'Operación Exitosa', life: 100000});
  }

  const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Fallo en la Operación', life: 3000});
  }


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
  }, [searchParams, updateProducts]);

  return (
    <section className="products-managment-page">
      <Toast ref={toast} position="bottom-center"/>
      <section className = 'back-button-title-container'>
        <button className = "products-managment-go-back-button btn-general-styles" onClick={() => history.back()}>
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
        setLoading={setLoading}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        setUpdateProducts = {setUpdateProducts}
        showError={showError}
        showSuccess={showSuccess}
        />
    </section>
    );
}

export default ProductsManagment;
