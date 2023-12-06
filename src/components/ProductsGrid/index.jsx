import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { useState, useEffect, useContext } from "react";
import {getProducts} from '../../services/getProducts'
import "./index.css";
import QueryFiltersContext from "../../context/filtersContext";

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {queryFilters} = useContext(QueryFiltersContext)

  //get products of store
  useEffect(() => {
    setLoading(true);
    getProducts(queryFilters)
      .then((data) => {
        setProducts(data.results);
        setLoading(false);
      })
      .catch(() => {
        //setLoading(false);
      });
  }, [queryFilters]);

  return (
    <>
      {loading ? (
        <section className="products-loader-container">
            <div>
                <Loader />
            </div>
        </section>
      ) : 
      <div className="products-grid">
        {products !== null && products !== undefined ? (
          <>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} {...product} />
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
      }
    </>
  );
}
