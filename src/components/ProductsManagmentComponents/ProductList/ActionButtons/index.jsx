import './index.css'
import TrashIcon from '../../../../assets/trash-icon.svg'
import EyeIcon from '../../../../assets/eye-icon.svg'
import EditIcon from '../../../../assets/edit-icon.svg'

function ActionButtons({product}) {
    return ( 
        <section className = "action-buttons-container">
            <button><img src = {EditIcon}/></button>
            <button><img src = {EyeIcon}/></button>
            <button><img src = {TrashIcon}/></button>
        </section>
     );
}

export default ActionButtons;