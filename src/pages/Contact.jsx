import "./pagesStyles/Contact.css";
import "primeicons/primeicons.css";
import Logo from "../assets/B&MCshop-logo.svg";

function Contact() {
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
               <p>
               +53 56789012
               </p>
            </span>
            <span>
              <i className="pi pi-envelope"></i>
              <p>
               b&mcshop@gmail.com
               </p>
            </span>
            <span>
              <i className="pi pi-map-marker"></i>
              <p>
               Ubicación
              </p>
            </span>
          </div>
          <div className="social-info">
            <h4>Redes Sociales:</h4>
            <span>
              <i className="pi pi-facebook"></i>
              <p>
               Facebook
               </p>
            </span>
            <span>
              <i className="pi pi-whatsapp"></i>
              <p>
              Whatsapp 
              </p>
            </span>
            <span>
              <i className="pi pi-telegram"></i>
              <p>
               Telegram
               </p>
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Contact;
