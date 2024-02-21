import "./index.css";
import React, { useState, useEffect, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { ChangePassword } from "../ChangePassword";
import { Checkbox } from "primereact/checkbox";
import AuthenticationContext from "../../../context/authenticationContext";
import { addUsers } from "../../../services/ManageUser/addUser";
import { updateUser } from "../../../services/ManageUser/updateUser";

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
    email: "",
    username: "",
    name: "",
    last_name: "",
    is_staff: true,
    is_active: true,
    phone: "",
    country: "",
    state: "",
    address: "",
    zip_code: "",
    password: "",
    country: "",
  });
  const [passwordModalStatus, setPasswordModalStatus] = useState(false);
  const { auth } = useContext(AuthenticationContext);
  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = visible ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [visible]);

  useEffect(() => {
    if (data !== null && accion !== "create") {
      setInfoData(data);
    }
  }, [data, visible ? visible : undefined]);

  const handleOnchange = (value, campo) => {
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = value;
    setInfoData(InfoDataCopy);
  };

  const handleOnChecked = (campo) => {
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = !InfoDataCopy[campo];
    setInfoData(InfoDataCopy);
  };

  const handelOnChangePassworModalStatus = () => {
    setPasswordModalStatus(!passwordModalStatus);
  };

  return (
    <section className={"info-user-container"}>
      <ChangePassword
        onHide={handelOnChangePassworModalStatus}
        visible={passwordModalStatus}
      />
      <Dialog
        visible={visible}
        className={
          mobileSize
            ? accion == "create"
              ? "info-dialog-user-create"
              : "info-dialog-user info-dialog-user-mobileSize"
            : "info-dialog-user"
        }
        header={heaerTitle}
        onHide={() => {
          onHide();
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setPageLoad(true);
            if (accion == "update") {
              updateUser({
                id: infoData.id,
                info: infoData,
                token: auth.token,
              })
                .then(() => {
                  onSave();
                  show("Accion completada", "success");
                  setPageLoad(false);
                  onHide();
                })
                .catch((err) => {
                  console.log(err); 
                  onSave();
                  show("Accion completada", "success");
                  setPageLoad(false);
                  onHide();
                });
            } else {
              addUsers({ info: infoData, token: auth.token })
                .then(() => {
                  onSave();
                  show("Accion completada", "success");
                  setPageLoad(false);
                  onHide();
                })
                .catch((err) => {
                  console.log(err);
                });
            }
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
                    <p>Apellido:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="text"
                      defaultValue={infoData.last_name}
                      onChange={(e) =>
                        handleOnchange(e.target.value, "last_name")
                      }
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
                      onChange={(e) =>
                        handleOnchange(e.target.value, "username")
                      }
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
                {accion == "create" && (
                  <>
                    <div className="input-info-dialog">
                      <div className="p-dialog-container">
                        <p>Contraseña:</p>
                      </div>
                      <div className="input-dialog-container">
                        <input
                          type="password"
                          defaultValue={infoData.password}
                          onChange={(e) =>
                            handleOnchange(e.target.value, "password")
                          }
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
                          onChange={(e) =>
                            handleOnchange(e.target.value, "password")
                          }
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox
                    checked={infoData.is_staff}
                    onChange={() => handleOnChecked("is_staff")}
                  />
                </div>
                {accion != "create" && (
                  <button
                    name="exit_button"
                    className="buttons-user-info"
                    onClick={(e) => {
                      e.preventDefault();
                      handelOnChangePassworModalStatus();
                    }}
                  >
                    Cambiar Contraseña
                  </button>
                )}
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
                    <p>Admin:</p>
                  </div>
                  <Checkbox checked={infoData.is_staff} readOnly />
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
