
import "./styles/infoPromotion.css";
import React, { useState,useEffect,useRef } from "react";
import { Dialog } from 'primereact/dialog';
import { updatePromotion } from "../../services/ManagePromotions/updatePromotion";
import { createPromotion } from "../../services/ManagePromotions/createPromotion";
import { Toast } from 'primereact/toast';




function InfoPromotion({visible,onHide,data,editable,heaerTitle,onSave,accion}){
    const [infoData,setInfoData] = useState(
        {name:"",
        description:"",
        discount_in_percent:"",
        active:false,
        is_special:false,
    })
    const toast = useRef(null);

                                

    useEffect(()=>{
        if (data!==null){
            setInfoData(data);
        }
        
    },[data])

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Completado', detail: accion=="update"?'Datos actualizados':"Datos Añadidos"} );
    };   

    const handleOnchange = ( value,campo ) => {
        console.log(value)
        var InfoDataCopy = {...infoData};
        InfoDataCopy[campo] = value;
       setInfoData(InfoDataCopy);
    }
    const handleOnChecked = (campo) => {
        var InfoDataCopy = {...infoData};
        InfoDataCopy[campo] = !InfoDataCopy[campo];
       setInfoData(InfoDataCopy);
    }



    return(
        <section className = "info-promotion-container">
            <Toast ref={toast}/>
           <Dialog visible={visible} className="info-dialog-promotion" header={heaerTitle} onHide={()=>onHide()}>
                <form onSubmit={(event)=>event.preventDefault()} className="info-dialog-form">
                     {  editable && <>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Nombre</p>
                            </div>
                            <div  className="input-dialog-container">
                               <input defaultValue={infoData.name} type="text" onChange={(e)=>handleOnchange(e.target.value,"name")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Descripción</p>
                            </div>
                            <div className="input-dialog-container">
                               <input  defaultValue={infoData.description} type="text" onChange={(e)=>handleOnchange(e.target.value,"description")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Descuento</p>
                            </div>
                            <div className="input-dialog-container">
                               <input defaultValue={infoData.discount_in_percent} type="number" onChange={(e)=>handleOnchange(e.target.value,"discount_in_percent")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Activado</p>
                            </div>
                            <div className="input-dialog-container">
                               <input checked={infoData.active} type="checkbox" onChange={()=>handleOnChecked("active")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Especial</p>
                            </div>
                            <div className="input-dialog-container">
                               <input checked={infoData.is_special} type="checkbox" onChange={()=>handleOnChecked("is_special")}/> 
                            </div> 
                        </div>
                        </> }

                        {  !editable && <>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Nombre:</p>
                            </div>
                            <div  className="input-dialog-container">
                               <input value={infoData.name} type="text" readOnly/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Descripción</p>
                            </div>
                            <div className="input-dialog-container">
                               <input  value={infoData.description} type="text" readOnly/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Descuento:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input value={infoData.discount_in_percent} type="number" readOnly/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Activado</p>
                            </div>
                            <div className="input-dialog-container">
                               <input checked={infoData.active}  type="checkbox" readOnly/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Especial</p>
                            </div>
                            <div className="input-dialog-container">
                               <input checked={infoData.is_special}  type="checkbox" readOnly/> 
                            </div> 
                        </div>
                        </> }

                    {
                        editable && 
                        <div className="buttons-user-info-container">
                            <button className="buttons-user-info"
                                onClick={()=>{
                                    console.log(infoData)
                                    if (accion=="update"){
                                        updatePromotion({id: infoData.id, 
                                                        name: infoData.name,
                                                        description:infoData.description,
                                                        discount_in_percent: infoData.discount_in_percent,
                                                        active: infoData.active,
                                                        is_special: infoData.is_special
                                        }).then(() => {
                                            onSave()
                                            show()
                                            onHide();
                                        });
                                    }
                                    else{
                                        createPromotion({name: infoData.name,
                                                        description:infoData.description,
                                                        discount_in_percent: infoData.discount_in_percent,
                                                        active: infoData.active,
                                                        is_special: infoData.is_special
                                        }).then(() => {
                                            onSave()
                                            show()
                                            onHide();
                                        });
                                    }

                                    
                                }}
                            >
                                {data ?"Guardar":"Aceptar"}
                            </button>
                            <button className="buttons-user-info" 
                                onClick={()=>{
                                    setInfoData(data);
                                    onHide();
                                    
                                }}
                            >   
                                Cancelar
                            </button>
                        </div>
                    
                    
                    }
                </form>
           </Dialog>

        </section>
    )
}


export default InfoPromotion;
