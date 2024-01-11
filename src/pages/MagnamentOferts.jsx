import "./pagesStyles/MagnamentOfertsAndSecurity.css"
import "./pagesStyles/PromotionItemTemplate.css"
import FilterIcon from "../assets/oferts-magnament-filter.svg"
import AddIcon from "../assets/oferts-magnament-add.svg"
import DeleteIcon from"../assets/oferts-magnament-delete.svg"
import SearchIcon from "../assets/search-icon.svg"
import React, { useState, useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useWindowSize from "../hooks/useWindowSize";
import { getPromotions } from "../services/ManagePromotions/getPromotions"
import { DataScroller } from 'primereact/datascroller';
import InfoPromotion from "../components/InfoDialogComponent/infoPromotion"
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { deletePromotions } from "../services/ManagePromotions/deletePrmotion"
import { Toast } from 'primereact/toast';
        


const headerTableStyle={
    backgroundColor:"#545454",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Noto Sans",
    lineHeight: "137%",
    fontVariant: "small-caps",
    letterSpacing: "-0.8px",
}



const nameTamplate = (data) => {
    return (
        <div className="name-template-container">
            <i className="pi pi-tag"></i>
            <span>{data.name}</span>
        </div>
    );
};


  


function MagnamentOferts(){
    const [selectedProducts, setSelectedProducts] = useState(null);
    const mobileView = useWindowSize("max",800)
    const [dataOferts, setDataOferts] = useState([]);
    const responsive = useWindowSize("max",600)
    const [infoDialogStatus,setInfoDialogStatus] = useState(false)
    const [infoDialogEdit,setInfoDialogEdit] = useState(false)
    const [infoDialogCreate,setInfoDialogCreate] = useState(false)
    const [rowData, setRowData] = useState({})  
    const toast = useRef(null)
  

    useEffect(()=>{
        getPromotions().then((result)=>{
            setDataOferts(result.results)
        })
    },[rowData])


    const show = () => {
        toast.current.show({ severity: 'success', summary: '', detail:'Eliminación completada'} );
    };   


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
                <button className="oferts-actions-table-button"
                    onClick={()=>{
                        confirm2(data.id)

                    }}
                >
                    <i className="pi pi-trash icon-oferts-table"></i>
                </button>
            </div>
        )
    }

    
function PromotionItemTemplate(data) {
    return(
        <section className="promotion-card-container">
            <div className="img-promotion-card-section">
                <div className="img-promotion-container">
                    <img src={data.img} alt={data.name} />
                    <p className="description-promotion-text">Descripción</p>
                    <p className="description-promotion">{data.description}</p>
                </div>
            </div>
            <div className="details-prmotion-card-section">
                <p className="mame-promotion">{data.name}</p>   
                <p className="total-products-promotion">{`Productos: ${data.cantidad_products}`}</p>
                <div className="discount-promotion-container">
                    <p className="price">{`-${data.discount_in_percent}%`}</p>
                </div>
            </div>
            <div className="accion-promotion-card-section">
                <button className="oferts-actions-table-button"
                        onClick={()=>{
                            setRowData(data);
                            handleOnClickEditButton();
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
                <button className="oferts-actions-table-button"
                    onClick={()=>{
                        confirm2(data.id)
                        
                    }}
                >
                    <i className="pi pi-trash icon-oferts-table"></i>
                </button>
            </div>
        </section>
    )

    }
    const confirm2 = (id) => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept:()=>{
                console.log(id)
                    deletePromotions({promotions:[id]}).then(()=>{
                        getPromotions().then((result)=>{
                            setDataOferts(result.results)
                            show();
                        })
                    });
            },
            reject:()=>{},
        });
    };
    
    const handleOnChangeData = () => {
        
        getPromotions().then((promotions) => {
            setDataOferts(promotions.results);
        })
    };
    const handleOnClickInfoButton = () => {setInfoDialogStatus(!infoDialogStatus)};
    const handleOnClickEditButton = () => {setInfoDialogEdit(!infoDialogEdit)};
    const handleOnClickCreateButton = () => {setInfoDialogCreate(!infoDialogCreate)};


    return(
        <section className="magnament-oferts-container">
            <Toast ref={toast}/>
            <ConfirmDialog/>
            <InfoPromotion editable={false} heaerTitle={"Información de promocion"} data={rowData} visible={infoDialogStatus} onHide={handleOnClickInfoButton} />
            <InfoPromotion accion={"update"}editable={true} onSave={handleOnChangeData} heaerTitle={"Editar información de promocion"} data={rowData} visible={infoDialogEdit} onHide={handleOnClickEditButton}/>
            <InfoPromotion accion={"create"} editable={true} onSave={handleOnChangeData} heaerTitle={"Editar información de promocion"} data={{}} visible={infoDialogCreate} onHide={handleOnClickCreateButton}/>
          

            {/* Titulo de la pagina*/}
            <header><h1>Gestión de Ofertas</h1></header>
            {/* Seccion de la barra de busqueda */}
            <search  title="Sección de búsqueda" className={responsive?"search-oferts-container -wrap600px":"search-oferts-container"}>
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

                <button className="search-oferts-button" onClick={handleOnClickCreateButton}>
                    <img src={AddIcon} alt="add" width={"13px"}/>
                    <p>Agregar</p>
                </button>

                <button className="search-oferts-button" onClick={confirm2}>
                    <img src={DeleteIcon} alt="delete" width={"13px"}/>
                    <p>Eliminar</p>
                </button>
            </search>
            {/* Tabla de ofertas */}
            <section  className={"table-oferts-container"}>
               { !mobileView ?<DataTable 
                    className="data-table-oferts"
                    
                    value={dataOferts} 
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
                        <Column className={"column-oferts-field"} body={nameTamplate} header="Nombre" headerStyle={headerTableStyle}></Column>
                        <Column className={"column-oferts-field"} field="description" header="Descripcion" headerStyle={headerTableStyle}></Column>
                        <Column className={"column-oferts-field"} field="cantidad_products" header="Cant. Producto" headerStyle={headerTableStyle}></Column>
                        <Column className={"column-oferts-field"} field="discount_in_percent" header="Descuento" headerStyle={headerTableStyle}></Column>
                        <Column className={"column-oferts-field"}  field="acciones" header="Acciones" body={acciones} 
                        headerStyle={{borderRadius: "0px 0px 5px 0px", 
                                        backgroundColor:"#545454",
                                        color: "#FFF",
                                        textAlign: "center",
                                        fontFamily: "Noto Sans",
                                        lineHeight: "137%",
                                        fontVariant: "small-caps",
                                        letterSpacing: "-0.8px",}}
                        ></Column>
                    </DataTable>:
                    <DataScroller 
                    value={dataOferts} 
                    itemTemplate={PromotionItemTemplate} 
                    rows={dataOferts.length}
                    inline 
                    header="Listado de Ofertas" />
                    
                }
            </section>
            
        </section>

    )
}


export default MagnamentOferts;