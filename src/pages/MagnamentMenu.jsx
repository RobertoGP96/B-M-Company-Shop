import "./pagesStyles/MagnamentMenu.css";
import ProductsMagnament from "../assets/products-magnament.svg"
import OfertsMagnament from "../assets/oferts-magnament.svg"
import SecurityMagnament from "../assets/security-magnament.svg"
import Contactsgnament from "../assets/contacts-magnament.svg"
import useWindowSize from "../hooks/useWindowSize";

function MagnamentMenu (){
    const responsive = useWindowSize("max",400)

    return(
        <section className="magnament-container"> 
            <h2>Menú de Gestión</h2>
            <main className={responsive?"magnament-menu-container magnament-menu-container-reponsive":"magnament-menu-container"}>
                        <div title="products-secction" className="magnament-menu-section"> 
                            <h4>Productos</h4>
                            <div className="icon-magnament-section">
                                <img src={ProductsMagnament} alt="products" width="55px"/>
                            </div>
                        </div>
                        <div title="oferts-section" className="magnament-menu-section">
                            <h4>Ofertas</h4>
                            <div className="icon-magnament-section">
                                <img src={OfertsMagnament} alt="oferts" width="55px"/>   
                            </div>
                        </div>
                        <div title="security-section" className="magnament-menu-section">
                            <h4>Seguridad</h4>
                            <div className="icon-magnament-section">
                                <img src={SecurityMagnament} alt="security" width="55px"/>
                            </div>
                        </div>
                        <div title="contac-section" className="magnament-menu-section">
                            <h4>Contacto</h4>
                            <div className="icon-magnament-section">
                                <img src={Contactsgnament} alt="contacts" width="48px"/>
                            </div>
                        </div>        
            </main>

        </section>
    )
}


export default  MagnamentMenu;