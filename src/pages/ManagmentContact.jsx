import "./pagesStyles/ManagmentContact.css";
import "primeicons/primeicons.css";

import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from "react-router-dom"

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';



function ManagmentContact() {
  const navigate = useNavigate()
  const [selectFaceContact, selectedFaceContact] =useState(null)
  const [selectInsContact, selectedInsContact] =useState(null)
  const [selectWhaContact, selectedWhaContact] =useState(null)
  const [selectTelContact, selectedTelContact] =useState(null)
  const [selectRemContact, selectedRemContact] =useState(null)
  const [selectEnvContact, selectedEnvContact] =useState(null)

  const products = [
    {
      id: "1",
      name: "Bamboo Watch",
      phone: 1,
      mail:"trolbertogp96@gmail.com",
    },
    {
      id: "2",
      name: "Bamboo Watch 1",
      phone: 2,
      mail:"trolbertogp96@gmail.com",
    },
    {
      id: "3",
      name: "Bamboo Watch 2",
      phone: 3,
      mail:"trolbertogp96@gmail.com",
    },
  ];

  const iconRow= (rowData) => {
    return (
        <i className="pi pi-id-card row-icon-table"></i>
    );
  }

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" text rounded severity="secondary"/*onClick={() => editProduct(rowData)}*/ />
            <Button icon="pi pi-trash"  text rounded severity="secondary"/*onClick={() => confirmDeleteProduct(rowData)}*/ />
        </React.Fragment>
    );
};

  
  return (
    <article className="mcontact-container">
      <div className="head-contact">
        <Button icon="pi pi-arrow-left" className="head-btn-back" size="small"  onClick={()=>navigate("/magnament-menu")} />
        <h2>Gestión de Contacto</h2>
      </div>
      <ul className="ccontact-container">
        <li>
          <div className="element-contact">
            <i className="pi pi-facebook"></i>
            <span>Facebook</span>
            <Dropdown value={selectFaceContact} onChange={(e) => selectedFaceContact(e.value)} options={products} 
                optionLabel="name"
                size="small"
                placeholder="Select" style={{ minWidth: '4rem', maxWidth:'130px' }}  />
          </div>
          <div className="element-contact">
            <i className="pi pi-instagram"></i>
            <span>Intagram</span>
            <Dropdown value={selectInsContact} onChange={(e) => selectedInsContact(e.value)} options={products} 
              optionLabel="name"
              size="small"
              placeholder="Select" style={{ minWidth: '4rem', maxWidth:'130px' }}  />
          </div>
        </li>
        <li>
          <div className="element-contact">
            <i className="pi pi-whatsapp"></i>
            <span>Whatsapp</span>
            <Dropdown value={selectWhaContact} onChange={(e) => selectedWhaContact(e.value)} options={products} 
                optionLabel="name"
                size="small"
                placeholder="Select" style={{ minWidth: '4rem', maxWidth:'130px' }}  />
          </div>
          <div className="element-contact">
            <i className="pi pi-telegram"></i>
            <span>Telegram</span>
            <Dropdown value={selectTelContact} onChange={(e) => selectedTelContact(e.value)} options={products} 
                optionLabel="name"
                size="small"
                placeholder="Select" style={{ minWidth: '4rem', maxWidth:'130px' }}  />
          </div>
        </li>
        <li>
          <div className="element-contact">
            <i className="pi pi-money-bill"></i>
            <span>Remesas</span>
            <Dropdown value={selectRemContact} onChange={(e) => selectedRemContact(e.value)} options={products} 
                optionLabel="name"
                size="small"
                placeholder="Select" style={{ minWidth: '4rem', maxWidth:'130px' }}  />
          </div>
          <div className="element-contact">
            <i className="pi pi-truck"></i>
            <span>Envios</span>
            <Dropdown value={selectEnvContact} onChange={(e) => selectedEnvContact(e.value)} options={products} 
                optionLabel="name"
                size="small"
                placeholder="Select" style={{ minWidth: '4rem', maxWidth:'130px' }}  />
          </div>
        </li>
      </ul>

      <div className="agend-container">
        <h3> <i className="pi pi-book"></i> Agenda</h3>
        <div className="table-agend">
          <DataTable value={products} dataKey="id" editMode="row" size="small" removableSort stripedRows tableStyle={{ minWidth: "50rem", maxHeight:"700px"}}>
            <Column body={iconRow} style={{ width: '4%' }} headerClassName="table-column-header"></Column>
            <Column field="name"  sortable header="Nombre" style={{ width: '25%' }} headerClassName="table-column-header"></Column>
            <Column field="phone" sortable header="Teléfono" style={{ width: '20%' }} headerClassName="table-column-header"></Column>
            <Column field="mail" sortable header="Correo" style={{ width: '30%' }} headerClassName="table-column-header"></Column>
            <Column body={actionBodyTemplate} headerStyle={{ width: '6%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} headerClassName="table-column-header"></Column>
          </DataTable>
        </div>
        <div className="save-btn-cont">
          <Button icon="pi pi-save" label="Guardar" className="btn-pane" size="small"></Button>
          <Button icon="pi pi-replay" label="Reiniciar" className="btn-pane" size="small"></Button>
        </div>
      </div>
    </article>
  );
}

export default ManagmentContact;
