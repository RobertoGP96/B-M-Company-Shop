import './index.css'
import { Checkbox } from "primereact/checkbox";


function ProductCardForOfertManagment({data,handleOnChangeChecked,searchChecked}){
    return(
       <div className="product-card" id = {data.id} style={{width:"140px"}}>
        <div className = 'img-container'>
            <img loading = "lazy" src={data.product_img1}  alt={data.product_name}/>
        </div>
        <div className = "name-and-price-container">
          <Checkbox  
                    checked={searchChecked(data.id)} 
                    onChange={()=>handleOnChangeChecked(data)}  
            />
          <p className="product-card-name">{data.product_name}</p>
          <p className="card-text price">${data.precio}</p>
        </div>
       </div>

    )
}

export default ProductCardForOfertManagment
