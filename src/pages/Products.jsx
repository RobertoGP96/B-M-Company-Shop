import CategorieSideBar from "../components/CategorieSideBar";
import NavBar from "../components/NavBar";
import ProductsGrid from "../components/ProductsGrid";
import './pagesStyles/products.css'

function Products() {
    return ( 
        <main className = "products-page">
            <NavBar/>
            <section className = "content-container">
                <div className = "categories-side-bar-container">
                    <CategorieSideBar/>
                </div>
                <div className = "products-container">
                    <ProductsGrid/>
                </div>
            </section>
        </main>
     );
}

export default Products;
