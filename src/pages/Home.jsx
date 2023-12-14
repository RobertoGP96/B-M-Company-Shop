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
        <div className="homeConteiner">
            <NavBar/>
            <div className="mainSeccion-cointer">
            <div className="backgroundImage">
                <h1>!Bienvenido a nuestra tienda en línea!</h1>
                Explora nuestro sitio web para descubrir nuestras ultimas ofertas 
                y promociones y no dudes en ponerte en<br/>
            contacto con nososotros si necesitas ayuda para encontar lo q buscas,<br/>
            !Gracias por visitarnos!<br/>
                
            </div>
              
             <div className={responsive?"homeDescription-conteiner":"homeDescription-conteiner homeDescription-conteinerResponsive"}>
               Explora nuestro sitio web para descubrir nuestras ultimas ofertas 
                    y promociones y no dudes en ponerte en<br/>
                contacto con nososotros si necesitas ayuda para encontar lo q buscas,<br/>
                !Gracias por visitarnos!<br/>
                <button className="homeDescription-button" onClick={()=>navigate("/products")}>Ver productos</button>
             </div>       
           
            </div>
            <Oferts/>
            <Footer/>
        </div>
     );
}

export default Home;