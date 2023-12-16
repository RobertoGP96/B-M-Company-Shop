import "./index.css";
import useWindowSize from "../../hooks/useWindowSize";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";

const items = [
  {
    label: "Inicio",
    url: "/",
  },
  {
    label: "Tienda",
    url: "/tienda",
  },
  {
    label: "Productos",
    url: "/products",
  },
  {
    label: "Contacto",
    url: "/contact-us",
  },
];

function NavBar() {
  const navigate = useNavigate();
  const responsive = useWindowSize("min", 800);
  const [visible, setVisible] = useState(false);
  const refActive = useRef(null);
  const { pathname } = useLocation();
  console.log(pathname);

  const handleOnActive = () => {
    if (refActive.current) {
      refActive.current.classList.toggle("navBar-itemConteiner active");
    }
  };

  return (
    <nav title="primaryNavigation" className="navbar">
      {responsive ? (
        <ul className="nav-BarConteiner">
          <li className="navBar-itemConteiner-companyName">
            <div className="companyName-conteiner">
              <figure>
                <img
                  src="./src/assets/B & M image.png"
                  width={127}
                  height={45}
                ></img>
              </figure>
              <figure>
                <img
                  src="./src/assets/company image.png"
                  width={91}
                  height={41}
                ></img>
              </figure>
            </div>
          </li>
          <li>
            <div
              ref={refActive}
              onClick={() => handleOnActive}
              className={
                pathname == "/"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
              <Link to = "/">
                <a className="navBar-item">
                  <span className="icon">
                    <img src="src\assets\home.svg"></img>
                  </span>
                  <span className="title">Inicio</span>
                </a>
              </Link>
            </div>
          </li>
          <li>
            <div
              ref={refActive}
              className={
                pathname == "/store"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
                <Link to = "/store">
                    <a className="navBar-item">
                        <span className="icon">
                        <img src="src\assets\tiendaIcon.svg"></img>
                        </span>{" "}
                        <span className="title">Tienda</span>
                    </a>
                </Link>
            </div>
          </li>
          <li>
            <div
              className={
                pathname == "/products"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
                <Link to = "/products">
                    <a className="navBar-item">
                        <span className="icon">
                        <img src="src\assets\productsIcon.svg"></img>
                        </span>{" "}
                        <span className="title">Productos</span>
                    </a>
                </Link>
            </div>
          </li>
          <li>
            <div
              className={
                pathname == "/contactus"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
                <Link to = "/contactus">
                    <a className="navBar-item">
                        <span className="icon">
                        <img src="src\assets\contactusIcon.svg"></img>
                        </span>{" "}
                        <span className="title">Contacto</span>
                    </a>
                </Link>
            </div>
          </li>
        </ul>
      ) : (
        <>
          <ul className="nav-BarConteiner-Responsive">
            <li>
              <button
                className="navBar-MenuButton"
                onClick={() => {
                  setVisible(true);
                }}
              >
                <span className="icon">
                  <i className="pi pi-bars"></i>
                </span>
              </button>
            </li>
            <li className="navBar-itemConteiner-companyName">
              <div className="companyName-conteiner">
                <figure>
                  <img
                    src="./src/assets/B & M image.png"
                    width={127}
                    height={45}
                  ></img>
                </figure>
                <figure>
                  <img
                    src="./src/assets/company image.png"
                    width={91}
                    height={41}
                  ></img>
                </figure>
              </div>
            </li>
          </ul>
          <Sidebar
            className="sideBar"
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <h2 style={{ display: "inline", position: "absolute", top: "0" }}>
              Menu
            </h2>
            <Menu model={items} style={{ border: "none", width: "100%" }} />
          </Sidebar>
        </>
      )}
    </nav>
  );
}

export default NavBar;
