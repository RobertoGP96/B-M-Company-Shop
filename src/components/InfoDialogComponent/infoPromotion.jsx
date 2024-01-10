
import "./styles/infoPromotion.css";
import React, { useState,useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { updatePromotion } from "../../services/ManagePromotions/updatePromotion";



function InfoPromotion({visible,onHide,data,editable,heaerTitle,onSave}){
    const [infoData,setInfoData] = useState({})


    useEffect(()=>{
        setInfoData(data);
    },[data])

    const handleOnchange = ( value,campo ) => {
        
        var InfoDataCopy = {...infoData};
        InfoDataCopy[campo] = value;
       setInfoData(InfoDataCopy);
    }

    return(
        <section className = "info-promotion-container">
           <Dialog visible={visible} className="info-dialog-promotion" header={heaerTitle} onHide={()=>onHide()}>
                <form onSubmit={(event)=>event.preventDefault()} className="info-dialog-form">
                     {  editable && <>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Nombre:</p>
                            </div>
                            <div  className="input-dialog-container">
                               <input defaultValue={infoData.name} type="text" onChange={(e)=>handleOnchange(e.target.value,"name")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Descripción:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input  defaultValue={infoData.description} type="text" onChange={(e)=>handleOnchange(e.target.value,"description")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container" >
                                <p>Descuento:</p>
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
                               <input defaultChecked={infoData.active} type="checkbox" onChange={(e)=>handleOnchange(e.target.value,"active")}/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>Es especial?</p>
                            </div>
                            <div className="input-dialog-container">
                               <input defaultChecked={infoData.is_special} type="checkbox" onChange={(e)=>handleOnchange(e.target.value,"is_special")}/> 
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
                                <p>Descripción:</p>
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
                                <p>Activado:</p>
                            </div>
                            <div className="input-dialog-container">
                               <input checked={infoData.active}  type="checkbox" readOnly/> 
                            </div> 
                        </div>
                        <div className="input-info-dialog">
                            <div className="p-dialog-container">
                                <p>es especial?:</p>
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
                                    updatePromotion({id: infoData.id, 
                                                    name: infoData.name,
                                                    description:infoData.description,
                                                    discount_in_percent: infoData.discount_in_percent,
                                                    active: infoData.active,
                                                    is_special: infoData.is_special
                                    }).then(() => {
                                        onSave()
                                    });
                                    
                                }}
                            >
                                Guardar
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
