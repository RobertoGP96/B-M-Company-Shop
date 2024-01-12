import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {useState, useEffect} from 'react'

function CategoriesForm({
  categoryFormProperties,
  setCategoryFormProperties,
  handleCreateCategory,
  handleUpdateCategory,
  loading
}) {
  const [imagePreview, setimagePreview] = useState(null)

  //set the corresponding image preview 
  useEffect(() =>{
    if(categoryFormProperties.show == true){
      categoryFormProperties.creatingMode == true?
      setimagePreview(null):
      setimagePreview(categoryFormProperties.initialValues.img)
    }
  },[categoryFormProperties.show])

  function createCategory(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleCreateCategory({ name: name, img: img[0] });
  }

  function updateCategory(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleUpdateCategory({
      id: categoryFormProperties.initialValues.id,
      name: name,
      img: img[0],
    });
  }

  function handleSetImagePreview(e){
    let files = e.target.files
    if(files.length > 0){
      setimagePreview(URL.createObjectURL(files[0]))
    }
    else{
      setimagePreview(null)
    }
  }

  return (
    <Dialog
      visible={categoryFormProperties.show}
      onHide={() =>{
        setimagePreview(null)
        setCategoryFormProperties((prev) => ({ ...prev, show: false, disabled:false, initialValues:{} }))
      }
      }
      position="top"
      draggable={false}
      resizable={false}
      header={
        categoryFormProperties.creatingMode
          ? "Crear Categoria"
          : "Editar Categoria"
      }
    >
      <form
        className="categories-form"
        onSubmit={(e) => {
          categoryFormProperties.creatingMode == true
            ? createCategory(e)
            : updateCategory(e);
        }}
        encType="multipart/form-data"
      >
        <div className="category-form-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            aria-describedby="name-help"
            className=".p-inputtext-sm"
            disabled={categoryFormProperties.disabled}
            defaultValue={
              categoryFormProperties.creatingMode
                ? ""
                : categoryFormProperties.initialValues
                ? categoryFormProperties.initialValues.name
                : ""
            }
          />
        </div>
        <div className="category-form-field category-image-field">
          <div className = "category-form-field">
            <label htmlFor="image">Imagen</label>
            <InputText
              id="image"
              aria-describedby="image-help"
              className=".p-inputtext-sm"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              disabled={categoryFormProperties.disabled}
              onChange={(e) => handleSetImagePreview(e)}
            />
          </div>
          {imagePreview?
          <img src ={imagePreview}/>
          :null}
        </div>
        {categoryFormProperties.disabled == false ? (
          <Button label={loading?"Enviando ...":"Enviar"} className="btn-general-styles" />
        ) : null}
      </form>
    </Dialog>
  );
}

export default CategoriesForm;
