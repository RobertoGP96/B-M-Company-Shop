import "./index.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { changePassword } from "../../../services/ManageUser/changePassword";

const heaerTitle = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <i className="pi pi-user "></i>
      <p style={{ marginBlock: "0px", fontSize: "1rem" }}>Cambiar Contraseña</p>
    </div>
  );
};

export function ChangePassword({ onHide, visible, token, user_id, show }) {
  const [passowrdDetails, setPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  const handelOnChange = (value, campo) => {
    var InfoDataCopy = { ...passowrdDetails };
    InfoDataCopy[campo] = value;
    setPasswordDetails(InfoDataCopy);
  };

  return (
    <Dialog
      onHide={() => {
        onHide();
        setPasswordDetails({
          password: "",
          confirmPassword: "",
        })
      }}
      visible={visible}
      position="top"
      className="dialog-change-password"
      header={heaerTitle}
    >
      <form
        onSubmit={() => {
          if (passowrdDetails.password !== passowrdDetails.confirmPassword) {
            show("Las contraseñas no coinciden","warn");
          } else {
            changePassword({
              user_id: user_id,
              password: passowrdDetails.password,
              token: token,
            }).then((respponse) => {     
              if(respponse == "Password Error"){   
                show("Error al cambiar la contraseña. Inténtelo más tarde","warn")
              }
            })

          
          }
        }}
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
              onChange={(e) =>
                handelOnChange(e.target.value, "confirmPassword")
              }
              required
            />
          </div>
        </div>
        <div className="button-user-container">
          <button name="submit_button" className="buttons-user-info">
            Aceptar
          </button>
          <button
            name="exit_button"
            className="buttons-user-info"
            onClick={(e) => {
              e.preventDefault();
              onHide();
              setPasswordDetails({
                password: "",
                confirmPassword: "",
              })
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
}
