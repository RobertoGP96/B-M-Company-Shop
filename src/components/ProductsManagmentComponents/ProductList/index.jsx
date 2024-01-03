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
  selectedProducts,
  setSelectedProducts,
  handleDeleteProduct,
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
      <DataTable
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        selectionMode={"checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
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
        <Column
          field="product_img1"
          header="Imagen 1"
          body={(product) => {
            return (
              <img
                className="data-table-product-image"
                src={product.product_img1}
              />
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
            return <ActionButtons 
                item={product} 
                handleDelete={handleDeleteProduct}
                />;
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
