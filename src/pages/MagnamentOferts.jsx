import "./pagesStyles/MagnamentOfertsAndSecurity.css";
import "./pagesStyles/PromotionItemTemplate.css";
import FilterIcon from "../assets/oferts-magnament-filter.svg";
import AddIcon from "../assets/oferts-magnament-add.svg";
import DeleteIcon from "../assets/oferts-magnament-delete.svg";
import SearchIcon from "../assets/search-icon.svg";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useWindowSize from "../hooks/useWindowSize";
import { getPromotions } from "../services/ManagePromotions/getPromotions";
import { DataScroller } from "primereact/datascroller";
import InfoPromotion from "../components/OfertsManagmentComponents/InfoDialogComponent/infoPromotion";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deletePromotions } from "../services/ManagePromotions/deletePrmotion";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { useGetPromotions } from "../hooks/useGetPromotions";
import { InputSwitch } from "primereact/inputswitch";
import OfertsGrid from "../components/OfertsManagmentComponents/OfertsGrid";

//Header Table styles
const headerTableStyle = {
  backgroundColor: "#545454",
  color: "#FFF",
  textAlign: "center",
  fontFamily: "Noto Sans",
  lineHeight: "137%",
  fontVariant: "small-caps",
  letterSpacing: "-0.8px",
};

//Component to display ofert name in one of the table columns
const nameTamplate = (data) => {
  return (
    <div className="name-template-container">
      <i className="pi pi-tag"></i>
      <span>{data.name}</span>
    </div>
  );
};

