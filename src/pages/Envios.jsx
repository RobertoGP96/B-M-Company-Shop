import "./pagesStyles/Envios.css";
import "primeicons/primeicons.css";
import Logo from "../assets/BYM logo/B&M-E-COMMERSE.svg";
import { useState, useEffect } from "react";
import { getContactInfo } from "../services/ManageContact/contact_info_management.js";
import { Skeleton } from "primereact/skeleton";

function Envios() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getContactInfo().then((response) => {
      setData(response);
      setLoading(false);
    });
  }, []);

  return (
    <section className="envios-container">
      <div className="envios-container-section">
        <article className="intro-envios-into">
          <div className="logo-envios-into">
            <img src={Logo} className="Logo" alt="Logo of B&M Company" />
          </div>
          <p>
            Realizamos 
            <strong> envios </strong>
            a todas partes del país. con un excelente servicio, la mayor rapidez posible y gran confiabilidad.
          </p>
        </article>
        <article className="social-envios-into">
          <h5>Puede contactarnos al:</h5>
          <EnviosLabel label={data.phone1} loading={loading} />
          <ul className="social-envios-info">
            <li>
              <a href={`tel:${data.phone1}`}>
              <i className="pi pi-phone"></i>
              </a>
            </li>
            <li>
              <a href={`whatsapp://send?phone=${data.whatsapp}`}>
                <i className="pi pi-whatsapp"></i>
              </a>
            </li>
            <li>
              <a href={`https://t.me/${data.telegram}`}>
                <i className="pi pi-telegram"></i>
              </a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Envios;

function EnviosLabel({ label, loading, action }) {
  return loading ? (
    <Skeleton width="10rem" height="1.5rem" borderRadius="5px"></Skeleton>
  ) : (
    <a className="label-social-envio" href={action}>
      {label}
    </a>
  );
}
