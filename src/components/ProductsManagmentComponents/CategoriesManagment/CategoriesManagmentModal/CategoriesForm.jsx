import { Dialog } from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import { Button } from "primereact/button";

function CategoriesForm({categoryFormProperties, setCategoryFormProperties, handleCreateCategory, handleUpdateCategory}) {
    function createCategory(e){
        e.preventDefault();
        let name = e.target["name"].value
        let img = e.target["image"].files
        handleCreateCategory({name:name, img:img[0]})
    }

    function updateCategory(e){
        e.preventDefault();
        let name = e.target["name"].value
        let img = e.target["image"].files
        handleUpdateCategory({id:categoryFormProperties.initialValues.id , name:name, img:img[0]})
    }

  return (
    <Dialog
      visible={categoryFormProperties.show}
      onHide={() => setCategoryFormProperties(prev => ({...prev, show:false}))}
      position="top"
      draggable={false}
      header={categoryFormProperties.creatingMode? "Crear Categoria" : "Editar Categoria"}
    >
      <form className = "categories-form" onSubmit={(e) => {categoryFormProperties.creatingMode == true?createCategory(e):updateCategory(e)}} encType="multipart/form-data">
        <div className="category-form-field">
            <label htmlFor="name">Nombre</label>
            <InputText id="name" aria-describedby="name-help" className=".p-inputtext-sm" 
            disabled = {categoryFormProperties.disabled}
            defaultValue = {
              categoryFormProperties.creatingMode?"":
              categoryFormProperties.initialValues?categoryFormProperties.initialValues.name:""}
            />
        </div>
        <div className="category-form-field">
            <label htmlFor="image">Imagen</label>
            <InputText 
                id="image" 
                aria-describedby="image-help" 
                className=".p-inputtext-sm" 
                type="file"
                accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
                disabled = {categoryFormProperties.disabled}
                />
        </div>
        {categoryFormProperties.disabled == false?
          <Button label="Submit" className="btn-general-styles"/>:null
        }
      </form>
    </Dialog>
  );
}

export default CategoriesForm;
