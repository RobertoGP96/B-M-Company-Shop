import "./index.css";
import useWindowSize from "../../hooks/useWindowSize";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import "primeicons/primeicons.css";
import { useLocation } from "react-router-dom";
import CompanyImage from "../../assets/BYM logo/B&M-LOGO.svg";
import ByMEcommers from "../../assets/BYM logo/B&M-SUB-LOGO.svg";
import HomeIcon from "../../assets/home.svg";
import StoreIcon from "../../assets/tiendaIcon.svg";
import ProductsIcon from "../../assets/productsIcon.svg";
import ContactIcon from "../../assets/contactusIcon.svg";
import RemesasIcon from "../../assets/remesas-icon.svg";
import Cart from '../Cart'
import UserNavbarActionsDropdown from "../UserNavbarActions";

function NavBar() {
  const navigate = useNavigate();
  const responsive = useWindowSize("min", 1030);
  const [visible, setVisible] = useState(false);
  const refActive = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = visible ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [visible]);

  const items = [
    {
      label: "Inicio",
      command: () => {
        navigate("/");
        setVisible(false);
      },
    },
    {
      label: "Tienda",
      command: () => {
        navigate("/store");
        setVisible(false);
      },
    },
    {
      label: "Gestionar",
      command: () => {
        navigate("/management-menu");
        setVisible(false);
      },
    },
    {
      label: "Contacto",
      command: () => {
        navigate("/contactus");
        setVisible(false);
      },
    },
    {
      label: "Remesas",
      command: () => {
        navigate("/remesas");
        setVisible(false);
      },
    },
    {
      label: "Envios",
      command: () => {
        navigate("/envios");
        setVisible(false);
      },
    },
  ];

  const handleOnActive = () => {
    if (refActive.current) {
      refActive.current.classList.toggle("navBar-itemConteiner active");
    }
  };

  return (
    <nav className="navbar">
      {responsive ? (
        <ul className="nav-BarConteiner">
          <li className="navBar-itemConteiner-companyName">
            <div className="companyName-conteiner">
              <Link to="/">
                <figure className="logo-continer">
                  <img src={CompanyImage} width={50} height={42}></img>
                  <img src={ByMEcommers} width={50} height={25}></img>
                </figure>
              </Link>
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
              <Link to="/">
                <div className="navBar-item">
                  <span className="icon">
                    <img src={HomeIcon}></img>
                  </span>
                  <span className="title">Inicio</span>
                </div>
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
              <Link to="/store">
                <div className="navBar-item">
                  <span className="icon">
                    <img src={StoreIcon}></img>
                  </span>{" "}
                  <span className="title">Tienda</span>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                pathname == "/management-menu"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
              <Link to="/management-menu">
                <div className="navBar-item">
                  <span className="icon">
                    <img src={ProductsIcon}></img>
                  </span>{" "}
                  <span className="title">Gestionar</span>
                </div>
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
              <Link to="/contactus">
                <div className="navBar-item">
                  <span className="icon">
                    <img src={ContactIcon}></img>
                  </span>{" "}
                  <span className="title">Contacto</span>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <div
              className={
                pathname == "/remesas"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
              <Link to="/remesas">
                <div className="navBar-item">
                  <span className="icon">
                    <img src={RemesasIcon}></img>
                  </span>{" "}
                  <span className="title">Remesas</span>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                pathname == "/envios"
                  ? "navBar-itemConteiner active"
                  : "navBar-itemConteiner"
              }
            >
              <Link to="/envios">
                <div className="navBar-item">
                  <span className="icon">
                    <i className="pi pi-truck"></i>
                  </span>{" "}
                  <span className="title">Envios</span>
                </div>
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
                  <img src={CompanyImage} width={50} height={45}></img>
                  <img src={ByMEcommers} width={50} height={25}></img>
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
      <div className = "cart-and-close-session-icons-container">
        <Cart/>
        <UserNavbarActionsDropdown/>
      </div>
    </nav>
  );
}

export default NavBar;
