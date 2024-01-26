import "./styles/infoPromotion.css";
import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { updatePromotion } from "../../../services/ManagePromotions/updatePromotion";
import { createPromotion } from "../../../services/ManagePromotions/createPromotion";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { Image } from "primereact/image";
import DataTableProducts from "../DataTableProducts";
import AddProductsToOferts from "../AddProductsToOfertsComponent";

function InfoPromotion({
  visible,
  onHide,
  data,
  editable,
  heaerTitle,
  onSave,
  accion,
  setPageLoad,
}) {
  const [infoData, setInfoData] = useState({
    name: "",
    description: "",
    discount_in_percent: "",
    active: false,
    is_special: false,
    img: "",
  });
  const toast = useRef(null);
  const [imgPreview, setImgPreview] = useState(infoData.img);
  const [addProductModal, setAddProductModal] = useState(false);

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

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "",
      detail: accion == "update" ? "Datos actualizados" : "Datos Añadidos",
    });
  };

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
      setAddProductModal(!addProductModal)
  }

  return (
    <section className="info-promotion-container">
      <AddProductsToOferts visible={addProductModal} onHide={handleOnChangeProductMOdal}/>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        className="info-dialog-promotion"
        header={heaerTitle}
        onHide={() => onHide()}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let img = event.target["image"].files;
            setPageLoad(true);
            if (accion == "update") {
              updatePromotion({
                id: infoData.id,
                name: infoData.name,
                description: infoData.description,
                discount_in_percent: infoData.discount_in_percent,
                active: infoData.active,
                is_special: infoData.is_special,
                img: img.length == 0 ? undefined : img[0],
              }).then(() => {
                onSave();
                show();
                setPageLoad(false);
                onHide();
              });
            } else {
              createPromotion({
                name: infoData.name,
                description: infoData.description,
                discount_in_percent: infoData.discount_in_percent,
                active: infoData.active,
                is_special: infoData.is_special,
                img: img.length == 0 ? undefined : img[0],
              }).then(() => {
                onSave();
                show();
                setPageLoad(false);
                onHide();
              });
            }
          }}
          className="info-dialog-form-promotion"
          encType="multipart/form-data"
        >
          {editable && (
            <div className="inputs-dialog-from-container">
              <div className="input-info-dialog image-file-icon">
                <div className="image-file-icon-container">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImgPreview(URL.createObjectURL(e.target.files[0]));
                      handleOnchange(e.target.value, "img");
                    }}
                  />
                  <i className="pi pi-file-import"></i>
                </div>

                <div className="img-dialog-container">
                  {infoData.img ? (
                    <Image src={imgPreview} />
                  ) : (
                    <div className="img-textfile-container">
                      <p>
                        No hay ningún archivo(.jpg, .jpeg, .png, .svg, .webp)
                        todavía.
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
                    <p>Descuento:</p>
                  </div>
                  <div className="input-dialog-container discount-input">
                    <input
                      type="number"
                      defaultValue={infoData.discount_in_percent}
                      onChange={(e) =>
                        handleOnchange(e.target.value, "discount_in_percent")
                      }
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox
                    checked={infoData.active}
                    onChange={() => handleOnChecked("active")}
                  />
                </div>
              </div>
            </div>
          )}

          {!editable && (
            <div className="inputs-dialog-from-container">
              <div className="input-info-dialog">
                <div className="img-dialog-container">
                  <Image zoomSrc={infoData.img} src={infoData.img} preview />
                </div>
              </div>
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
                    <p>Descuento:</p>
                  </div>
                  <div className="input-dialog-container discount-input">
                    <input
                      value={infoData.discount_in_percent}
                      type="number"
                      readOnly
                      suppressContentEditableWarning
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox checked={infoData.active} readOnly />
                </div>
              </div>
            </div>
          )}
          <hr className="oferts-info-intrinsic" />
          <p className="p-products-text-oferts">Productos:</p>
          <div className="add-products-to-oferts-containers">
            <div className="add-products-to-oferts-buttons-container">
              {editable && (
                <>
                  <button
                    className="add-products-to-oferts-buttons"
                    onClick={(e) => {
                      e.preventDefault();
                      setAddProductModal(true);
                    }}
                  >
                    <i className="pi pi-plus" style={{ color: "white" }}></i>
                  </button>
                  <button
                    className="add-products-to-oferts-buttons"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <i className="pi pi-minus" style={{ color: "white" }}></i>
                  </button>
                </>
              )}
            </div>
            <DataTableProducts OfertID={infoData.id} editable={editable} />
          </div>
          <div className="button-promotion-container">
            {editable && (
              <button name="submit_button" className="buttons-user-info">
                {data ? "Guardar" : "Aceptar"}
              </button>
            )}
            <div
              name="exit_button"
              className="buttons-user-info"
              onClick={() => {
                onHide();
              }}
            >
              Cancelar
            </div>
          </div>
        </form>
      </Dialog>
    </section>
  );
}

export default InfoPromotion;
