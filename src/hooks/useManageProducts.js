import { useState, useEffect } from "react";
import { getProductsToManage } from "../services/ManageProducts/getProductsToManage";
import { deleteProducts } from "../services/ManageProducts/deleteProducts";

export function useManageProducts({ searchParams, toastRef, setSelectedProducts }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [updateProducts, setUpdateProducts] = useState(false); //state to mark when to re-fetch the products

  const showToast = ({
    severity = "success",
    summary = "Éxito",
    detail = "Operación Exitosa",
    life = 3000,
  }) => {
    toastRef.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  //get products
  useEffect(() => {
    setLoading(true);
    getProductsToManage(searchParams)
      .then((data) => {
        setProducts(data.results);
        setNumOfProducts(data.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setNumOfProducts(0);
      });
  }, [searchParams, updateProducts]);

  //delete one product by its id
  function handleDeleteProduct(productId) {
    setLoading(true);
    deleteProducts({ products: [productId] })
      .then((res) => {
        setUpdateProducts((prev) => !prev);
        setSelectedProducts([])
        showToast({
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      })
      .catch((err) => {
        setLoading(false);
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Fallo en la Operación",
        });
      });
    }  

    //delete multiple products by a list of ids
    function handleDeleteMultipleProducts(products) {
        if(products.length > 0) {
            //create a list only with the ids
            const productsId = products.map(product => product.id)
            setLoading(true);
            deleteProducts({ products: productsId })
              .then((res) => {
                setUpdateProducts((prev) => !prev);
                setSelectedProducts([])
                showToast({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Operación Exitosa",
                });
              })
              .catch((err) => {
                console.log(err.message)
                setLoading(false);
                showToast({
                  severity: "error",
                  summary: "Error",
                  detail: "Fallo en la Operación",
                });
              });
        }
        else{
            showToast({
                severity: "error",
                summary: "Error",
                detail: "Debes seleccionar algun producto",
            })
        }
    }

  return {
    products,
    loading,
    setLoading,
    numOfProducts,
    updateProducts,
    setUpdateProducts,
    showToast,
    handleDeleteProduct,
    handleDeleteMultipleProducts
  };
}
