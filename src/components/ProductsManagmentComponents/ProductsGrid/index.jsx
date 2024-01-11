import "./index.css";
import Loader from "../../Loader";
import ActionButtons from "../ProductList/ActionButtons";
import { Checkbox } from "primereact/checkbox";

function ProductsGrid({
  products,
  loading,
  selectedProducts,
  setSelectedProducts,
  handleDeleteProduct,
  processUpdateProduct,
  processDetailProduct,
}) {

    function handleCheckProduct({checked, product}){
        // Si el checkbox está marcado, agregar el producto al array de seleccionados
        if (checked) {
        setSelectedProducts((prev) => [...prev, product]);
        } else {
        // Si el checkbox no está marcado, quitar el producto del array de seleccionados
        setSelectedProducts((prev) => prev.filter((item) => item.id !== product.id));
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
        <div
          className="product-managment-card"
          id={product.id}
          key={product.id}
        >
          <div className="img-container">
            <img
              loading="lazy"
              src={product.product_img1}
              alt={product.product_name}
            />
          </div>
          <div className="name-and-price-container">
            <p className="product-card-name">{product.product_name}</p>
            <p className="card-text price">${product.precio}</p>
          </div>
          <div className = "action-buttons-container">
            <ActionButtons
                item={product}
              handleDelete={handleDeleteProduct}
              handleDetil={processDetailProduct}
              handleEdit={processUpdateProduct}
            />
            <Checkbox
                checked={selectedProducts.some(selectedProduct => product.id === selectedProduct.id)}
                onChange={(e) => handleCheckProduct({checked:e.checked, product:product})}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductsGrid;
