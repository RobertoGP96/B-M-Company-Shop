import { unstable_batchedUpdates } from 'react-dom'
import './index.css'

function ProductCard({id, product_name, precio, product_img1,onClick}){
    return(
       <div className="product-card" id = {id} onClick={onClick}>
        <div className = 'img-container'>
            <img loading = "lazy" src={product_img1}  alt={product_name}/>
        </div>
        <div className = "name-and-price-container">
          <p className="product-card-name">{product_name}</p>
          <p className="card-text price">${precio.toFixed(2)}</p>
        </div>
       </div>

    )
}

export default ProductCard
