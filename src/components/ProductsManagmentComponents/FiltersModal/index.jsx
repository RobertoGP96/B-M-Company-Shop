import FilterIcon from '../../../assets/filter-icon.svg'
import './index.css'

function FiltersModal() {
    return ( 
        <section>
            <button className = "products-managment-filters-bar-button">
                <img src = {FilterIcon}/>
                <span>Filtros</span>
            </button>
        </section>
     );
}

export default FiltersModal;