import CategorieSideBar from "../components/CategorieSideBar";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";

function Products() {
    return ( 
        <main style = {styles.productsPage}>
            <NavBar/>
            <section style = {styles.contentContainer}>
                <CategorieSideBar/>
                <ProductCard 
                    id={1} 
                    precio={100}
                    product_name={"zapatozapatozapatozapatozapatozapato"}
                    product_img1={"https://bestore.pythonanywhere.com/media/productos_images/pc.jpg"}
                    />
            </section>
        </main>
     );
}

export default Products;

const styles = {
    productsPage:{
        width:"100vw",
        minHeight:"100vh",
        backgroundColor:"rgb(249, 250, 252)",
    },
    contentContainer:{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"row",
    }
}