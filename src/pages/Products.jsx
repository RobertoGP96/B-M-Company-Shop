import CategorieSideBar from "../components/CategorieSideBar";
import NavBar from "../components/NavBar";
import ProductsGrid from "../components/ProductsGrid";
import SearchProduct from "../components/SearchProduct";
import Footer from "../components/Footer";
import './pagesStyles/products.css'

function Products() {  
    return ( 
        <section className = "products-page">
            <header><NavBar/></header>
            <aside><CategorieSideBar/></aside>
            <search><SearchProduct/></search>
            <main><ProductsGrid/></main>
            <footer><Footer/></footer>
        </section>
     );
}

export default Products;