//Managment Ofert Component
function MagnamentOferts() {
  const [selectedOferts, setSelectedOferts] = useState([]);
  const mobileView = useWindowSize("max", 800);
  const [dataOferts, setDataOferts] = useState([]);
  const responsive = useWindowSize("max", 600);
  const [infoDialogStatus, setInfoDialogStatus] = useState(false);
  const [infoDialogEdit, setInfoDialogEdit] = useState(false);
  const [infoDialogCreate, setInfoDialogCreate] = useState(false);
  const [rowData, setRowData] = useState({});
  const toast = useRef(null);
  const [search,setSearch] = useState("")
  const [mounted, setMounted] = useState(false)
  const [viewMode,setViewMode] = useState("table")
  

  // Useeffect hook for getting ofert data from server
  useGetPromotions({promotions:dataOferts,setPromotions:setDataOferts})

  useEffect(() => {
    if(mounted){
        let timeOut = setTimeout(() => getPromotions(`search=${search}`).then((result)=>{
            setDataOferts(result.results)
        }), 350)  
        return () => clearTimeout(timeOut)
    }
    else{
        setMounted(true)
    }
},[search])


  //Function for show delete messange when ofert is deleted
  const show = (detail,severity) => {
    toast.current.show({
      severity: severity,
      summary: "",
      detail: detail,
    });
  };

  //component to display manage icons in one of the table columns
  const acciones = (data) => {
    return (
      <div className="acctions-oferts-table-container">
        <button
          className="oferts-actions-table-button"
          onClick={() => {
            setRowData(data);
            handleOnClickEditButton();
          }}
        >
          <i className="pi pi-pencil icon-oferts-table"></i>
        </button>
        <button
          className="oferts-actions-table-button"
          onClick={() => {
            setRowData(data);
            handleOnClickInfoButton();
          }}
        >
          <i className="pi pi-eye icon-oferts-table"></i>
        </button>
        <button
          className="oferts-actions-table-button"
          onClick={() => {
            confirm2(data.id);
          }}
        >
          <i className="pi pi-trash icon-oferts-table"></i>
        </button>
      </div>
    );
  };

  const searchChecked = (oferts,id) =>{
        for(let i = 0; i < oferts.length; i++) {
            if(oferts[i].id === id){
                return true;
            }
        }
        return false;
    };

  const handleOnChangeChecked = (oferts,data) =>{
       var copyOferts = []
        if(oferts.length > 0){
        for(let i = 0; i < oferts.length; i++) {
            if(oferts[i] !== data){
                copyOferts.push(oferts[i]);
            }
        }
            if(copyOferts.length == oferts.length){ 
                copyOferts.push(data);
            }
            setSelectedOferts(copyOferts);
        }else{
            copyOferts.push(data)
            setSelectedOferts(copyOferts);
        }
    };

    const handelOnChangeView = ()=>{
      if(viewMode =="table")
        setViewMode("grid")
      else
        setViewMode("table");
    };


  //Component for display ofert data in mobile versions screens used in DataScroller component
  function PromotionItemTemplate(data) {
    return (
      <section className="promotion-card-container">
        <div className="img-promotion-card-section">
          <div className="img-promotion-container">
            <img src={data.img} alt={data.name} />
          </div>
          <Checkbox     
            checked={searchChecked(selectedOferts,data.id)}
            onChange={()=>handleOnChangeChecked(selectedOferts,data)}  
          />
        </div>
        <div className="details-prmotion-card-section">
          <p className="mame-promotion">{data.name}</p>
          <p className="total-products-promotion">{`Productos: ${data.cantidad_products}`}</p>
          <div className="discount-promotion-container">
            <p className="price">{`-${data.discount_in_percent}%`}</p>
          </div>
        </div>
        <div className="accion-promotion-card-section">
          <button
            className="oferts-actions-table-button"
            onClick={() => {
              setRowData(data);
              handleOnClickEditButton();
            }}
          >
            <i className="pi pi-pencil icon-oferts-table"></i>
          </button>
          <button
            className="oferts-actions-table-button"
            onClick={() => {
              setRowData(data);
              handleOnClickInfoButton();
            }}
          >
            <i className="pi pi-eye icon-oferts-table"></i>
          </button>
          <button
            className="oferts-actions-table-button"
            onClick={() => {
              confirm2(data.id);
            }}
          >
            <i className="pi pi-trash icon-oferts-table"></i>
          </button>
        </div>
      </section>
    );
  }

  const confirm2 = (id) => {
    confirmDialog({
      message: "Esta seguro que desea eliminar esta promoción?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deletePromotions({ promotions: [id] }).then(() => {
          getPromotions().then((result) => {
            setDataOferts(result.results);
            show("Eliminación completada","success");
          });
        });
      },
      reject: () => {},
    });
  };

  const confirmAll = (data) => {
    var dataId=[];
    for (var i = 0; i < data.length; i++) {
        dataId.push(data[i].id);
    } 
    confirmDialog({
      message: "Esta seguro que desea eliminar esta promoción?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        deletePromotions({ promotions: dataId }).then(() => {
          getPromotions().then((result) => {
            setDataOferts(result.results);
            show("Eliminación completada","success");
          });
        });
      },
      reject: () => {},
    });
  };

  const handleOnChangeData = () => {
    getPromotions().then((promotions) => {
      setDataOferts(promotions.results);
    });
  };
  const handleOnClickInfoButton = () => {
    setInfoDialogStatus(!infoDialogStatus);
  };
  const handleOnClickEditButton = () => {
    setInfoDialogEdit(!infoDialogEdit);
  };
  const handleOnClickCreateButton = () => {
    setInfoDialogCreate(!infoDialogCreate);
  };

  return (
    <section className="magnament-oferts-container">
      <Toast ref={toast} />
      <ConfirmDialog />
      <InfoPromotion
        editable={false}
        heaerTitle={"Información de promocion"}
        data={rowData}
        visible={infoDialogStatus}
        onHide={handleOnClickInfoButton}
      />
      <InfoPromotion
        accion={"update"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={"Editar información de promocion"}
        data={rowData}
        visible={infoDialogEdit}
        onHide={handleOnClickEditButton}
      />
      <InfoPromotion
        accion={"create"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={"Editar información de promocion"}
        data={{}}
        visible={infoDialogCreate}
        onHide={handleOnClickCreateButton}
      />

      {/* Titulo de la pagina*/}
      <header>
        <h1>Gestión de Ofertas</h1>
      </header>
      {/* Seccion de la barra de busqueda */}
      <search
        title="Sección de búsqueda"
        className={
          responsive
            ? "search-oferts-container -wrap600px"
            : "search-oferts-container"
        }
      >
        <form
          onSubmit={(event) => event.preventDefault()}
          className="search-oferts-form"
        >
          <img src={SearchIcon} width={"16px"} />
          <input placeholder="Buscar" type="search" 
          value={search} 
          onChange={(e)=>{setSearch(e.target.value)}}/>
        </form>
        
        <InputSwitch style={{minWidth:"50px"}} checked={viewMode=="table"}  onChange={handelOnChangeView}/>

        <button className="search-oferts-button">
          <img src={FilterIcon} alt="filter" width={"12px"} />
          <p>Filtros</p>
        </button>


        <button
          className="search-oferts-button"
          onClick={handleOnClickCreateButton}
        >
          <img src={AddIcon} alt="add" width={"13px"} />
          <p>Agregar</p>
        </button>

        <button className="search-oferts-button" 
            onClick={() => {
                if(selectedOferts.length > 0) 
                    confirmAll(selectedOferts)
                else 
                    show("Debe seleccionar almenos un elemento","warn")
            }}
        >
          <img src={DeleteIcon} alt="delete" width={"13px"} />
          <p>Eliminar</p>
        </button>
      </search>
      {/* Tabla de ofertas */}
      <section className={"table-oferts-container"}>
        {!mobileView && viewMode=="table"? (
          <DataTable
            className="data-table-oferts"
            value={dataOferts}
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            checked={selectedOferts}
            selectionMode={"checkbox"}
            size="small"
            scrollable={true}
            onSelectionChange={(e) => {setSelectedOferts(e.value)
                console.log(selectedOferts)
            }}
            selection={selectedOferts}
          >
            <Column
              className={"column-oferts-field"}
              selectionMode="multiple"
              headerStyle={{
                width: "3rem",
                backgroundColor: "#545454",
                borderRadius: "0px 0px 0px 5px",
              }}
            ></Column>
            <Column
              className={"column-oferts-field"}
              body={nameTamplate}
              header="Nombre"
              headerStyle={headerTableStyle}
            ></Column>
            <Column
              className={"column-oferts-field"}
              field="description"
              header="Descripcion"
              headerStyle={headerTableStyle}
            ></Column>
            <Column
              className={"column-oferts-field"}
              field="cantidad_products"
              header="Cant. Producto"
              headerStyle={headerTableStyle}
              sortable 
            ></Column>
            <Column
              className={"column-oferts-field"}
              field="discount_in_percent"
              header="Descuento"
              headerStyle={headerTableStyle}
              sortable 
            ></Column>
            <Column
              className={"column-oferts-field"}
              field="acciones"
              header="Acciones"
              body={acciones}
              headerStyle={{
                borderRadius: "0px 0px 5px 0px",
                backgroundColor: "#545454",
                color: "#FFF",
                textAlign: "center",
                fontFamily: "Noto Sans",
                lineHeight: "137%",
                fontVariant: "small-caps",
                letterSpacing: "-0.8px",
              }}
            ></Column>
          </DataTable>
        ) : viewMode=="grid"?
          <OfertsGrid 
            deleteConfirm={confirm2} 
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            setRowData={setRowData}
            selectedOferts={selectedOferts}
            oferts={dataOferts}
          />
        :(
          <DataScroller
            className="data-oferts-scroller"
            value={dataOferts}
            itemTemplate={PromotionItemTemplate}
            rows={dataOferts.length}
            inline
            header="Listado de Ofertas"
          />
        )}
      </section>
    </section>
  );
}

export default MagnamentOferts;
