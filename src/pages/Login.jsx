import "./pagesStyles/Login.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Logo from "../assets/B&MCshop-logo.svg";
import {useNavigate} from "react-router-dom"

import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";

import { useContext, useRef } from "react";
import AuthenticationContext from '../context/authenticationContext'

function Login() {
  const {handleLogin, loading} = useContext(AuthenticationContext)
  const navigate = useNavigate()
  const toast = useRef(null);

  function login(e){
    e.preventDefault();
    handleLogin({email:e.target["email"].value, pass:e.target["password"].value, callback:(success) => {
      if(success == 'ok'){
        navigate(-1)
      }
      else{
        showToast({
          severity: "error",
          summary: "Error",
          detail: `${success}`,
        });
      }
    }})
  }

  const showToast = ({
    severity = "success",
    summary = "Éxito",
    detail = "Operación Exitosa",
    life = 3000,
  }) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  return (
    <section className="login-container">
      <Toast ref={toast} position="bottom-center" />
      <section className="login-section">
        <div className="">
          <img src={Logo} alt="" />
        </div>
        <form action="" className="form-login" onSubmit = {(e) => login(e)}>
          <span className="p-float-label">
            <InputText
              type = 'email'
              id="email"
            />
            <label htmlFor="email">Email</label>
          </span>

          <span className="p-float-label">
            <Password inputId="password" toggleMask feedback={false} />
            <label htmlFor="password">Contraseña</label>
          </span>

          <button type="submit">{loading?"Iniciando Sesion ...":"Iniciar Sesión"}</button>
        </form>
      </section>
    </section>
  );
}

export default Login;
