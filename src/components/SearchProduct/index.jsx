import './index.css'
import SearchIcon from '../../assets/search-icon.svg'
import { Dropdown } from 'primereact/dropdown';
import {useContext, useState} from 'react'
import QueryFiltersContext from '../../context/filtersContext';
import { getActiveFilter } from '../../utils/getActiveFilter';

const orderingValues = [
    {code: "", name : "Ordenar"},
    {code: "precio", name : "Menor Precio"},
    {code: "-precio", name : "Mayor Precio"},
    {code: "-updated_at", name : "Mas recientes"},
    {code: "updated_at", name : "Menos recientes"},
    {code: "product_name", name : "Alfabeticamente [A-Z]"},
    {code: "-product_name", name : "Alfabeticamente [Z-A]"},
]

function SearchProduct() {
    const [ordering, setOrdering] = useState(orderingValues.find(value => value.code === getActiveFilter("ordering")))
    const [searchingValue, setSearchingValue] = useState(getActiveFilter("search"))
    const {setFilter} = useContext(QueryFiltersContext)

    function handleSetOrdering(value){
        setFilter({name: "ordering", value:value.code})
        setOrdering(value)
    }

    function handleSearch(e){
        e.preventDefault()
        setFilter({name: "search", value:searchingValue})
    }
    return ( 
        <section className = "search-product">
            <h2>Productos</h2>
            <section className = "search-order-container">
                <form onSubmit={(e) => handleSearch(e)}>
                    <img src = {SearchIcon}/>
                    <input placeholder='Buscar' onChange={(e) => setSearchingValue(e.target.value)} value = {searchingValue}/>
                </form>
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