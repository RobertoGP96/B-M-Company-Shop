import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, useEffect, useRef } from "react";
import "./index.css";

function SubjectRequest(MailBM) {
  const [show, setShow] = useState(false);
  const deliveryInfoButtonRef = useRef(null);
  const [info, setInfo] = useState(
    {
      phone: "",
      text: "",
    }
  );

  //focus the add delivery info button when the user try to send the order and the delivery info is empty
  useEffect(() => {
    if (deliveryInfoButtonRef !== null) {
      deliveryInfoButtonRef.current.scrollIntoView({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <>
      <button
        ref={deliveryInfoButtonRef}
        className={"btn-general"}
        onClick={() => {
          setShow(true);
        }}
      >
        <i className="pi pi-send"></i>
        <span>Enviar queja</span>
      </button>

      <Dialog
        visible={show}
        onHide={() => setShow(false)}
        position="top"
        draggable={false}
        resizable={false}
        header="Registro de queja"
        style={{ width: "85%" }}
      >
        <form
          action=""
          className="cart-delivery-info-form"
          onSubmit={(e) => {
            e.preventDefault();
            setShow(false);
          }}
        >
          <span className="p-float-label">
            <InputText
              id="phone"
              defaultValue={""}
              required={false}
              onChange={(e) => {
                setInfo((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
            />
            <label htmlFor="phone">Teléfono</label>
          </span>
          <span className="p-float-label">
            <InputTextarea
              id="subject"
              defaultValue={""}
              required={true}
              onChange={(e) => {
                setInfo((prev) => ({
                  ...prev,
                  text: e.target.value,
                }));
                console.log(info)
              }}
            />
            <label htmlFor="address">Queja</label>
          </span>
          <a
            className="btn-general save-btn-subject"
            href={`mailto:${MailBM.MailBM}?subject=${String(info.phone)}&body=${info.text}`}
          >
            <i className="pi pi-send"></i>
            Enviar
          </a>
        </form>
      </Dialog>
    </>
  );
}

export default SubjectRequest;
