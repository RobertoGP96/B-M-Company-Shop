
import "./index.css"
import { Dialog } from "primereact/dialog"
import { useState } from "react"


const heaerTitle =() => {
    return(
      <div style={{display:"flex", alignItems:"center",gap:"10px"}}> 
        <i className="pi pi-user "></i>
        <p style={{marginBlock:"0px",fontSize:"1rem"}}>Cambiar Contraseña</p>
      </div>
    )
  }

export function ChangePassword({onHide,visible}){

    const [passowrdDetails,setPasswordDetails] = useState({
        password:"",
        confirmPassword:""
    })

    const handelOnChange = (value,campo)=>{
        var InfoDataCopy = { ...passowrdDetails };
        InfoDataCopy[campo] = value;
        setPasswordDetails(InfoDataCopy);
    }


    return(
        <Dialog
            onHide={()=>onHide()}
            visible={visible}
            position="top"
            className="dialog-change-password"
            header={heaerTitle}
        >
            <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Nueva Contraseña:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="password"
                      defaultValue={passowrdDetails.password}
                      onChange={(e) => handelOnChange(e.target.value, "password")}
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Confirmar Contraseña:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="password"
                      defaultValue={passowrdDetails.confirmPassword}
                      onChange={(e) => handelOnChange(e.target.value, "confirmPassword")}
                      required
                    />
                  </div>
                </div>
        </Dialog>


    ) 
       
    

}