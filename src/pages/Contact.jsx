import "./pagesStyles/Contact.css";
import "primeicons/primeicons.css";
import Logo from "../assets/BYM logo/B&M-E-COMMERSE.svg";
import { useState, useEffect } from "react";
import { getContactInfo } from "../services/ManageContact/contact_info_management";
import {Skeleton} from "primereact/skeleton"

function Contact() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getContactInfo().then((response) => {
      setData(response);
      setLoading(false);
    });
  }, []);

  return (
    <div className="contact-container">
      <section className="container">
        <div className="logo-contact-into">
          <img src={Logo}  className="Logo" alt="Logo of B&M Company" />
        </div>
        <article className="intro-contact-into">
          <p>
          Esperemos que haya sido de su agrado alguno de nuestros productos.  
          Si desea puede contactarnos por alguno de estos medios.
          Estaremos encantados de responder cualquiera de sus dudas.
          </p>
        </article>
        <article className="social-contact-into">
          <div className="service-info">
            <h4>Contamos con:</h4>
            <span>
              <i className="pi pi-truck"></i>
              <p>Servicio a domicilio</p>
            </span>
            <span>
              <i className="pi pi-dollar"></i>
              <p>Se aceptan varias monedas</p>
            </span>
          </div>
          <div className="contact-info">
            <h4>Puede contactarnos:</h4>
            <span>
              <i className="pi pi-phone"></i>
              <ContactLabel label={data.phone1} loading={loading} action={`tel:${data.phone1}`} />
            </span>
            <span>
              <i className="pi pi-envelope"></i>
              <ContactLabel label={data.email1} loading={loading} action={`mailto:${data.email1}`}/>
            </span>
            <span>
              <i className="pi pi-map-marker"></i>
              <ContactLabel label={data.location} loading={loading} />
            </span>
          </div>
          <div className="social-info">
            <h4>Redes Sociales:</h4>
            <span>
              <i className="pi pi-facebook"></i>
              <ContactLabel label="Facebook" loading={loading} action={data.facebook} />
            </span>
            <span>
              <i className="pi pi-whatsapp"></i>
              <ContactLabel label="Whatsap" loading={loading} action={`whatsapp://send?phone=${data.whatsapp}`}/>
            </span>
            <span>
              <i className="pi pi-telegram"></i>
              <ContactLabel label="Telegram" loading={loading} action={`https://t.me/${data.telegram}`}/>
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Contact;

function ContactLabel({ label, loading, action }) {
  return loading ? (
    <Skeleton width="6rem"></Skeleton>
  ) : (
    <a className="label-social" href={action} >{label}</a>
  );
}
