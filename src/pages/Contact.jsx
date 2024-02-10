import "./pagesStyles/Contact.css";
import "primeicons/primeicons.css";
import Logo from "../assets/B&MCshop-logo.svg";
import { useState, useEffect } from "react";
import { getContactInfo } from "../services/ManageContact/contact_info_managment";

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
          <img src={Logo} alt="Logo of B&M Company Shop" />
        </div>
        <article className="intro-contact-into">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
              <ContactLabel label="Whatsap" loading={loading} action={`https://wa.me/message/${data.whatsapp}`}/>
            </span>
            <span>
              <i className="pi pi-telegram"></i>
              <ContactLabel label="Telegram" loading={loading} action={`https://te.me/message/${data.telegram}`}/>
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
    <i className="pi pi-spinner pi-spin"></i>
  ) : (
    <a className="label-social" href={action} >{label}</a>
  );
}
