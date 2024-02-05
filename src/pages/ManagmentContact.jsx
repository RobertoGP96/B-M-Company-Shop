import "./pagesStyles/ManagmentContact.css";
import "primeicons/primeicons.css";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";


function ManagmentContact() {
  const navigate = useNavigate();
  const [selectFaceContact, selectedFaceContact] = useState(null);
  const [selectInsContact, selectedInsContact] = useState(null);
  const [selectWhaContact, selectedWhaContact] = useState(null);
  const [selectTelContact, selectedTelContact] = useState(null);
  const [selectRemContact, selectedRemContact] = useState(null);
  const [selectEnvContact, selectedEnvContact] = useState(null);

  const [productDialog, setProductDialog] = useState(false);

  const [contact, selectContact] = useState(null);

  const products = [
    {
      id: "1",
      name: "Bamboo Watch",
      phone: 1,
      mail: "trolbertogp96@gmail.com",
    },
    {
      id: "2",
      name: "Bamboo Watch 1",
      phone: 2,
      mail: "trolbertogp96@gmail.com",
    },
    {
      id: "3",
      name: "Bamboo Watch 2",
      phone: 3,
      mail: "trolbertogp96@gmail.com",
    },
  ];

  const iconRow = (rowData) => {
    return <i className="pi pi-id-card row-icon-table"></i>;
  };

  const Header = () => {
    return (
      <div className="agend-header">
        <h2>
        <i className="pi pi-book"></i> Agenda
        </h2>
        <Button
              icon="pi pi-user-plus"
              label="Añadir"
              className="btn-pane"
              size="small"
              onClick={openNew}
            ></Button>
      </div>
    );
  };

  const ProductsDemo = () => {
    return {
      id: null,
      name: "",
      phone: "",
      mail: null,
    };
  };

  const openNew = () => {
    setProductDialog(true);
  };
  const hideDialog = () => {
    setProductDialog(false);
  };

  const contactDialogHeader = (
    <React.Fragment>
      <div className="dialog-header">
        <i className="pi pi-id-card"></i>
        <h4>Registrar Contacto</h4>
      </div>
      
    </React.Fragment>
  );

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Guardar" className="btn-pane" icon="pi pi-save" />
      <Button
        label="Cancelar"
        className="btn-pane"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          text
          rounded
          severity="secondary" /*onClick={() => editProduct(rowData)}*/
        />
        <Button
          icon="pi pi-trash"
          text
          rounded
          severity="secondary" /*onClick={() => confirmDeleteProduct(rowData)}*/
        />
      </React.Fragment>
    );
  };

  const nameEditor = (contact) => {
    return (
      <InputText
        type="text"
        value={contact.value}
        onChange={(e) => contact.editorCallback(e.target.value)}
      />
    );
  };

  const phoneEditor = (contact) => {
    return (
      <InputText
        type="text"
        value={contact.value}
        onChange={(e) => contact.editorCallback(e.target.value)}
      />
    );
  };

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
                style={{ minWidth: "160px", width: "15rem", maxWidth: "15rem" }}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-ellipsis-v"></i>
              </span>
            </div>
          </div>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-instagram"></i>
              </span>
              <InputText
                placeholder="Enlace"
                style={{ minWidth: "160px", width: "15rem", maxWidth: "15rem" }}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-ellipsis-v"></i>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-whatsapp"></i>
              </span>
              <Dropdown
                value={selectWhaContact}
                onChange={(e) => selectedWhaContact(e.value)}
                options={products}
                optionLabel="name"
                size="small"
                placeholder="Select"
                style={{ minWidth: "160px", width: "15rem", maxWidth: "15rem" }}
              />
            </div>
          </div>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-telegram"></i>
              </span>
              <Dropdown
                value={selectTelContact}
                onChange={(e) => selectedTelContact(e.value)}
                options={products}
                optionLabel="name"
                size="small"
                placeholder="Select"
                style={{ minWidth: "160px", width: "15rem", maxWidth: "15rem" }}
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
              <Dropdown
                value={selectRemContact}
                onChange={(e) => selectedRemContact(e.value)}
                options={products}
                optionLabel="name"
                size="small"
                placeholder="Select"
                style={{ minWidth: "160px", width: "15rem", maxWidth: "15rem" }}
              />
            </div>
          </div>
          <div className="element-contact">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-truck"></i>
              </span>
              <Dropdown
                value={selectEnvContact}
                onChange={(e) => selectedEnvContact(e.value)}
                options={products}
                optionLabel="name"
                size="small"
                placeholder="Select"
                style={{ minWidth: "160px", width: "15rem", maxWidth: "15rem" }}
              />
            </div>
          </div>
        </li>
      </ul>

      <div className="agend-container">
        <div className="agend-btn-header">
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
        </div>
        <div className="table-agend">
          <DataTable
            value={products}
            dataKey="id"
            editMode="row"
            size="small"
            removableSort
            stripedRows
            tableStyle={{ minWidth: "50rem", maxHeight: "700px" }}
            header={Header}
          >
            <Column
              body={iconRow}
              style={{ width: "4%" }}
              headerClassName="table-column-header"
            ></Column>
            <Column
              field="name"
              sortable
              header="Nombre"
              style={{ width: "25%" }}
              headerClassName="table-column-header"
            ></Column>
            <Column
              field="phone"
              sortable
              header="Teléfono"
              style={{ width: "20%" }}
              headerClassName="table-column-header"
            ></Column>
            <Column
              field="mail"
              sortable
              header="Correo"
              style={{ width: "30%" }}
              headerClassName="table-column-header"
            ></Column>
            <Column
              body={actionBodyTemplate}
              headerStyle={{ width: "6%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
              headerClassName="table-column-header"
            ></Column>
          </DataTable>
        </div>
      </div>

      <Dialog
        modal
        visible={productDialog}
        onHide={hideDialog}
        style={{ width: "32rem", maxWidth: "20vw"}}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={contactDialogHeader}
        className="p-fluid"
        footer={productDialogFooter}
        headerClassName="product-form-dialog-header"
      >
        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
        <span className="p-float-label avatar-cont">
          <InputText
            id="username"
          />
          <label htmlFor="username"> <i className="pi pi-user"> </i> Nombre</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="phone"
          />
          <label htmlFor="phone"> <i className="pi pi-phone"></i> Teléfono</label>
        </span>

        <span className="p-float-label">
          <InputText
            id="mail"
          />
          <label htmlFor="mail"> <i className="pi pi-envelope"></i> Correo</label>
        </span>

      </Dialog>
    </article>
  );
}

export default ManagmentContact;
