import "./pagesStyles/MagnamentOferts.css"
import FilterIcon from "../assets/oferts-magnament-filter.svg"
import AddIcon from "../assets/oferts-magnament-add.svg"
import DeleteIcon from"../assets/oferts-magnament-delete.svg"
import SearchIcon from "../assets/search-icon.svg"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';



const dataOferts = [
      {
        name: "Abrigos por navidad",
        description:"Buenos abrigos, fabricados con tela especial",
        product_count:"25",
        descuento: "22", 
      },
      {
        name: "Vetas de palayeras",
        description:"las mejores palayeras para disfrutar del verano",
        product_count:"35",
        descuento: "15",
      },
      {
        name: "Lo mejor de la cocina ",
        description:"Utencilios de cocina especiales para mejorar la calidad",
        product_count:"50",
        descuento: "12",
      }

]

const acciones = () => {

    return(
        <div className="acctions-oferts-table-container">
            <button className="oferts-actions-table-button"><i className="pi pi-eye icon-oferts-table"></i></button>
            <button className="oferts-actions-table-button"><i className="pi pi-pencil icon-oferts-table"></i></button>
            <button className="oferts-actions-table-button"><i className="pi pi-trash icon-oferts-table"></i></button>
        </div>
    )
}
  


function MagnamentOferts(){
    const [rowClick, setRowClick] = useState(true);
    return(
        <section className="magnament-oferts-container">
            {/* Seccion de la barra de busqueda */}
            <search  title="Sección de búsqueda" className="search-oferts-container">
                <form onSubmit={(event) => event.preventDefault()} className="search-oferts-form">
                    <img src = {SearchIcon} width={"16px"}/>
                    <input 
                        placeholder='Buscar' 
                    />
                </form>

                <button className="search-oferts-button">
                    <img src={FilterIcon} alt="filter" width={"12px"}/>
                    <p>Filtros</p>
                </button>

                <button className="search-oferts-button">
                    <img src={AddIcon} alt="add" width={"13px"}/>
                    <p>Agregar</p>
                </button>

                <button className="search-oferts-button">
                    <img src={DeleteIcon} alt="delete" width={"13px"}/>
                    <p>Eliminar</p>
                </button>
            </search>
            {/* Tabla de ofertas */}
            <section  className="table-oferts-container">
                <DataTable 
                    className="data-table-oferts"
                    value={dataOferts} 
                    stripedRows 
                    paginator rows={5} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}
                    checked={rowClick}
                    selectionMode={rowClick ? null : 'checkbox'}
                    size="small"
                    scrollable 
                   
                    
                >
                    <Column className={"column-oferts-field"} selectionMode="multiple"  headerStyle={{ width: '3rem' }} ></Column>
                    <Column className={"column-oferts-field"} field="name" header="Nombre"></Column>
                    <Column className={"column-oferts-field"} field="description" header="Descripcion"></Column>
                    <Column className={"column-oferts-field"} field="product_count" header="Cant. Producto"></Column>
                    <Column className={"column-oferts-field"} field="descuento" header="Descuento"></Column>
                    <Column className={"column-oferts-field"} field="acciones" header="Acciones" body={acciones} ></Column>
                </DataTable>
            </section>
            
        </section>

    )
}


export default MagnamentOferts;