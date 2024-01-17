import "./index.css";
import Loader from "../../Loader";
import ProductmanagmentCard from "./ProductManagmentCard";

function ProductsGrid({
  products,
  loading,
  selectedProducts,
  setSelectedProducts,
  handleDeleteProduct,
  processUpdateProduct,
  processDetailProduct,
}) {
  function handleCheckProduct({ checked, product }) {
    // Si el checkbox está marcado, agregar el producto al array de seleccionados
    if (checked) {
      setSelectedProducts((prev) => [...prev, product]);
    } else {
      // Si el checkbox no está marcado, quitar el producto del array de seleccionados
      setSelectedProducts((prev) =>
        prev.filter((item) => item.id !== product.id)
      );
    }
  }
  return (
    <section className="products-managment-grid">
      {loading ? (
        <section className="products-managment-grid-loader-container">
          <div>
            <Loader />
          </div>
        </section>
      ) : null}
      {products.map((product) => (
        <ProductmanagmentCard
          key={product.id}
          product={product}
          handleDeleteProduct={handleDeleteProduct}
          processUpdateProduct={processUpdateProduct}
          processDetailProduct={processDetailProduct}
          selectedProducts = {selectedProducts}
        />
      ))}
    </section>
  );
}

export default ProductsGrid;
