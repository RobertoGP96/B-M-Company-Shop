import "./index.css"
import Loader from "../../Loader";
import ProductCardForOfertManagment from "../ProductCard";

function ProductsGridForOfertManagment({
  products,
  loading,
  handleOnChangeChecked,
  searchChecked,
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
            data={product}
            handleOnChangeChecked={handleOnChangeChecked}
            searchChecked={searchChecked}
        />
      ))}
    </section>
  );
}
export default ProductsGridForOfertManagment;