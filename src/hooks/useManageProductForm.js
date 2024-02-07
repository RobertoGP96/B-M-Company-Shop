import { useState, useEffect } from "react";
import { normalizeProductFormInfo } from "../utils/productInitialValues";

export function useManageProductForm({
  productFormProperties,
  handleUpdateProduct,
  handleCreateProduct,
  promotions,
  categories,
}) {
  const [activeStatusChecked, setChecked] = useState(true);

  const categoriesOptions = [{ name: "Ninguna", code: '' }].concat(
    categories.map((category) => ({
      name: category.nombre,
      code: category.id,
    }))
  );
  const promotionsOptions = [{ name: "Ninguna", code: '' }].concat(
    promotions.map((promotion) => ({
      name: promotion.name,
      code: promotion.id,
    }))
  );
  const [categorySelected, setCategorySelected] = useState({
    name: "Ninguna",
    code: '',
  });
  const [promotionSelected, setPromotionSelected] = useState({
    name: "Ninguna",
    code: '',
  });

  //effect to update the activeStatus, the categorySelected and the promotion
  useEffect(() => {
    //update if the product is active or not
    productFormProperties.creatingMode == false
      ? setChecked(productFormProperties.initialValues.is_active)
      : setChecked(true);
    //update the category and promotion of the product
    if(productFormProperties.creatingMode == false) {
      if(productFormProperties.initialValues.category !== null){
        setCategorySelected(
          categoriesOptions.find(
            (category) =>
              category.code == productFormProperties.initialValues.categoria
          )
        );
      }
      if(productFormProperties.initialValues.promotion !== null){
        setPromotionSelected(
          promotionsOptions.find(
            (promotion) =>
              promotion.code == productFormProperties.initialValues.promotion
          )
        );
      }
    }
  }, [productFormProperties.initialValues]);

  function createProduct(e) {
    e.preventDefault();
    const values = normalizeProductFormInfo({
      e: e,
      categorySelected: categorySelected,
      promotionSelected: promotionSelected,
      activeStatusChecked: activeStatusChecked,
    });
    handleCreateProduct({ values: values });
  }

  function updateProduct(e) {
    e.preventDefault();
    const values = normalizeProductFormInfo({
      e: e,
      categorySelected: categorySelected,
      promotionSelected: promotionSelected,
      activeStatusChecked: activeStatusChecked,
    });
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
    activeStatusChecked,
    setChecked,
  };
}
