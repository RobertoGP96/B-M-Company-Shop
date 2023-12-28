import './index.css'
import Search from '../../Search';
function ProductsManagmentFiltersBar() {
    return ( 
        <section className = "products-managment-filters-bar">
            <div className = "search-container"><Search/></div>
        </section>
     );
}

export default ProductsManagmentFiltersBar;