import { Dialog } from "primereact/dialog";

function ProductForm({ productFormProperties, setProductFormProperties }) {
  return (
    <Dialog
      position="right"
      header={
        productFormProperties.creatingMode == true
          ? "Agregar Producto"
          : productFormProperties.disabled
          ? "Detalle de Producto"
          : "Editar Producto"
      }
      visible={productFormProperties.show}
      onHide={() =>
        setProductFormProperties((prev) => ({ ...prev, show: false }))
      }
      draggable={false}
      resizable={false}
      style={{ minHeight: "95vh", minWidth: "50vw" }}
    >
      Products
    </Dialog>
  );
}

export default ProductForm;
