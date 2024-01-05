import FilterIcon from '../../../assets/filter-icon.svg'
import { Dialog } from "primereact/dialog";
import { useState } from 'react';
import OrderingProducts from '../../OrderingProducts'
import CategorieSideBar from '../../CategorieSideBar';
import './index.css'

function FiltersModal() {
    const [showModal, setShowModal] = useState(false)
    
    return ( 
        <section>
            <button className = "products-managment-filters-bar-button btn-general-styles" onClick={() => setShowModal(true)}>
                <img src = {FilterIcon}/>
                <span>Filtros</span>
            </button>
            <Dialog contentClassName="categories-mobile-modal-content products-managment-filters-modal" visible = {showModal}  position="top" showHeader={false} >
                <button className = "close-modal-button btn-general-styles" onClick={() => setShowModal(false)}>X</button>
                <OrderingProducts/>
                <CategorieSideBar forceMobileMode={true}/>
            </Dialog>
        </section>
     );
}

export default FiltersModal;