import './index.css'
import TrashIcon from '../../../../assets/trash-icon.svg'
import EyeIcon from '../../../../assets/eye-icon.svg'
import EditIcon from '../../../../assets/edit-icon.svg'
import {deleteProducts} from '../../../../services/ManageProducts/deleteProducts'
import { Toast } from 'primereact/toast';
import { useRef } from 'react'

function ActionButtons({product, setLoading, setUpdateProducts}) {
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }

    function handleDeleteProduct(){
        setLoading(true)
        deleteProducts({products:[product.id]})
        .then(res => {
            showSuccess()
            setUpdateProducts(prev => !prev)
        })
        .catch(err => {
            setLoading(false)
            showError()
        })
        
    }
    return ( 
        <section className = "action-buttons-container">
            <Toast ref={toast} position="bottom-right"/>
            <button><img src = {EditIcon}/></button>
            <button><img src = {EyeIcon}/></button>
            <button onClick={() => handleDeleteProduct()}><img src = {TrashIcon}/></button>
        </section>
     );
}

export default ActionButtons;