import "./pagesStyles/ManagementContact.css";
import "primeicons/primeicons.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../context/authenticationContext.jsx";

import {
  getContactInfo,
  editContactInfo,
} from "../services/ManageContact/contact_info_management";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

function ManagementContact() {
  const { auth } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [contact, setContacts] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datos, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    getContactInfo().then((data) => {
      setContacts(data);
      setLoading(false);
      setSaved(false);
    });
  }, [saved]);

  const toast = useRef(null);

  const handleInput = (event) => {
    setData({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const show = () => {
    toast.current.show({
      severity: "info",
      summary: "Precaución",
      detail: "No se ha actulizado ningun contacto.",
    });
  };

  function editContact(data) {
    if (data) {
      console.log(data)
      editContactInfo({ info: data, token: auth.token }).then(() => {
        setSaved(true);
      });
    } else {
      show();
    }
  }

  return (
    <article className="mcontact-container">
      <div className="head-contact">
        <Button
          icon="pi pi-arrow-left"
          className="head-btn-back"
          size="small"
          onClick={() => navigate("/management-menu")}
        />
        <h2>Gestión de Contacto</h2>
      </div>
      {loading ? (
        <i className="pi pi-spinner pi-spin loading-spinner"></i>
      ) : (
        <form
          action="submit"
          onSubmit={() => {
            event.preventDefault();
            editContact(datos.whatsapp?datos:{ ...datos, "whatsapp": contact.whatsapp});
          }}
        >
          <ul className="ccontact-container">
            <li>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-facebook"></i>
                  </span>
                  <InputText
                    name="facebook"
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    placeholder={contact.facebook}
                    onChange={handleInput}
                  />
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-ellipsis-v"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="element-contact">
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-instagram"></i>
                  </span>
                  <InputText
                    name="instagram"
                    placeholder={contact.instagram}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-ellipsis-v"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="element-contact">
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <InputText
                    name="location"
                    placeholder={contact.location}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-ellipsis-v"></i>
                  </span>
                </div>
              </div>
            </li>
          </ul>

          <ul className="ccontact-container">
            <li>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-phone"></i>
                  </span>
                  <InputText
                    name="phone1"
                    placeholder={contact.phone1}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-envelope"></i>
                  </span>
                  <InputText
                    name="email1"
                    placeholder={contact.email1}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-whatsapp"></i>
                  </span>
                  <InputText
                    name="whatsapp"
                    placeholder={contact.whatsapp}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-telegram"></i>
                  </span>
                  <InputText
                    name="telegram"
                    placeholder={contact.telegram}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-money-bill"></i>
                  </span>
                  <InputText
                    name="remesas"
                    placeholder={contact.remesas}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="element-contact">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-truck"></i>
                  </span>
                  <InputText
                    placeholder={contact.envios}
                    style={{ minWidth: "160px", maxWidth: "15rem" }}
                    onChange={handleInput}
                    name="envios"
                  />
                </div>
              </div>
            </li>
          </ul>

          <div className="save-btn-cont">
            <Button
              type="reset"
              icon="pi pi-replay"
              label="Reiniciar"
              className="btn-pane"
              size="small"
            ></Button>
            <Toast ref={toast} />
            <Button
              type="submit"
              icon="pi pi-save"
              label="Guardar"
              className="btn-pane"
              size="small"
            ></Button>
          </div>
        </form>
      )}
    </article>
  );
}

export default ManagementContact;
