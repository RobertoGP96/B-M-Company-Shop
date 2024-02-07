import './index.css'
import { Checkbox } from "primereact/checkbox";
import InOffertIcon from "../../../assets/in-offert-icon.svg";


function ProductCardForOfertManagment({data,handleOnChangeChecked,searchChecked}){
    return(
       <div className="product-card" id = {data.id} style={{width:"240px"}}>
        <div className = 'img-container'>
            <img loading = "lazy" src={data.product_img1}  alt={data.product_name}/>
        </div>
        {data.promotion ? (
        <abbr title="En oferta">
          <img className="in-offert-icon" src={InOffertIcon} alt="En Oferta" />
        </abbr>
      ) : null}
        <div className = "name-and-price-container">
          <Checkbox  
                    checked={searchChecked(data.id)} 
                    onChange={()=>handleOnChangeChecked(data)}  
            />
          <p className="product-card-name">{data.product_name}</p>
          <p className="card-text price">${data.precio.toFixed(2)}</p>
        </div>
       </div>

    )
}

export default ProductCardForOfertManagment
