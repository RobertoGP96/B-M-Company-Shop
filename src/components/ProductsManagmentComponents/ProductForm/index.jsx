import { Dialog } from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";
import './index.css'

function ProductForm({ productFormProperties, setProductFormProperties, handleCreateProduct, handleUpdateProduct }) {
  const [activeStatusChecked, setChecked] = useState(() => {
    return productFormProperties.creatingMode == true?true:productFormProperties.initialValues.is_active}
    )
  
  function createProduct(e){
    e.preventDefault()
    let values = {
      product_name: e.target["name"].value,
      product_description: e.target["description"].value,
      about: e.target["about"].value,
      precio: e.target["price"].value,
      categoria: null,
      is_active: activeStatusChecked,
      in_stock: e.target["stock"].value,
      descuento: e.target["discount"].value,
      product_img1: e.target["img1"].files[0],
      product_img2: e.target["img2"].files[0],
      product_img3: e.target["img3"].files[0]
    }
    handleCreateProduct(values)
  }  

  function updateProduct(e){
    e.preventDefault()
    let values = {
      product_name: e.target["name"].value,
      product_description: e.target["description"].value,
      about: e.target["about"].value,
      precio: e.target["price"].value,
      categoria: null,
      is_active: activeStatusChecked,
      in_stock: e.target["stock"].value,
      descuento: e.target["discount"].value,
      product_img1: e.target["img1"].files[0],
      product_img2: e.target["img2"].files[0],
      product_img3: e.target["img3"].files[0]
    }
  handleUpdateProduct({id:productFormProperties.initialValues.id, values:values})  
  }  
    
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
      style={{ minHeight: "95vh", width: "50vw" }}
    >
      <form className = "product-form" onSubmit={(e) => {
        productFormProperties.creatingMode == true?createProduct(e):updateProduct(e)
        }}
      >
        {/*name*/}
        <div className="product-form-field">
            <label htmlFor="name">Nombre</label>
            <InputText id="name" aria-describedby="name-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.product_name}
            />
        </div>
        {/*description*/}
        <div className="product-form-field">
            <label htmlFor="description">Descripción</label>
            <InputText id="description" aria-describedby="description-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.product_description}
            />
        </div>
        {/*about*/}
        <div className="product-form-field">
            <label htmlFor="about">Acerca del producto</label>
            <InputTextarea id="about" aria-describedby="about-help" 
            style={{maxWidth:"100%", minWidth:"100%"}} 
            disabled = {productFormProperties.disabled}
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.about}
            />
        </div>
        {/*price*/}
        <div className="product-form-field">
            <label htmlFor="price">Precio</label>
            <InputText id="price" aria-describedby="price-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            type = "number"
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.precio}
            />
        </div>
        {/*category*/}
        <div className="product-form-field">
            <label htmlFor="category">Categoría</label>
            <InputText id="category" aria-describedby="category-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.categoria}
            />
        </div>
        {/*active*/}
        <div className="product-form-active-checkbox">
            <Checkbox id="active" aria-describedby="active-help"  
            disabled = {productFormProperties.disabled}
            checked={activeStatusChecked}
            onChange={e => setChecked(e.checked)}
            />
            <label htmlFor="active">Activo</label>
        </div>
        {/*stock*/}
        <div className="product-form-field">
            <label htmlFor="stock">Cantidad</label>
            <InputText id="stock" aria-describedby="stock-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            type = "number"
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.in_stock}
            />
        </div>
        {/*Discount*/}
        <div className="product-form-field">
            <label htmlFor="discount">Descuento</label>
            <InputText id="discount" aria-describedby="discount-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            type = "number"
            defaultValue = {
              productFormProperties.creatingMode?"":
              productFormProperties.initialValues.descuento}
            />
        </div>
        {/*Img 1*/}
        <div className="product-form-field">
            <label htmlFor="img1">Imagen 1</label>
            <InputText id="img1" aria-describedby="img1-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            type = "file"
            />
        </div>
        {/*Img 2*/}
        <div className="product-form-field">
            <label htmlFor="img2">Imagen 2</label>
            <InputText id="img2" aria-describedby="img2-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            type = "file"
            />
        </div>
        {/*Img 3*/}
        <div className="product-form-field">
            <label htmlFor="img3">Imagen 3</label>
            <InputText id="img3" aria-describedby="img3-help" className=".p-inputtext-sm" 
            disabled = {productFormProperties.disabled}
            type = "file"
            />
        </div>
        {/*Submit*/}
        {productFormProperties.disabled == false?
        <Button label="Enviar" className="btn-general-styles"/>:null}
      </form>
    </Dialog>
  );
}

export default ProductForm;
