import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";

import { Checkbox } from "primereact/checkbox";

function InfoUser({
  visible,
  onHide,
  data,
  editable,
  heaerTitle,
  onSave,
  accion,
  setPageLoad,
  show,
  mobileSize,
}) {
  const [infoData, setInfoData] = useState({
    name: "",
    username: "",
    email: "1",
    is_active: false,
    is_staff: false,
   
  });
  const [imgPreview, setImgPreview] = useState(infoData.img);
  const [addProductModal, setAddProductModal] = useState(false);
  const [productsOFerts, setProductsOferts] = useState([]);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = visible ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [visible]);

  useEffect(() => {
    if (data !== null) {
      setInfoData(data);
      setImgPreview(data.img);
    }
  }, [data, visible ? visible : undefined]);

  const handleOnchange = (value, campo) => {
    console.log(value);
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = value;
    setInfoData(InfoDataCopy);
  };

  const handleOnChecked = (campo) => {
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = !InfoDataCopy[campo];
    setInfoData(InfoDataCopy);
  };

  const handleOnChangeProductMOdal = () => {
    setAddProductModal(!addProductModal);
  };
  const searchChecked = (id) => {
    for (let i = 0; i < selectedUsers.length; i++) {
      if (selectedUsers[i] === id) {
        return true;
      }
    }
    return false;
  };

  const handleOnChangeChecked = (data) => {
    var aux = [];
    if (selectedUsers.length > 0) {
      for (let i = 0; i < selectedUsers.length; i++) {
        if (selectedUsers[i] !== data.id) {
          aux.push(selectedUsers[i]);
        }
      }
      if (aux.length == selectedUsers.length) {
        aux.push(data.id);
      }
      setselectedUsers(aux);
    } else {
      aux.push(data.id);
      setselectedUsers(aux);
    }
  };

  return (
    <section className={"info-user-container"}>
      <Dialog
        visible={visible}
        className={
          mobileSize
            ? accion=="create"?"info-dialog-user-create":"info-dialog-user info-dialog-user-mobileSize"
            : "info-dialog-user"
        }
        header={heaerTitle}
        onHide={() => {
          onHide();
          setProductsOferts([]);
          setselectedUsers([]);
        }}

      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setPageLoad(true);
            // if (accion == "update") {
            //   updateuser({
            //     id: infoData.id,
            //     name: infoData.name,
            //     description: infoData.description,
            //     discount_in_percent: infoData.discount_in_percent<=0?infoData.discount_in_percent*(-1):infoData.discount_in_percent,
            //     active: infoData.active,
            //     is_special: infoData.is_special,
            //     img: img.length == 0 ? undefined : img[0],
            //   }).then(() => {
            //     onSave();
            //     show("Accion completada", "success");
            //     setPageLoad(false);
            //     onHide();
            //     setProductsOferts([])
            //   })
            //   .catch((err) => {

            //   }) 
            //   ;
            // } else {
            //   createuser({
            //     name: infoData.name,
            //     description: infoData.description,
            //     discount_in_percent: infoData.discount_in_percent,
            //     active: infoData.active,
            //     is_special: infoData.is_special,
            //     img: img.length == 0 ? undefined : img[0],
            //   }).then(() => {
            //     onSave();
            //     show("Accion completada", "success");
            //     setPageLoad(false);
            //     onHide();
            //   });
            // }
          }}
          className="info-dialog-form-user"
          encType="multipart/form-data"
        >
          {editable && (
            <div
              className={
                mobileSize
                  ? "inputs-dialog-from-container inputs-dialog-from-container-mobileSize"
                  : "inputs-dialog-from-container"
              }
            >

              <div className=" input-info-dialogs-details">
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Nombre:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="text"
                      defaultValue={infoData.name}
                      onChange={(e) => handleOnchange(e.target.value, "name")}
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Usuario:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="text"
                      defaultValue={infoData.username}
                      onChange={(e) => handleOnchange(e.target.value, "username")}
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Correo:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="email"
                      defaultValue={infoData.email}
                      onChange={(e) => handleOnchange(e.target.value, "email")}
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Contraseña:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="password"
                      defaultValue={infoData.password}
                      onChange={(e) => handleOnchange(e.target.value, "email")}
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
                      defaultValue={infoData.password}
                      onChange={(e) => handleOnchange(e.target.value, "email")}
                      required
                    />
                  </div>
                </div>

                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox
                    checked={infoData.is_active}
                    onChange={() => handleOnChecked("is_active")}
                  />
                </div>
                { accion != "create"&&
                  <button
                name="exit_button"
                  className="buttons-user-info"
                  onClick={(e) => {
                    e.preventDefault();
                    onHide();
                    setProductsOferts([]);
                  }}
                >
                 Cambiar Contraseña
                </button>}
              </div>
            </div>
          )}

          {!editable && (
            <div
              className={
                mobileSize
                  ? "inputs-dialog-from-container inputs-dialog-from-container-mobileSize"
                  : "inputs-dialog-from-container"
              }
            >

              <div className=" input-info-dialogs-details">
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Nombre:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input value={infoData.name} type="text" readOnly />
                  </div>
                </div>

                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Usuario:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      value={infoData.username}
                      type="text"
                      readOnly
                      suppressContentEditableWarning
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Correo:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      value={infoData.email}
                      type="text"
                      readOnly
                      suppressContentEditableWarning
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox checked={infoData.is_active} readOnly />
                </div>
                
              </div>

            </div>
            
          )}
         
          <div className="button-user-container">
            {editable && (
              <button name="submit_button" className="buttons-user-info">
                {data ? "Guardar" : "Aceptar"}
              </button>
            )}
            <button
              name="exit_button"
              className="buttons-user-info"
              onClick={(e) => {
                e.preventDefault();
                onHide();
                setProductsOferts([]);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Dialog>
    </section>
  );
}

export default InfoUser;
