import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { useState, useEffect, useContext } from "react";
import {getProducts} from '../../services/getProducts'
import "./index.css";
import QueryFiltersContext from "../../context/filtersContext";
import Paginator from "../Paginator";

export default function ProductsGrid({activateProductdetails}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numOfProducts, setNumOfProducts] = useState(0)
  const {searchParams, setFilter, getActiveFilter} = useContext(QueryFiltersContext)

  //get products of store
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
    <>
      {loading ? (
        <section className="products-loader-container">
            <div>
                <Loader />
            </div>
        </section>
      ) : 
      <section className = "products-grid-and-paginator-container">
        <div className="products-grid">
          {products !== null && products !== undefined ? (
            <>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} {...product}   onClick = {()=>activateProductdetails(product)} />
                ))
              ) : (
                <div className="not-found-message">
                  <strong>No hay productos</strong>
                </div>
              )}
            </>
          ) : (
            <div className="not-found-message">
              <strong>No hay productos</strong>
            </div>
          )}
        </div>
        <Paginator 
          numOfProducts={numOfProducts}
          setFilter={setFilter}
          getActiveFilter={getActiveFilter}
          products={products}
          />
      </section>
      }
    </>
  );
}
