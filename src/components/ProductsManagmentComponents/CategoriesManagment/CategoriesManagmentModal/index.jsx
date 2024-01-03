import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Loader from "../../../Loader";
import BoxIcon from "../../../../assets/box-icon.svg";
import ActionButtons from "../../ProductList/ActionButtons";
import { useManageCategories } from "../../../../hooks/useManageCategories";
import AddProductIcon from '../../../../assets/add-product-icon.svg';
import RemoveProductIcon from '../../../../assets/remove-product-icon.svg';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from "react";
import "./index.css";

function CategoriesManagmentModal({ show, setShow, toastRef }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const {
    categories,
    loading,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
  } = useManageCategories({ toastRef: toastRef });

  return (
    <Dialog
      header={"Administracion de Categorías"}
      visible={show}
      position={"top"}
      onHide={() => setShow(false)}
      style={{ maxWidth: "100vw" }}
    >
      <section className="categories-managment-modal-content-container">
        {loading ? (
          <section className="categories-managment-list-loader-container">
            <div>
              <Loader />
            </div>
          </section>
        ) : null}
        <section>
          <ConfirmDialog 
            visible={showConfirmDialog} 
            onHide={() => setShowConfirmDialog(false)} 
            acceptClassName='p-button-danger'
            acceptLabel='Aceptar'
            rejectLabel='Cancelar'
            message="Deseas continuar con la operación?" 
            header="Confirmación" 
            icon="pi pi-exclamation-triangle" 
            accept={() => handleDeleteMultipleCategories(selectedCategories)} 
          />
          <div className="buttons-add-delete-container">
            <div className="add-product-button-container">
              <button className="products-managment-filters-bar-button btn-general-styles">
                <img src={AddProductIcon} />
                <span>Agregar</span>
              </button>
            </div>
            <div className="remove-product-button-container">
              <button
                className="products-managment-filters-bar-button btn-general-styles"
                onClick={() => setShowConfirmDialog(true)}
              >
                <img src={RemoveProductIcon} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
          <DataTable
            value={categories}
            selectionMode={"checkbox"}
            selection={selectedCategories}
            onSelectionChange={(e) => setSelectedCategories(e.value)}
            dataKey="id"
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
            <Column
              field="nombre"
              header="Nombre"
              body={(category) => {
                return (
                  <div className="table-product-field-container">
                    <img src={BoxIcon} />
                    <span>{category.nombre}</span>
                  </div>
                );
              }}
            />
            <Column
              field="img"
              header="Imagen"
              body={(category) => {
                return (
                  <img
                    className="data-table-product-image"
                    src={category.img}
                  />
                );
              }}
            />
            <Column
              header="Acciones"
              body={(category) => {
                return (
                  <ActionButtons
                    item={category}
                    handleDelete={handleDeleteCategory}
                  />
                );
              }}
            />
          </DataTable>
        </section>
      </section>
    </Dialog>
  );
}

export default CategoriesManagmentModal;
