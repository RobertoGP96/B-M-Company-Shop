import './index.css';
import { Sidebar } from "primereact/sidebar";
import useWindowSize from '../../hooks/useWindowSize';

const style = {
    backdropFilter: "blur(1px)",  
    backgroundColor: "transparent !important",
    zIndex: "9 !important", 
    position: "relative",
}

function ProductDetails ({active,data,onHide}) {
    const responsive = useWindowSize("max",600)
    return(
        
        <section title='Detalles del producto' className='product-details-container' >
                <Sidebar 
                    visible = {active}
                    onHide={() => {return}}
                    position='right' 
                    style={{width:"450px"}}
                    showCloseIcon = {false}
                    maskStyle={{color:"red"}}
                    maskClassName='sidebar-2'
                >
                    <button onClick={onHide} className={active?'close-button open':"close-button closed"} >
                        <i className='pi pi-chevron-right'></i>
                    </button>
                    <section className='details-container'>  
                            <div className='pictures-details'>
                                <img src={data.product_img1} alt={data.product_name}/>
                            </div>
                            <div className='price-oferts-container'>
                                <div className='oferts-status'>
                                    <p>En Oferta</p>
                                </div>
                                <h2 className='price'>${data.precio}.00</h2>
                            </div>
                            <div className='name-description-container'>
                                <h2 className='product-name'>{data.product_name}</h2>
                                <h3 className='description'>Descripción</h3>
                                <p className='product-description'>{data.product_description}</p>
                            </div>
                    </section>
                </Sidebar>
        </section>

    )
}

export default ProductDetails;