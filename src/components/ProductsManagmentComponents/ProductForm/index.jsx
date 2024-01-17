import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useManageProductForm } from "../../../hooks/useManageProductForm";
import { useImagePreview } from "../../../hooks/useImagePreview";
import "./index.css";

function ProductForm({
  productFormProperties,
  resetProductFormProperties,
  handleCreateProduct,
  handleUpdateProduct,
  categories,
  promotions,
  loading
}) {
  const {
    categorySelected,
    categoriesOptions,
    setCategorySelected,
    promotionSelected,
    setPromotionSelected,
    promotionsOptions,
    activeStatusChecked,
    updateProduct,
    createProduct
  } = useManageProductForm({
    productFormProperties: productFormProperties,
    handleCreateProduct: handleCreateProduct,
    handleUpdateProduct: handleUpdateProduct,
    categories: categories,
    promotions: promotions,
  });
  const { imagesPreview, handleSetImagePreview } = useImagePreview({
    formProperties: productFormProperties,
    isProductForm: true,
  });
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
      onHide={() => resetProductFormProperties()}
      draggable={false}
      resizable={false}
      style={{ minHeight: "95vh", minWidth: "50vw", maxWidth: "98vw" }}
    >
      <form
        className="product-form"
        encType="multipart/form-data"
        onSubmit={(e) => {
          productFormProperties.creatingMode == true
            ? createProduct(e)
            : updateProduct(e);
        }}
      >
        {/*name*/}
        <div className="product-form-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            aria-describedby="name-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            defaultValue={
              productFormProperties.creatingMode
                ? ""
                : productFormProperties.initialValues.product_name
            }
          />
        </div>
        {/*description*/}
        <div className="product-form-field">
          <label htmlFor="description">Descripción</label>
          <InputText
            id="description"
            aria-describedby="description-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            defaultValue={
              productFormProperties.creatingMode
                ? ""
                : productFormProperties.initialValues.product_description
            }
          />
        </div>
        {/*about*/}
        <div className="product-form-field">
          <label htmlFor="about">Acerca del producto</label>
          <InputTextarea
            id="about"
            aria-describedby="about-help"
            style={{ maxWidth: "100%", minWidth: "100%" }}
            disabled={productFormProperties.disabled}
            defaultValue={
              productFormProperties.creatingMode
                ? ""
                : productFormProperties.initialValues.about
            }
          />
        </div>
        {/*price*/}
        <div className="product-form-field">
          <label htmlFor="price">Precio</label>
          <InputText
            id="price"
            aria-describedby="price-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            type="number"
            defaultValue={
              productFormProperties.creatingMode
                ? ""
                : productFormProperties.initialValues.precio
            }
          />
        </div>
        {/*category*/}
        <div className="product-form-field">
          <label htmlFor="category">Categoría</label>
          <Dropdown
            id="category"
            aria-describedby="category-help"
            disabled={productFormProperties.disabled}
            value={categorySelected}
            onChange={(e) => setCategorySelected(e.value)}
            options={categoriesOptions}
            optionLabel="name"
            placeholder="Categoría"
            className="w-full md:w-14rem"
          />
        </div>
        {/*promotion*/}
        <div className="product-form-field">
          <label htmlFor="promotion">Promoción</label>
          <Dropdown
            id="promotion"
            aria-describedby="promotion-help"
            disabled={productFormProperties.disabled}
            value={promotionSelected}
            onChange={(e) => setPromotionSelected(e.value)}
            options={promotionsOptions}
            optionLabel="name"
            placeholder="Promoción"
            className="w-full md:w-14rem"
          />
        </div>
        {/*active*/}
        <div className="product-form-active-checkbox">
          <Checkbox
            id="active"
            aria-describedby="active-help"
            disabled={productFormProperties.disabled}
            checked={activeStatusChecked}
            onChange={(e) => setChecked(e.checked)}
          />
          <label htmlFor="active">Activo</label>
        </div>
        {/*stock*/}
        <div className="product-form-field">
          <label htmlFor="stock">Cantidad</label>
          <InputText
            id="stock"
            aria-describedby="stock-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            type="number"
            defaultValue={
              productFormProperties.creatingMode
                ? ""
                : productFormProperties.initialValues.in_stock
            }
          />
        </div>
        {/*Discount*/}
        <div className="product-form-field">
          <label htmlFor="discount">Descuento</label>
          <InputText
            id="discount"
            aria-describedby="discount-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            type="number"
            defaultValue={
              productFormProperties.creatingMode
                ? ""
                : productFormProperties.initialValues.descuento
            }
          />
        </div>
        {/*Img 1*/}
        <div className="product-form-field">
          <label htmlFor="img1">Imagen 1</label>
          <div className="product-image-field">
            <InputText
              id="img1"
              aria-describedby="img1-help"
              className=".p-inputtext-sm"
              disabled={productFormProperties.disabled}
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 0 })}
            />
            {imagesPreview[0] ? <img src={imagesPreview[0]} /> : null}
          </div>
        </div>
        {/*Img 2*/}
        <div className="product-form-field">
          <label htmlFor="img2">Imagen 2</label>
          <div className="product-image-field">
            <InputText
              id="img2"
              aria-describedby="img2-help"
              className=".p-inputtext-sm"
              disabled={productFormProperties.disabled}
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 1 })}
            />
            {imagesPreview[1] ? <img src={imagesPreview[1]} /> : null}
          </div>
        </div>
        {/*Img 3*/}
        <div className="product-form-field">
          <label htmlFor="img3">Imagen 3</label>
          <div className="product-image-field">
            <InputText
              id="img3"
              aria-describedby="img3-help"
              className=".p-inputtext-sm"
              disabled={productFormProperties.disabled}
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 2 })}
            />
            {imagesPreview[2] ? <img src={imagesPreview[2]} /> : null}
          </div>
        </div>
        {/*Submit*/}
        {productFormProperties.disabled == false ? (
          <Button label={loading == true?"Enviando...":"Enviar"} className="btn-general-styles" />
        ) : null}
      </form>
    </Dialog>
  );
}

export default ProductForm;
