import './index.css';
import { DataScroller } from "primereact/datascroller";
import { Checkbox } from "primereact/checkbox";
import { getProductsOfert } from '../../../services/ManagePromotions/getProductsOfert';
import { useState,useEffect } from 'react';



function DataTableProducts({
  OfertID,
  editable,
}) {
  const [productsOFerts,setProductsOferts]=useState([])
 
 
    useEffect(() =>{ 
      getProductsOfert(OfertID).then(products =>{
        console.log(products.results);
        setProductsOferts(products.results)
      })

    },[OfertID])

  function ProductItemTemplate(data) {
    


    return (
      <section className="promotion-product-card-container">
        <div className="img-promotion-product-card-section">
          <div className="img-promotion-product-card-container">
            <img src={data.product_img1} alt={data.product_name} />
          </div>
         { editable &&
          <Checkbox
              checked={""}
              onChange={() => {}}
            />
          }
        </div>
        <div className="details-prmotion-product-card-section">
          <p className="mame-promotion-product-card">{data.product_name}</p>
          <p className="category-product-card-promotion">{`Categoría: ${data.categoria_full_info.nombre}`}</p>
        </div>
        <div className="dtp-price-container">
          <p className='price'> {`${data.precio}$`}</p>
        </div>
      </section>
    );
  }

  return (
    <DataScroller
      className="data-products-ofert-scroller"
      value={productsOFerts}
      itemTemplate={ProductItemTemplate}
      rows={productsOFerts.length}
      inline
      
      scrollHeight="300px"
    />
  );
}

export default DataTableProducts;
