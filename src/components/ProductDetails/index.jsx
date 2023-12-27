import './index.css';
import { Sidebar } from "primereact/sidebar";
import useWindowSize from '../../hooks/useWindowSize';
import ImageCarousel from '../ImageCarousel';

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
                    style={{width:responsive?"100%":"450px"}}
                    showCloseIcon = {false}
                    maskStyle={{color:"red"}}
                    maskClassName='sidebar-2'
                >
                    <button onClick={onHide} className={responsive?active?'close-button-responsive open':"close-button-responsive closed":active?'close-button open':"close-button closed"} >
                        <i className='pi pi-chevron-right'></i>
                    </button>
                    <section className='details-container'>  
                            <div className='carousel'>
                                <ImageCarousel images={[data.product_img1,data.product_img2,data.product_img3]}/> 
                            </div>

                            <div className='price-oferts-container'>
                                <div className='oferts-status'>
                                    <p>En Oferta</p>
                                </div>
                                <div className='price-status'> 
                                    <p className='description'>Precio</p>
                                    <h2 className='price'>${data.precio}.00</h2>
                                </div>

                            </div>
                            <div className='name-description-container'>
                                <div className='name-container'>
                                    <p className='description'>Nombre del producto</p>
                                    <p className='product-name'>{data.product_name}</p>
                                </div>
                                <div className='product-description-container'>
                                    <p className='description'>Descripción</p>
                                    <p className='product-description'>{data.product_description}</p>
                                </div>  
                            </div>
                    </section>
                </Sidebar>
        </section>

    )
}

export default ProductDetails;