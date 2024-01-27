import "./pagesStyles/Remesas.css";
import "primeicons/primeicons.css";

import Zelle from "../assets/zelle-icon.svg";
import Cash from "../assets/cash-icon.svg";
import PayPal from "../assets/paypal.svg";
import PhoneImg from "../assets/phone-remesas.jpg";


function Remesas() {
  return (
    <div className="remesas-container">
      <section className="remesas-container-text">
        <img className="remesas-phone" src={PhoneImg} alt="" />
        <div className="remesas-title">
          <h1>Remesas</h1>
          <ul className="platform-icons">
            <li>
              <img src={Zelle} alt="Zelle icon" />
              <p>Zelle</p>
            </li>
            <li>
              <img src={Cash} alt="Zelle icon" />
              <p>Cash</p>
            </li>
            <li>
              <img src={PayPal} alt="Zelle icon" />
              <p>PayPal</p>
            </li>
          </ul>
          <span className="contact-button">
            <button className="remesas-contact-button">
              <i className="pi pi-phone"></i>
              Contactar
            </button>
          </span>
        </div>
      </section>
    </div>
  );
}

export default Remesas;
