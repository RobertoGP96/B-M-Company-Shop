import AddProductIcon from "../../../../assets/add-product-icon.svg";
import RemoveProductIcon from "../../../../assets/remove-product-icon.svg";

function ButtonsAddAndDelete({setShowConfirmDialog, setCategoryFormProperties}) {
    return ( 
        <div className="buttons-add-delete-container">
            <div className="add-product-button-container">
              <button
                className="products-managment-filters-bar-button btn-general-styles"
                onClick={() => {
                  setCategoryFormProperties(prev => ({
                    ...prev,
                    show:true,
                    creatingMode:true
                  }))
                }}
              >
                <img src={AddProductIcon} />
                <span>Agregar</span>
              </button>
            </div>
            <div className="remove-product-button-container">
              <button
                className="products-managment-filters-bar-button btn-general-styles"
                onClick={() => setShowConfirmDialog(true)}
              >
                <img src={RemoveProductIcon} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
     );
}

export default ButtonsAddAndDelete;