import './index.css';
import { DataScroller } from "primereact/datascroller";
import { Checkbox } from "primereact/checkbox";


function DataScrollerOferts({
  dataOferts,
  selectedOferts,
  setRowData,
  handleOnClickInfoButton,
  handleOnClickEditButton,
  searchChecked,
  handleOnChangeChecked,
  confirm2
}) {
  function PromotionItemTemplate(data) {
    return (
      <section className="promotion-card-container">
        <div className="img-promotion-card-section">
          <div className="img-promotion-container">
            <img src={data.img} alt={data.name} />
          </div>
          <Checkbox
            checked={searchChecked(selectedOferts, data.id)}
            onChange={() => handleOnChangeChecked(selectedOferts, data)}
          />
        </div>
        <div className="details-prmotion-card-section">
          <p className="mame-promotion">{data.name}</p>
          <p className="total-products-promotion">{`Productos: ${data.cantidad_products}`}</p>
          <div className="discount-promotion-container">
            <p className="price">{`-${data.discount_in_percent}%`}</p>
          </div>
        </div>
        <div className="accion-promotion-card-section">
          <button
            className="oferts-actions-table-button"
            onClick={() => {
              setRowData(data);
              handleOnClickEditButton();
            }}
          >
            <i className="pi pi-pencil icon-oferts-table"></i>
          </button>
          <button
            className="oferts-actions-table-button"
            onClick={() => {
              setRowData(data);
              handleOnClickInfoButton();
            }}
          >
            <i className="pi pi-eye icon-oferts-table"></i>
          </button>
          <button
            className="oferts-actions-table-button"
            onClick={() => {
              confirm2(data.id);
            }}
          >
            <i className="pi pi-trash icon-oferts-table"></i>
          </button>
        </div>
      </section>
    );
  }

  return (
    <DataScroller
      className="data-oferts-scroller"
      value={dataOferts}
      itemTemplate={PromotionItemTemplate}
      rows={dataOferts.length}
      inline
      header="Listado de Ofertas"
    />
  );
}

export default DataScrollerOferts;
