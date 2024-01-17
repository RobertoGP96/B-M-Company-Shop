import { useState, useEffect } from "react";

export function useManageProductForm({
  productFormProperties,
  handleUpdateProduct,
  handleCreateProduct,
  promotions,
  categories,
}) {
  const [activeStatusChecked, setChecked] = useState(true);
  const categoriesOptions = categories.map((category) => ({
    name: category.nombre,
    code: category.id,
  }));
  const promotionsOptions = promotions.map((promotion) => ({
    name: promotion.name,
    code: promotion.id,
  }));
  const [categorySelected, setCategorySelected] = useState({
    name: "Categoría",
    code: null,
  });
  const [promotionSelected, setPromotionSelected] = useState({
    name: "Promoción",
    code: null,
  });

  //effect to update the activeStatus and categorySelected
  useEffect(() => {
    //update if the product is active or not
    productFormProperties.creatingMode == false
      ? setChecked(productFormProperties.initialValues.is_active)
      : setChecked(true);
    //update the category and promotion of the product
    if (productFormProperties.creatingMode == false) {
      setCategorySelected(
        categoriesOptions.find(
          (category) =>
            category.code == productFormProperties.initialValues.categoria
        )
      );
      setPromotionSelected(
        promotionsOptions.find(
          (promotion) =>
            promotion.code == productFormProperties.initialValues.promotion
        )
      );
    } else {
      setCategorySelected({ name: "Categoría", code: null });
      setPromotionSelected({ name: "Promoción", code: null });
    }
  }, [productFormProperties.initialValues]);

  function createProduct(e) {
    e.preventDefault();
    let values = {
      product_name: e.target["name"].value,
      product_description: e.target["description"].value,
      about: e.target["about"].value,
      precio: e.target["price"].value,
      categoria: categorySelected.code,
      promotion: promotionSelected.code,
      is_active: activeStatusChecked,
      in_stock: e.target["stock"].value,
      descuento: e.target["discount"].value,
      product_img1: e.target["img1"].files[0],
      product_img2: e.target["img2"].files[0],
      product_img3: e.target["img3"].files[0],
    };
    handleCreateProduct({ values: values });
  }

  function updateProduct(e) {
    e.preventDefault();
    let values = {
      product_name: e.target["name"].value,
      product_description: e.target["description"].value,
      about: e.target["about"].value,
      precio: e.target["price"].value,
      categoria: categorySelected.code,
      promotion: promotionSelected.code,
      is_active: activeStatusChecked,
      in_stock: e.target["stock"].value,
      descuento: e.target["discount"].value,
      product_img1: e.target["img1"].files[0],
      product_img2: e.target["img2"].files[0],
      product_img3: e.target["img3"].files[0],
    };
    handleUpdateProduct({
      id: productFormProperties.initialValues.id,
      values: values,
    });
  }
  return {
    createProduct,
    updateProduct,
    setCategorySelected,
    categorySelected,
    categoriesOptions,
    promotionSelected,
    setPromotionSelected,
    promotionsOptions,
    activeStatusChecked
  };
}
