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
    name: "Oferta",
    code: null,
  });

  //effect to update the activeStatus, the categorySelected and the promotion
  useEffect(() => {
    //update if the product is active or not
    productFormProperties.creatingMode == false
      ? setChecked(productFormProperties.initialValues.is_active)
      : setChecked(true);
    //update the category and promotion of the product
    if (productFormProperties.creatingMode == false && productFormProperties.initialValues.category !== null && productFormProperties.initialValues.promotion !== null) {
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
      setPromotionSelected({ name: "Oferta", code: null });
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
    setChecked
  };
}
