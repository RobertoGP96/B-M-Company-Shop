import { useState, useEffect } from "react";
import { getCategories } from "../services/getCategories";
import { deleteCategories } from "../services/ManageCategories/deleteCategories";
import { createCategory } from "../services/ManageCategories/createCategory";
import { updateCategory } from "../services/ManageCategories/updateCategory";

export function useManageCategories({toastRef, setUpdateProducts, setSelectedCategories, removeAllFilters, setCategoryFormProperties}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCategories, setUpdateCategories] = useState(false); //state to mark when to re-fetch the Categories

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

  //get Categories
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [updateCategories]);

  //delete one product by its id
  function handleDeleteCategory(categoryId) {
    setLoading(true);
    deleteCategories({ categories: [categoryId] })
      .then((res) => {
        setUpdateCategories((prev) => !prev);
        setSelectedCategories([])
        removeAllFilters()
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

    //delete multiple Categories by a list of ids
    function handleDeleteMultipleCategories(categories) {
        if(categories.length > 0) {
            //create a list only with the ids
            const categoriesId = categories.map(category => category.id)
            setLoading(true);
            deleteCategories({ categories: categoriesId })
              .then((res) => {
                setUpdateCategories((prev) => !prev);
                removeAllFilters()
                setSelectedCategories([])
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
                detail: "Debes seleccionar alguna categoria",
            })
        }
    }
  
    function handleCreateCategory({name, img}){
      if(name === undefined || name === "" || name == null){
        showToast({severity: "error", summary: "Error", detail: "Debes ingresar un nombre",})
      }
      else{
        createCategory({name:name, img:img})
        .then(res => {
          setUpdateCategories(prev => !prev)
          setSelectedCategories([])
          setCategoryFormProperties(prev => ({...prev, show:false}))
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

    function handleUpdateCategory({id, name, img}){
      if(name === undefined || name === "" || name == null){
        showToast({severity: "error", summary: "Error", detail: "Debes ingresar un nombre",})
      }
      else{
        updateCategory({id:id, name:name, img:img})
        .then(res => {
          setUpdateCategories(prev => !prev)
          setSelectedCategories([])
          setCategoryFormProperties(prev => ({...prev, show:false}))
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

  return {
    categories,
    loading,
    setLoading,
    updateCategories,
    setUpdateCategories,
    showToast,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
    handleCreateCategory,
    handleUpdateCategory,
  };
}
