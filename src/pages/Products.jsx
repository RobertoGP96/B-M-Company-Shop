import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import "./pagesStyles/products.css";
import 'primeicons/primeicons.css';


function Products() {

  return (
    <section className="products-container">
      <NavBar />
        <section className="products-section">
        <i className="pi pi-spin pi-cog"></i>
        <p>Próximamente...</p>
        </section>
      
      <Footer />
    </section>
  );
}

export default Products;
