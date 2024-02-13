import CartIcon from "../../assets/cart-icon.svg";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CartContext from "../../context/cartContext";
import { useState, useContext } from "react";
import TrashIcon from "../../assets/trash-icon.svg";
import BoxIcon from "../../assets/box-icon.svg";
import ProductQuantityController from "./ProductQuantityController";
import "./index.css";

function Cart() {
  const [show, setShow] = useState(false);
  const {
    productsCart,
    addProductToCart,
    restProductFromCart,
    deleteProductFromCart,
    cleanCart,
    calculateTotal
  } = useContext(CartContext);
  return (
    <section className = "cart">
      <div className = "show-cart-button-container">
        <button className="show-cart-button" onClick={() => setShow(true)}>
          <img alt="cart" src={CartIcon} />
          {productsCart.length > 0?<span className = "cart-products-cont">{productsCart.length}</span>:null}
        </button>
      </div>
      <Dialog
        visible={show}
        onHide={() => setShow(false)}
        position="top"
        draggable={false}
        resizable={false}
        style={{ width: "90vw", maxWidth: "850px" }}
        header={<div className = "cart-title"><img alt = "cart" src = {CartIcon}/>Carrito</div>}
        contentClassName="cart-modal-content"
      >
        <DataTable
          value={productsCart}
          tableStyle={{ minWidth: "50rem"}}
          selectionMode={"checkbox"}
          dataKey="id"
          size="small"
          className="products-cart-datatable"
          emptyMessage = "No hay productos en el carrito"
        >
          <Column
            field="productName"
            header="Nombre"
            body={(product) => {
              return (
                <div className="table-product-field-container">
                  <img src={BoxIcon} />
                  <span>{product.productName}</span>
                </div>
              );
            }}
          />
          <Column
            field="img1"
            header="Imagen"
            body={(product) => {
              return (
                <img
                  className="product-cart-img"
                  alt={product.productName}
                  src={product.img1}
                />
              );
            }}
          />
          <Column
            field="price"
            header="Precio"
            body={(product) => {
              return `$${product.price.toFixed(2)}`;
            }}
          />
          <Column
            header="Cantidad"
            body={(product) => {
              return (
                <ProductQuantityController
                  item={{
                    id: product.id,
                    productName: product.productName,
                    price: product.price,
                    img1: product.img1,
                  }}
                  add={addProductToCart}
                  rest={restProductFromCart}
                  quantity={product.quantity}
                />
              );
            }}
          />
          <Column
            field="subtotal"
            header="Sub Total"
            footer = {`Total: $${calculateTotal().toFixed(2)}`}
            body={(product) => {
              return `$${product.subtotal.toFixed(2)}`;
            }}
          />
          <Column
            body={(product) => {
              return (
                <button className = "delete-product-from-cart-button">
                  <img
                    alt="trash"
                    src={TrashIcon}
                    onClick={() => deleteProductFromCart(product.id)}
                  />
                </button>
              );
            }}
          />
        </DataTable>
        <section className = "cart-action-buttons">
          <button className = "btn-general-styles"onClick={() => cleanCart()}>Vaciar Carrito</button>
          <button className = "btn-general-styles"onClick={() => setShow(false)}>Cancelar</button>
          <button className = "btn-general-styles">Procesar Pedido</button>
        </section>
      </Dialog>
    </section>
  );
}

export default Cart;
