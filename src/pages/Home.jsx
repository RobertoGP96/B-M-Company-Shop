import NavBar from "../components/NavBar";
import "./pagesStyles/Home.css"
import useWindowSize from "../hooks/useWindowSize";
import Oferts from "../components/Oferts";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import getLastProducts from "../services/getLastProducts";
import getRecommendedProducts from "../services/getRecommendedProducts";

function Home() {
    const responsive = useWindowSize("max",800);
    const navigate = useNavigate();
    const [lastAded,setLastAded] = useState([])
    const [recomendedProducts,setRecomendedProducts] = useState([])

    useEffect(() => {
        getLastProducts().then((products) =>{
            console.log(products.results);
            setLastAded(products.results)
        })
        getRecommendedProducts().then((products) =>{
            console.log(products.results);
            setRecomendedProducts(products.results)
        })

    },[])


    return ( 
        <section className="homeConteiner">
            <NavBar/>
            <section className="heroSection">
                <article className={responsive?"backgroundImage":"backgroundImage responsive-font-14px"}>
                    <summary>
                        <h1 style={{margin:"0px",paddingBottom:"20px"}}>!Bienvenido a nuestra tienda en línea!</h1>
                        En B&M company nos enorgullece ofrecer una amplia selección de productos de <br/>
                        alta calidad a precios asequibles. Tenemos todo lo que necesitas para satisfacer<br/>
                        tus necesidades
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
                 <Oferts recomendedProducts={recomendedProducts} lastAded={lastAded}/>
            </section>
            <Footer/>
        </section>
     );
}

export default Home;