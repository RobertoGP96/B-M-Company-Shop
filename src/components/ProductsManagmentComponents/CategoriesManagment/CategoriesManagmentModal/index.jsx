import { Dialog } from "primereact/dialog";
import Loader from "../../../Loader";
import { useManageCategories } from "../../../../hooks/useManageCategories";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";
import CategoriesForm from "./CategoriesForm";
import CategoriesDatatable from "./CategoriesDatatable";
import ButtonsAddAndDelete from "./ButtonsAddAndDelete";
import "./index.css";

function CategoriesManagmentModal({
  show,
  setShow,
  toastRef,
  setUpdateProducts,
  removeAllFilters,
}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showCategoriesFormModal, setShowCategoriesFormModal] = useState(false);
  const {
    categories,
    loading,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
  } = useManageCategories({
    toastRef: toastRef,
    setUpdateProducts: setUpdateProducts,
    setSelectedCategories: setSelectedCategories,
    removeAllFilters: removeAllFilters,
  });

  return (
    <Dialog
      header={"Administracion de Categorías"}
      visible={show}
      position={"top"}
      onHide={() => setShow(false)}
      style={{ maxWidth: "100vw" }}
      draggable = {false}
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
            acceptClassName="p-button-danger"
            acceptLabel="Aceptar"
            rejectLabel="Cancelar"
            message="Deseas continuar con la operación?"
            header="Confirmación"
            icon="pi pi-exclamation-triangle"
            accept={() => handleDeleteMultipleCategories(selectedCategories)}
          />
          <CategoriesForm
            show={showCategoriesFormModal}
            setShow={setShowCategoriesFormModal}
          />
          <ButtonsAddAndDelete
            setShowCategoriesFormModal={setShowCategoriesFormModal}
            setShowConfirmDialog={setShowConfirmDialog}
          />
          <CategoriesDatatable
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleDeleteCategory={handleDeleteCategory}
          />
        </section>
      </section>
    </Dialog>
  );
}

export default CategoriesManagmentModal;
