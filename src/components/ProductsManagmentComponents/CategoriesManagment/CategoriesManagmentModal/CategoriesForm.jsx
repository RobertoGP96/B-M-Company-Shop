import { Dialog } from "primereact/dialog";

function CategoriesForm({ show, setShow, adding = true, edditing }) {
  return (
    <Dialog
      visible={show}
      onHide={() => setShow(false)}
      position="top"
      draggable={false}
      header={adding ? "Crear Categoria" : "Editar Categoria"}
    >
      <form></form>
    </Dialog>
  );
}

export default CategoriesForm;
