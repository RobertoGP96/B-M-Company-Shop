import "./pagesStyles/Login.css";
import 'primeicons/primeicons.css';
import Logo from "../assets/B&MCshop-logo.svg"


function Login() {
  
  return (
    <section className="login-container">
        <section className="login-section">
          <div className="">
            <img src={Logo} alt="" />
          </div>
          <form action="">
            <input type="text" placeholder="Usuario" />
            <input type="text"  placeholder="Contraseña" />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </section>
    </section>
    );
}

export default Login;
