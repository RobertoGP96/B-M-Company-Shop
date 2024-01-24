import "./pagesStyles/MagnamentOfertsAndSecurity.css";
import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { getPromotions } from "../services/ManagePromotions/getPromotions";
import InfoPromotion from "../components/OfertsManagmentComponents/InfoDialogComponent/infoPromotion";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { deletePromotions } from "../services/ManagePromotions/deletePrmotion";
import { Toast } from "primereact/toast";
import { useGetPromotions } from "../hooks/useGetPromotions";
import OfertsGrid from "../components/OfertsManagmentComponents/OfertsGrid";
import PageLoader from "../components/PageLoader";
import DataTableOferts from "../components/OfertsManagmentComponents/DataTableOferts";
import SearchOferts from "../components/OfertsManagmentComponents/SearchOfertsComponent";
import DataScrollerOferts from "../components/OfertsManagmentComponents/DataScrollerOferts";


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
  const [numOfOferts, setNumOferts] = useState(0) 
  

  // Useeffect hook for getting ofert data from server
  const { loading,setLoading } = useGetPromotions({promotions:dataOferts,setPromotions:setDataOferts,setNumOfPromotions:setNumOferts})

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
  const confirm2 = (id) => {
    confirmDialog({
      message: "Esta seguro que desea eliminar esta promoción?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        setLoading(true);
        deletePromotions({ promotions: [id] }).then(() => {
          getPromotions().then((result) => {
            setDataOferts(result.results);
            setLoading(false);
            show("Eliminación completada","success");
          });
        }).catch(err => {
          setLoading(false);
        });;
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
      <PageLoader visible={loading} onHide={()=> null}/>
      <Toast ref={toast} />
      <ConfirmDialog />
      <InfoPromotion
        editable={false}
        heaerTitle={<><i className="pi pi-tag "></i>Información de promoción</>}
        data={rowData}
        visible={infoDialogStatus}
        onHide={handleOnClickInfoButton}
        setPageLoad={setLoading}
      />
      <InfoPromotion
        accion={"update"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={<><i className="pi pi-tag "></i>Editar información de promoción</>}
        data={rowData}
        visible={infoDialogEdit}
        onHide={handleOnClickEditButton}
        setPageLoad={setLoading}
      />
      <InfoPromotion
        accion={"create"}
        editable={true}
        onSave={handleOnChangeData}
        heaerTitle={<><i className="pi pi-tag "></i>Agregar una nueva  promoción</>}
        data={{}}
        visible={infoDialogCreate}
        onHide={handleOnClickCreateButton}
        setPageLoad={setLoading}
      />
      {/* Titulo de la pagina*/}
      <header>
        <button
          className="products-managment-go-back-button btn-general-styles"
          onClick={() => history.back()}
        >
          <i className="pi pi-arrow-left" ></i>
        </button>
        <h1>Gestión de Ofertas</h1>
      </header>
      {/* Seccion de la barra de busqueda */}
      <SearchOferts
        confirmAll={confirmAll}
        handelOnChangeView={handelOnChangeView}
        handleOnClickCreateButton={handleOnClickCreateButton}
        selectedOferts={selectedOferts}
        setSearch={setSearch}
        show={show}
        responsive={responsive}
        search={search}
        viewMode={viewMode}
      />
      {/* Tabla de ofertas */}
      <section className={viewMode=="table"?"table-oferts-container":"table-oferts-container not-overfllow-x"}>
        {!mobileView && viewMode !=="grid"? (
          <DataTableOferts
            dataOferts={dataOferts}
            selectedOferts={selectedOferts}
            setSelectedOferts={setSelectedOferts}
            confirm2={confirm2}
            handleOnClickEditButton={handleOnClickEditButton}
            setRowData={setRowData}
            handleOnClickInfoButton={handleOnClickInfoButton}
          />
        ) : viewMode =="grid"?
          <OfertsGrid 
            deleteConfirm={confirm2} 
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            setRowData={setRowData}
            selectedOferts={selectedOferts}
            oferts={dataOferts}
            numOfOferts={numOfOferts}
          />
        :(
          <DataScrollerOferts
            dataOferts={dataOferts}
            confirm2={confirm2}
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickEditButton={handleOnClickEditButton}
            handleOnClickInfoButton={handleOnClickInfoButton}
            searchChecked={searchChecked}
            selectedOferts={selectedOferts}
            setRowData={setRowData}
          />
        )}
      </section>
    </section>
  );
}

export default MagnamentOferts;
