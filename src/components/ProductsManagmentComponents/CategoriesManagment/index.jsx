import TagIcon from '../../../assets/tag-icon.svg'
import './index.css'

function CategoriesManagment() {
    return ( 
        <section>
            <button className = "products-managment-filters-bar-button">
                <img src = {TagIcon}/>
                <span>Categorias</span>
            </button>
        </section>
     );
}

export default CategoriesManagment;