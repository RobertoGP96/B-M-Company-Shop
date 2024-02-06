import "./pagesStyles/ManagmentContact.css";
import "primeicons/primeicons.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {getContactInfo} from "../services/ManageContact/contact_info_managment"

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function ManagmentContact() {
  const navigate = useNavigate();
  
  const [save, setSave] = useState();
  const [contact, setContacts] = useState();

  useEffect(() => {
    getContactInfo().then((result)=>{
      setContacts(result.results)
      console.log(contact)
    })
  },[save])

  return (
    <article className="mcontact-container">
      <div className="head-contact">
        <Button
          icon="pi pi-arrow-left"
          className="head-btn-back"
          size="small"
          onClick={() => navigate("/magnament-menu")}
        />
        <h2>Gestión de Contacto</h2>
      </div>
      <ul className="ccontact-container">
        <li>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-facebook"></i>
              </span>
              <InputText
                placeholder="Enlace"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
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
                placeholder="Enlace"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
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
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
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
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </div>
          </div>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
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
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </div>
          </div>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-telegram"></i>
              </span>
              <InputText
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
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
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </div>
          </div>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-truck"></i>
              </span>
              <InputText
                placeholder="Ubicación"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </div>
          </div>
        </li>
      </ul>

      <div className="save-btn-cont">
        <Button
          icon="pi pi-replay"
          label="Reiniciar"
          className="btn-pane"
          size="small"
        ></Button>

        <Button
          icon="pi pi-save"
          label="Guardar"
          className="btn-pane"
          size="small"
        ></Button>
      </div>
    </article>
  );
}

export default ManagmentContact;
