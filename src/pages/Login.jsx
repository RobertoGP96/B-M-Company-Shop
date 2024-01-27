import "./pagesStyles/Login.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Logo from "../assets/B&MCshop-logo.svg";

import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

import { useState } from "react";

function Login() {
  const [value, setValue] = useState('');

  return (
    <section className="login-container">
      <section className="login-section">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <form action="" className="form-login">
          <span className="p-float-label">
            <InputText
              id="username"
              value={value} onChange={(e) => setValue(e.target.value)}
            />
            <label htmlFor="username">Usuario</label>
          </span>

          <span className="p-float-label">
            <Password inputId="password" toggleMask feedback={false} />
            <label htmlFor="password">Contraseña</label>
          </span>

          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </section>
  );
}

export default Login;
