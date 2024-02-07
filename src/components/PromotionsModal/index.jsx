import { Dialog } from "primereact/dialog";
import { useContext } from "react";
import QueryFiltersContext from "../../context/filtersContext";
import "./index.css";

function PromotionsModal({ show, setShow, promotions, loadingPromotions }) {
  const { setFilter } = useContext(QueryFiltersContext);
  return (
    <Dialog
      visible={show}
      onHide={() => setShow(false)}
      position="top"
      draggable={false}
      resizable={false}
      style={{ width: "90vw", maxWidth: "900px" }}
      header = {"Ofertas"}
    >
      <section className="store-promotions-grid">
        {promotions.map((promotion) => (
          <article
            key={promotion.id}
            className="store-promotion-card"
            onClick={() =>
                {
                    setFilter({ name: "promotion", value: promotion.id })
                    setShow(false)
                }
            }
          >
            <header>
              <img alt={promotion.name} src={promotion.img} />
            </header>
            <footer>
                <span>{promotion.name}</span>
                <span>{promotion.discount_in_percent}% OFF</span>
            </footer>
          </article>
        ))}
      </section>
    </Dialog>
  );
}

export default PromotionsModal;
