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
  const [categoryFormProperties, setCategoryFormProperties] = useState({
    show:false,
    initialValues:null,
    disabled:false,
    creatingMode:true
  })
  const {
    categories,
    loading,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
    handleCreateCategory,
    handleUpdateCategory
  } = useManageCategories({
    toastRef: toastRef,
    setUpdateProducts: setUpdateProducts,
    setSelectedCategories: setSelectedCategories,
    removeAllFilters: removeAllFilters,
    setCategoryFormProperties:setCategoryFormProperties
  });

  function processUpdateCategory({id, nombre}){
    setCategoryFormProperties(prev => ({
      ...prev,
      show:true,
      creatingMode:false,
      initialValues:{
        id:id,
        name:nombre,
      },
      disabled:false
    }))
  }

  function processDetailCategory({id, nombre}){
    setCategoryFormProperties(prev => ({
      ...prev,
      show:true,
      creatingMode:false,
      initialValues:{
        id:id,
        name:nombre,
      },
      disabled:true
    }))
  }

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
            categoryFormProperties = {categoryFormProperties}
            setCategoryFormProperties={setCategoryFormProperties}
            handleCreateCategory = {handleCreateCategory}
            handleUpdateCategory = {handleUpdateCategory}
          />
          <ButtonsAddAndDelete
            setCategoryFormProperties={setCategoryFormProperties}
            setShowConfirmDialog={setShowConfirmDialog}
          />
          <CategoriesDatatable
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleDeleteCategory={handleDeleteCategory}
            processUpdateCategory = {processUpdateCategory}
            processDetailCategory = {processDetailCategory}
          />
        </section>
      </section>
    </Dialog>
  );
}

export default CategoriesManagmentModal;
