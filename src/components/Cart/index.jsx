import CartIcon from "../../assets/cart-icon.svg";
import { Dialog } from "primereact/dialog";
import CartContext from "../../context/cartContext";
import { useState, useContext, useEffect } from "react";
import ProductsCartList from "./ProductsCartList";
import ProductsCartGrid from "./ProductsCartGrid";
import { useIsMobileMode } from "../../hooks/useIsMobileMode";
import { sendWhatsappMessage, prepareProductsCartToBeSentByWhatsapp } from "../../utils/sendWhatsappMessage";
import { useGetContactInfo } from "../../hooks/useGetContactInfo";
import "./index.css";

function Cart() {
  const [show, setShow] = useState(false);
  const [listView, setListView] = useState(true);
  const { productsCart, cleanCart, calculateTotal} = useContext(CartContext);
  const { mobileMode } = useIsMobileMode({ mobileWidth: 950 });
  const {contactInfo} = useGetContactInfo()

  //effect to change the view type to grid or list depending of the mobileMode
  useEffect(() => {
    if (mobileMode) {
      setListView(false);
    } else {
      setListView(true);
    }
  }, [mobileMode]);

  //function to send the pedido
  function handleSendPedido() {
    if(productsCart.length > 0 && contactInfo !== null){
      sendWhatsappMessage({ 
        phone: contactInfo.whatsapp, 
        message: prepareProductsCartToBeSentByWhatsapp({productsCart:productsCart, total: calculateTotal().toFixed(2)}) 
      });
    }
  }

  return (
    <section className="cart">
      <div className="show-cart-button-container">
        <button className="show-cart-button" onClick={() => setShow(true)}>
          <img alt="cart" src={CartIcon} />
          {productsCart.length > 0 ? (
            <span className="cart-products-cont">{productsCart.length}</span>
          ) : null}
        </button>
      </div>
      <Dialog
        visible={show}
        onHide={() => setShow(false)}
        position="top"
        draggable={false}
        resizable={false}
        style={{ width: "90vw", maxWidth: "850px" }}
        header={
          <div className="cart-title">
            <img alt="cart" src={CartIcon} />
            Carrito
          </div>
        }
        contentClassName="cart-modal-content"
      >
        {productsCart.length > 0 ? (
          <>
            <div className="table-grid-container">
              {listView ? <ProductsCartList /> : <ProductsCartGrid />}
            </div>
            <section className="cart-action-buttons">
              <button
                className="btn-general-styles"
                onClick={() => cleanCart()}
              >
                Vaciar Carrito
              </button>
              <button
                className="btn-general-styles"
                onClick={() => setShow(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-general-styles"
                onClick={() => handleSendPedido()}
              >
                Procesar Pedido
              </button>
            </section>
          </>
        ) : (
          <div className="empty-cart-message">Tu carrito esta vacio</div>
        )}
      </Dialog>
    </section>
  );
}

export default Cart;
