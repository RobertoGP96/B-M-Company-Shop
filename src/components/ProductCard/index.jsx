import { unstable_batchedUpdates } from "react-dom";
import "./index.css";
import InOffertIcon from "../../assets/in-offert-icon.svg";
import { applyDiscount } from "../../utils/applyDiscount";

function ProductCard({
  id,
  product_name,
  precio,
  descuento,
  promotion,
  promotion_full_info,
  product_img1,
  onClick,
}) {
  return (
    <div className="product-card" id={id} onClick={onClick}>
      <div className="img-container">
        <img loading="lazy" src={product_img1} alt={product_name} />
      </div>
      {promotion ? (
        <abbr title="En oferta">
          <img className="in-offert-icon" src={InOffertIcon} alt="En Oferta" />
        </abbr>
      ) : null}
      <div className="name-and-price-container">
        <p className="product-card-name">{product_name}</p>
        {promotion || descuento > 0 ? (
          <p className="card-text price price-with-discount">
            <span className="original-price">${precio.toFixed(2)}</span>
            <span className="new-price">
              $
              {applyDiscount({
                price: precio,
                promotion: promotion_full_info,
                discount: descuento,
              }).toFixed(2)}
            </span>
          </p>
        ) : (
          <p className="card-text price">${precio.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
