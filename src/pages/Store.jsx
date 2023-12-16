import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import "./pagesStyles/Store.css";
import 'primeicons/primeicons.css';


function Store() {

  return (
    <section className="store-container">
      <NavBar />
      
        <section className="store-section">
        <i className="pi pi-spin pi-cog"></i>
        <p>Próximamente...</p>
        </section>
      
      <Footer />
    </section>
  );
}

export default Store;
