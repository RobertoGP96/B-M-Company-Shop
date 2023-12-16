import NavBar from "../components/NavBar";
import "./pagesStyles/Home.css";
import useWindowSize from "../hooks/useWindowSize";
import Oferts from "../components/Oferts";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getLastProducts from "../services/getLastProducts";
import getRecommendedProducts from "../services/getRecommendedProducts";

function Home() {
  const responsive = useWindowSize("max", 800);
  const navigate = useNavigate();
  const [lastAded, setLastAded] = useState([]);
  const [recomendedProducts, setRecomendedProducts] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setLoading1(true);
    setLoading2(true);
    getLastProducts().then((products) => {
      console.log(products.results);
      setLastAded(products.results);
      setLoading1(false);
    });
    getRecommendedProducts().then((products) => {
      console.log(products.results);
      setRecomendedProducts(products.results);
      setLoading2(false);
    });
  }, []);

  return (
    <section className="homeConteiner">
      <NavBar />
      
        <section className="heroSection">
          <article
            className={
              responsive
                ? "backgroundImage"
                : "backgroundImage responsive-font-14px"
            }
          >
            <summary>
              <h1
                style={{
                  margin: "0px",
                  paddingBottom: "20px",
                  fontSize: "2rem",
                }}
              >
                ! Bienvenido a nuestra tienda en línea !
              </h1>
            </summary>
          </article>
          <article
            className={
              responsive
                ? "homeDescription-conteiner"
                : "homeDescription-conteiner responsive-font-11px"
            }
          >
            <summary className="homeDescriptions-Conteiner">
              Explora nuestro sitio web para descubrir nuestras ultimas ofertas 
              <br />
              y promociones y no dudes en ponerte en
              contacto con nososotros si 
              <br />
              necesitas ayuda 
              para encontar lo q
              buscas.
              <br />
              !Gracias por visitarnos!
              <br />
              <button
                className="homeDescription-button"
                onClick={() => navigate("/products")}
              >
                Ver productos
              </button>
            </summary>
          </article>
        </section>
        <section className="mainContent">
          <Oferts
            load1={loading1}
            load2={loading2}
            recomendedProducts={recomendedProducts}
            lastAded={lastAded}
          />
        </section>
      
      <Footer />
    </section>
  );
}

export default Home;
