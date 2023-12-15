import NavBar from "../components/NavBar";
import "./pagesStyles/Home.css"
import useWindowSize from "../hooks/useWindowSize";
import Oferts from "../components/Oferts";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


function Home() {
    const responsive = useWindowSize("max",800);
    const navigate = useNavigate();
    return ( 
        <section className="homeConteiner">
            <NavBar/>
            <section className="heroSection">
                <article className={responsive?"backgroundImage":"backgroundImage responsive-font-14px"}>
                    <summary>
                        <h1>!Bienvenido a nuestra tienda en línea!</h1>
                        Explora nuestro sitio web para descubrir nuestras ultimas ofertas 
                        y promociones y no dudes en ponerte en<br/>
                        contacto con nososotros si necesitas ayuda para encontar lo q buscas,<br/>
                        !Gracias por visitarnos!<br/> 
                    </summary>
                </article>        
                <article className={responsive?"homeDescription-conteiner":"homeDescription-conteiner responsive-font-11px"}>
                        <summary className="homeDescriptions-Conteiner">
                            Explora nuestro sitio web para descubrir nuestras ultimas ofertas 
                            y promociones y no dudes en ponerte en<br/>
                            contacto con nososotros si necesitas ayuda para encontar lo q buscas,<br/>
                            !Gracias por visitarnos!<br/>
                        </summary>
                        <button className="homeDescription-button" onClick={()=>navigate("/products")}>Ver productos</button>
                </article>       
           
            </section>
            <section className="mainContent">
                 <Oferts/>
            </section>
            <Footer/>
        </section>
     );
}

export default Home;