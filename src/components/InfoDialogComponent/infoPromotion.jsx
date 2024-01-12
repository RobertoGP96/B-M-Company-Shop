import "./styles/infoPromotion.css";
import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { updatePromotion } from "../../services/ManagePromotions/updatePromotion";
import { createPromotion } from "../../services/ManagePromotions/createPromotion";
import { Toast } from "primereact/toast";

function InfoPromotion({
  visible,
  onHide,
  data,
  editable,
  heaerTitle,
  onSave,
  accion,
}) {
  const [infoData, setInfoData] = useState({
    name: "",
    description: "",
    discount_in_percent: "",
    active: false,
    is_special: false,
  });
  const toast = useRef(null);

  useEffect(() => {
    if (data !== null) {
      setInfoData(data);
    }
  }, [data]);

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "",
      detail: accion == "update" ? "Datos actualizados" : "Datos Añadidos",
    });
  };

  const handleOnchange = (value, campo) => {
    console.log(value)
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = value;
    setInfoData(InfoDataCopy);
  };

  const handleOnChecked = (campo) => {
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = !InfoDataCopy[campo];
    setInfoData(InfoDataCopy);
  };

  return (
    <section className="info-promotion-container">
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        className="info-dialog-promotion"
        header={heaerTitle}
        onHide={() => onHide()}
        position="right"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault()
            let img = event.target["image"].files;
            console.log(img.length);
            if (accion == "update") {
                updatePromotion({
                  id: infoData.id,
                  name: infoData.name,
                  description: infoData.description,
                  discount_in_percent: infoData.discount_in_percent,
                  active: infoData.active,
                  is_special: infoData.is_special,
                  img: img.length == 0 ?undefined:img[0]
                }).then(() => {
                  onSave();
                  show();
                  onHide();
                });
              } else {
                createPromotion({
                  name: infoData.name,
                  description: infoData.description,
                  discount_in_percent: infoData.discount_in_percent,
                  active: infoData.active,
                  is_special: infoData.is_special,
                  img: img.length == 0 ?undefined:img[0]
                }).then(() => {
                  onSave();
                  show();
                  onHide();
                });
              }
            }
        }
          className="info-dialog-form-promotion"
          encType="multipart/form-data"
        >
          {editable && (
            <>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Nombre</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    type="text"
                    defaultValue={infoData.name}
                    onChange={(e) => handleOnchange(e.target.value, "name")}
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Descripción</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    type="text"
                    defaultValue={infoData.description}
                    onChange={(e) =>
                      handleOnchange(e.target.value, "description")
                    }
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Descuento</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    type="number"
                    defaultValue={infoData.discount_in_percent}
                    onChange={(e) =>
                      handleOnchange(e.target.value, "discount_in_percent")
                    }
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Activado</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    type="checkbox"
                    checked={infoData.active}
                    onChange={() => handleOnChecked("active")}
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Especial</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    type="checkbox"
                    checked={infoData.is_special}
                    onChange={() => handleOnChecked("is_special")}
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Imagen</p>
                </div>
                <div className="input-dialog-container with-img">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>  handleOnchange(e.target.value, "img")}
                  />
                  <div className="img-dialog-container">
                    <img src={infoData.img} />
                  </div>
                </div>
              </div>
            </>
          )}

          {!editable && (
            <>
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
                  <p>Descripción</p>
                </div>
                <div className="input-dialog-container">
                  <input value={infoData.description} type="text" readOnly />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Descuento:</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    value={infoData.discount_in_percent}
                    type="number"
                    readOnly
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Activado</p>
                </div>
                <div className="input-dialog-container">
                  <input checked={infoData.active} type="checkbox" readOnly />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Especial</p>
                </div>
                <div className="input-dialog-container">
                  <input
                    checked={infoData.is_special}
                    type="checkbox"
                    readOnly
                  />
                </div>
              </div>
              <div className="input-info-dialog">
                <div className="p-dialog-container">
                  <p>Imgen</p>
                </div>
                <div className="img-dialog-container">
                  <img src={infoData.img} />
                </div>
              </div>
            </>
          )}

          {editable && (
            <div className="button-promotion-container">
              <button
                name="submit_button"
                className="buttons-user-info"
                onClick={(e) => {
                  
                }}
              >
                {data ? "Guardar" : "Aceptar"}
              </button>
            </div>
          )}
        </form>
      </Dialog>
    </section>
  );
}

export default InfoPromotion;
