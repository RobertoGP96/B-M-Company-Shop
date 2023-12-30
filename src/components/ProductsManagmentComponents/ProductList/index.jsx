import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ActiveStatusIcon from "../../../assets/active-status-icon.svg";
import DeactiveStatusIcon from "../../../assets/deactive-status-icon.svg";
import BoxIcon from "../../../assets/box-icon.svg";
import ActionButtons from "./ActionButtons";
import "./index.css";
import Paginator from "../../Paginator";
import Loader from "../../Loader";

function ProductList({
  products,
  numOfProducts,
  setFilter,
  getActiveFilter,
  loading,
}) {
  return (
    <section className="products-managment-list-table-container">
      {loading ? (
        <section className="products-managment-list-loader-container">
            <div>
                <Loader />
            </div>
        </section>
      ) : null}
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column
          field="product_name"
          header="Nombre"
          body={(product) => {
            return (
              <div className="table-product-field-container">
                <img src={BoxIcon} />
                <span>{product.product_name}</span>
              </div>
            );
          }}
        ></Column>
        <Column field="categoria_full_info.nombre" header="Categoría "></Column>
        <Column
          field="is_active"
          header="Estado"
          body={(product) => {
            return product.is_active ? (
              <img src={ActiveStatusIcon} />
            ) : (
              <img src={DeactiveStatusIcon} />
            );
          }}
        ></Column>
        <Column
          field="precio"
          header="Precio"
          body={(product) => {
            return `$${product.precio}`;
          }}
        ></Column>
        <Column
          header="Acciones"
          body={(product) => {
            return <ActionButtons product={product} />;
          }}
        ></Column>
      </DataTable>
      <Paginator
        numOfProducts={numOfProducts}
        setFilter={setFilter}
        getActiveFilter={getActiveFilter}
        products={products}
      />
    </section>
  );
}

export default ProductList;
