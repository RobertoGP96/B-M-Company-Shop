import "./index.css"
import Loader from "../../Loader";
import ProductCardForOfertManagment from "../ProductCard";

function ProductsGridForOfertManagment({
  products,
  loading,
}) {

  return (
    <section className="products-grid-magnament-oferts-container">
      {loading ? (
        <section className="products-managment-grid-loader-container">
          <div>
            <Loader />
          </div>
        </section>
      ) : null}
      {products.map((product) => (
        <ProductCardForOfertManagment
          key={product.id}
          precio={product.precio}
          product_img1={product.product_img1}
          product_name={product.product_name}
        />
      ))}
    </section>
  );
}

export default ProductsGridForOfertManagment;