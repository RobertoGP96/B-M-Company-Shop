import "./pagesStyles/Remesas.css";
import "primeicons/primeicons.css";

import Zelle from "../assets/zelle-icon.svg";
import Cash from "../assets/cash-icon.svg";
import PayPal from "../assets/paypal.svg";
import PhoneImg from "../assets/Frame-2.webp";

import { useState, useEffect } from "react";

import { getContactInfo } from "../services/ManageContact/contact_info_managment";


function Remesas() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getContactInfo().then((response) => {
      setData(response);
      setLoading(false);
    });
  }, []);



  return (
    <div className="remesas-container">
      <section className="remesas-container-text">
        <img className="remesas-phone" src={PhoneImg} alt="" />
        <div className="remesas-title">
          <h1>Remesas</h1>
          <ul className="platform-icons">
            <li>
              <img src={Zelle} className="phone-hand-img" alt="Zelle icon" />
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
            <ContactLabel label={data.remesas} loading={loading}/>
            <button className="remesas-contact-button">
              <i className="pi pi-phone"></i>
              <a href="http://">Contactar</a>
            </button>
          </span>
        </div>
      </section>
    </div>
  );
}


function ContactLabel({ label, loading }) {
  return loading ? (
    <i className="pi pi-spinner pi-spin"></i>
  ) : (
    <h4>{label}</h4>
  );
}

export default Remesas;


