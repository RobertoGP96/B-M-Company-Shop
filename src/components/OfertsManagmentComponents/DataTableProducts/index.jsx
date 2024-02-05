import './index.css';
import { DataScroller } from "primereact/datascroller";
import { Checkbox } from "primereact/checkbox";
import { getProductsOfert } from '../../../services/ManagePromotions/getProductsOfert';
import { useState,useEffect,useRef } from 'react';
import { Image } from "primereact/image";
import { Button } from 'primereact/button';



function DataTableProducts({
  OfertID,
  editable,
  mobileSize,
  productsOFerts,
  setProductsOferts,
  searchChecked,
  handleOnChangeChecked
}) {
    
    const tableProductsRef = useRef(null)
    const [page, setPage] = useState(1);
    const [loadMore,setLoadMore] = useState(true);


    useEffect(() =>{ 
      getProductsOfert(OfertID,page).then(products =>{
        if(productsOFerts.length>0){
          setProductsOferts(productsOFerts.concat(products.results));
        }
        else{
          setProductsOferts(products.results);
        }
        if(products.next == null) setLoadMore(false)
      })
 

    },[OfertID,page])

  
    
    const footer = <Button type="text" icon="pi pi-plus" label="Load" 
    onClick={(e) => {
      e.preventDefault();
      setPage(page + 1);
    }} 
    />;

  function ProductItemTemplate(data) {
    return (
      <section  className={mobileSize?"promotion-product-card-container promotion-product-card-container-mobileSize":"promotion-product-card-container"}>
        <div className="img-promotion-product-card-section">
          { editable &&
          <Checkbox
              checked={searchChecked(data.id)}
              onChange={() => handleOnChangeChecked(data)}
            />
          }
          <div className="img-promotion-product-card-container">
            <Image src={data.product_img1} alt={data.product_name} preview/>
          </div>

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
      ref={tableProductsRef}
      className="data-products-ofert-scroller"
      value={productsOFerts}
      itemTemplate={ProductItemTemplate}
      rows={1000}
      inline
      scrollHeight="300px"
      footer={loadMore?footer:undefined}
      />
  );
}

export default DataTableProducts;
