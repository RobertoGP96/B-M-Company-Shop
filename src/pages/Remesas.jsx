import "./pagesStyles/Remesas.css";
import "primeicons/primeicons.css";

import Zelle from "../assets/zelle-icon.svg";
import Cash from "../assets/cash-icon.svg";
import PayPal from "../assets/paypal.svg";
import PhoneImg from "../assets/Frame-2.webp";
import { Skeleton } from "primereact/skeleton";

import { useState, useEffect } from "react";

import { getContactInfo } from "../services/ManageContact/contact_info_management";


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
          <div className="remesas-price">
            <p>{data.phone2}</p>
          </div>
          <ul className="platform-icons">
              <a href="https://www.zellepay.com/" target="_blank">
            <li>
              <img src={Zelle} className="phone-hand-img" alt="Zelle icon" />
              <p>Zelle</p>
            </li>
              </a>
              <a rel="noreferer" href="https://cash.app/" target="_blank">

            <li>
              <img src={Cash} alt="Zelle icon" />
              <p>Cash</p>
            </li>
              </a>
              <a href="https://www.paypal.com/"  target="_blank">           
            <li>
              <img src={PayPal} alt="Zelle icon" />
              <p>PayPal</p>
            </li>
              </a>
          </ul>
          <span className="contact-button">
            <ContactLabel label={data.remesas} loading={loading}/>
            <button className="remesas-contact-button">
              <i className="pi pi-phone"></i>
              <a href={`whatsapp://send?phone=${data.remesas}`}>
                Contactar
              </a>
            </button>
          </span>
        </div>
      </section>
    </div>
  );
}


function ContactLabel({ label, loading }) {
  return loading ? (
    <Skeleton width="10rem" height="1.5rem" ></Skeleton>
  ) : (
    <h4>{label}</h4>
  );
}

export default Remesas;


