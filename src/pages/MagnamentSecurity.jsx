import "./pagesStyles/MagnamentOfertsAndSecurity.css"
import FilterIcon from "../assets/oferts-magnament-filter.svg"
import AddIcon from "../assets/oferts-magnament-add.svg"
import DeleteIcon from"../assets/oferts-magnament-delete.svg"
import SearchIcon from "../assets/search-icon.svg"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useWindowSize from "../hooks/useWindowSize";
import InfoUserSecurity from "../components/OfertsManagmentComponents/InfoDialogComponent/infoUserSecurity"


const headerTableStyle={
    backgroundColor:"#545454",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Noto Sans",
    lineHeight: "137%",
    fontVariant: "small-caps",
    letterSpacing: "-0.8px",
}

const data = [

      {
        name: "Frank",
        email:"asdkas@gmail.com",
        phone:"+1541561351",

      },
      {
        name: "Lachy",
        email:"aksdkl@gmail.com",
        phone:"+15421612552",

      },
      
      {
        name: "Trolbert",
        email:"njbibjk@gmail.com",
        phone:"+154216125",

      },
      {
        name: "Raul",
        email:"nkjsa@gmail.com",
        phone:"+154216125",
      }, 

]

const nameTamplate = (data) => {
    return (
        <div className="name-template-container">
            <i className="pi pi-user"></i>
            <span>{data.name}</span>
        </div>
    );
};




  
function MagnamentSecurity(){
    const [dataSecurity,setDataSecurity] = useState(data)
    const [selectedProducts, setSelectedProducts] = useState(null);
    const responsive = useWindowSize("max",600)
    const [infoDialogStatus,setInfoDialogStatus] = useState(false)
    const [infoDialogEdit,setInfoDialogEdit] = useState(false)
    const [rowData, setRowData] = useState({})   


    const acciones = (data) => {

        return(
            <div className="acctions-oferts-table-container">
                <button className="oferts-actions-table-button"
                    onClick={()=>{
                        setRowData(data)
                        handleOnClickEditButton()
                    }}
                >
                    <i className="pi pi-pencil icon-oferts-table"></i>
                    </button>
                <button className="oferts-actions-table-button" 
                    onClick={()=>{
                        setRowData(data)
                        handleOnClickInfoButton()
                    }}
                >
                    <i className="pi pi-eye icon-oferts-table" ></i>
                </button>
                <button className="oferts-actions-table-button"><i className="pi pi-trash icon-oferts-table"></i></button>
            </div>
        )
    }

    const handleOnChangeRowData = (value) => {setRowData(value)}
    const handleOnClickInfoButton = ()=>{setInfoDialogStatus(!infoDialogStatus)};
    const handleOnClickEditButton = ()=>{setInfoDialogEdit(!infoDialogEdit)};

    return(
        <section className="magnament-oferts-container">
            
            <InfoUserSecurity editable={false} heaerTitle={"Información de usuario"} data={rowData} visible={infoDialogStatus} onHide={handleOnClickInfoButton} setData={()=>{handleOnChangeRowData}}/>
            <InfoUserSecurity editable={true} heaerTitle={"Editar información de usuario"}data={rowData} visible={infoDialogEdit} onHide={handleOnClickEditButton}/>
            
            {/* Titulo de la pagina*/}
            <header><h1>Gestión de Seguridad</h1></header>
            {/* Seccion de la barra de busqueda */}
            <search  title="Sección de búsqueda" className={responsive?"search-oferts-container -wrap600px":"search-oferts-container "}>
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
            <section className="table-oferts-container">
                <DataTable 
                    className="data-table-oferts"
                    value={dataSecurity} 
                    stripedRows 
                    paginator rows={5} 
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}
                    checked={selectedProducts}
                    selectionMode={"checkbox"}
                    size="small"
                    scrollable = {true}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    selection={selectedProducts}
                    
                >
                    <Column className={"column-oferts-field"} selectionMode="multiple"  headerStyle={{ width: '3rem',backgroundColor:"#545454",borderRadius: "0px 0px 0px 5px" }} ></Column>
                    <Column className={"column-oferts-field"}  body={nameTamplate} header="Nombre" headerStyle={headerTableStyle}></Column>
                    <Column className={"column-oferts-field"} field="email" header="Correo" headerStyle={headerTableStyle}></Column>
                    <Column className={"column-oferts-field"} field="phone" header="Teléfono" headerStyle={headerTableStyle}></Column>
                    <Column className={"column-oferts-field"}   header="Acciones" body={acciones} 
                    headerStyle={{borderRadius: "0px 0px 5px 0px", 
                                    backgroundColor:"#545454",
                                    color: "#FFF",
                                    textAlign: "center",
                                    fontFamily: "Noto Sans",
                                    lineHeight: "137%",
                                    fontVariant: "small-caps",
                                    letterSpacing: "-0.8px",}}
                    ></Column>
                </DataTable>
            </section>
            
        </section>

    )
}


export default MagnamentSecurity;