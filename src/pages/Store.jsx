import CategorieSideBar from "../components/CategorieSideBar";
import NavBar from "../components/NavBar";
import ProductsGrid from "../components/ProductsGrid";
import SearchProduct from "../components/SearchProduct";
import Footer from "../components/Footer";
import './pagesStyles/Store.css'

function Store() {  
    return ( 
        <section className = "store-page">
            <aside><CategorieSideBar/></aside>
            <search><SearchProduct/></search>
            <main><ProductsGrid/></main>
        </section>
     );
}

export default Store;
