import NavBar from "../components/NavBar";
import "./pagesStyles/Home.css"
import useWindowSize from "../hooks/useWindowSize";
import Oferts from "../components/Oferts";

function Home() {
    const responsive = useWindowSize("max",800);
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
                <button className="homeDescription-button">Ver productos</button>
             </div>       
           
            </div>
            <Oferts/>
        </div>
     );
}

export default Home;