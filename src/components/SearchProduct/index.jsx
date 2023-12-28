import './index.css'
import { Dropdown } from 'primereact/dropdown';
import {useContext, useEffect, useState} from 'react'
import QueryFiltersContext from '../../context/filtersContext';
import Search from '../Search';

const orderingValues = [
    {code: "", name : "Ordenar"},
    {code: "precio", name : "+ Precio"},
    {code: "-precio", name : "- Precio"},
    {code: "-updated_at", name : "Recientes"},
    {code: "updated_at", name : "Antiguos"},
    {code: "product_name", name : "[A-Z]"},
    {code: "-product_name", name : "[Z-A]"},
]

function SearchProduct() {
    const {setFilter, getActiveFilter} = useContext(QueryFiltersContext)
    const [ordering, setOrdering] = useState(orderingValues.find(value => value.code === getActiveFilter("ordering")))

    function handleSetOrdering(value){
        setFilter({name: "ordering", value:value.code})
        setOrdering(value)
    }

    return ( 
        <section className = "search-product">
            <h3>Productos</h3>
            <section className = "search-order-container">
                <Search/>
                <Dropdown 
                    value={ordering} 
                    onChange={(e) => handleSetOrdering(e.value)} 
                    options={orderingValues} 
                    optionLabel="name" 
                    placeholder="Ordenar" 
                    className="w-full md:w-14rem order-button" 
                />
            </section>
        </section>
     );
}

export default SearchProduct;