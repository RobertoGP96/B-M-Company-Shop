import { useState, useEffect } from "react";
import { getProductsToManage } from "../services/ManageProducts/getProductsToManage";
import { deleteProducts } from "../services/ManageProducts/deleteProducts";
import { createProduct } from "../services/ManageProducts/createProduct";
import {updateProduct} from "../services/ManageProducts/updateProduct";

export function useManageProducts({ searchParams, toastRef, setSelectedProducts, resetProductFormProperties, removeAllFilters }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoading] = useState(false);
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

  //update the product's list when is necesary
  function handleSetUpdateProducts(){
    if(searchParams.size == 0){
      setUpdateProducts(prev => !prev)
    }
    else{
      removeAllFilters()
    }
  }

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
    function handleCreateProduct({values}){
      setLoading(true)
      if(productInfoValid({values:values})){
        createProduct({values:values})
        .then(res => {
          handleSetUpdateProducts()
          setSelectedProducts([])
          resetProductFormProperties()
          showToast({
            severity: "success",
            summary: "Éxito",
            detail: "Operación Exitosa",
          });
        })
        .catch(err => {
          showToast({
            severity: "error",
            summary: "Error",
            detail: err.message,
        })
        })
        .finally(() => {
          setLoading(false)
        })
      }
      setLoading(false)
    }

    function handleUpdateProduct({id, values}){
      setLoading(true)
      if(productInfoValid({values:values, creating:false})){
        updateProduct({id:id, values:values})
        .then(res => {
          setUpdateProducts(prev => !prev)
          setSelectedProducts([])
          resetProductFormProperties()
          showToast({
            severity: "success",
            summary: "Éxito",
            detail: "Operación Exitosa",
          });
        })
        .catch(err => {
          showToast({
            severity: "error",
            summary: "Error",
            detail: err.message,
        })
        })
        .finally(() => {
          setLoading(false)
        })
      }
      setLoading(false)
    }

    function productInfoValid({values, creating = true}){
      if(values.product_name == "" || values.product_name == null || values.product_name == undefined){
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Debes ingresar un nombre válido",
        })
        return false
      }
      if(values.precio == "" || values.precio == null || values.precio == undefined){
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Debes ingresar un precio válido",
        })
        return false
      }
      if(creating == true && (values.product_img1 == "" || values.product_img1 == null || values.product_img1 == undefined)){
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Debes ingresar al menos la primera imagen",
        })
        return false
      }
      return true
    }

  return {
    products,
    loadingProducts,
    setLoading,
    numOfProducts,
    updateProducts,
    setUpdateProducts,
    showToast,
    handleDeleteProduct,
    handleDeleteMultipleProducts,
    handleUpdateProduct,
    handleCreateProduct
  };
}
