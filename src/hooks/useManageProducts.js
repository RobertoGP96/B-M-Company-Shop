import { useState, useEffect } from "react";
import { getProductsToManage } from "../services/ManageProducts/getProductsToManage";
import { deleteProducts } from "../services/ManageProducts/deleteProducts";
import { createProduct } from "../services/ManageProducts/createProduct";
import {updateProduct} from "../services/ManageProducts/updateProduct";

export function useManageProducts({ searchParams, toastRef, setSelectedProducts, setProductFormProperties, removeAllFilters }) {
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
    function handleCreateProduct(values){
      if(productInfoValid(values)){
        if(values.product_img2 == undefined || values.product_img2 == null){
          values.delete(product_img2)
        }
        if(values.product_img3 == undefined|| values.product_img3 == null){
          values.delete(product_img3)
        }
        createProduct(values)
        .then(res => {
          removeAllFilters()
          setSelectedProducts([])
          setProductFormProperties(prev => ({...prev, show:false}))
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
      }
    }

    function handleUpdateProduct(values){
      if(productInfoValid(values)){
        if(values.product_img2 == undefined || values.product_img2 == null){
          values.delete(product_img2)
        }
        if(values.product_img3 == undefined|| values.product_img3 == null){
          values.delete(product_img3)
        }
        updateProduct(values)
        .then(res => {
          removeAllFilters()
          setSelectedProducts([])
          setProductFormProperties(prev => ({...prev, show:false}))
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
      }
    }

    function productInfoValid(values){
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
      if(values.product_img1 == "" || values.product_img1 == null || values.product_img1 == undefined){
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Debes ingresar al menos la primera imagen",
        })
        return false
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
    handleDeleteMultipleProducts,
    handleUpdateProduct,
    handleCreateProduct
  };
}
