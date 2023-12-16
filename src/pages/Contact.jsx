import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import "./pagesStyles/Contact.css";
import 'primeicons/primeicons.css';


function Contact() {

  return (
    <section className="contact-container">
      <NavBar />
      
        <section className="contact-section">
        <i className="pi pi-spin pi-cog"></i>
        <p>Próximamente...</p>
        </section>
      
      <Footer />
    </section>
  );
}

export default Contact;
