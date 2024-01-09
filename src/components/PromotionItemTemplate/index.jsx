import "./index.css"

function PromotionItemTemplate(data){

    return(
        <section className="promotion-card-container">
            <div className="img-promotion-card-section">
                <div className="img-promotion-container">
                    <img src={data.img} alt={data.name} />
                </div>
            </div>
            <div className="details-prmotion-card-section">
                <p className="mame-promotion">{data.name}</p>
                <p className="description-promotion">{data.description}</p>
                <p className="total-products-promotion">{data.cantidad_products}</p>
                <div className="discount-promotion-container">
                    <p>{data.discount_in_percent}</p>
                </div>
            </div>
            <div className="accion-promotion-card-section">
                <button className="oferts-actions-table-button"><i className="pi pi-pencil icon-oferts-table"></i></button>
                <button className="oferts-actions-table-button"><i className="pi pi-eye icon-oferts-table"></i></button>
                <button className="oferts-actions-table-button"><i className="pi pi-trash icon-oferts-table"></i></button>
            </div>
        </section>
    )

}

export default PromotionItemTemplate;