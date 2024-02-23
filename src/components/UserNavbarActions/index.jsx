import { Dropdown } from "primereact/dropdown";
import UserIcon from "../../assets/user-icon.svg";
import CloseSession from "./CloseSession";
import LockOpen from "../../assets/lock-open.svg";
import "./index.css";
import {useNavigate} from 'react-router-dom'
import { useContext, useRef } from "react";
import AuthenticationContext from '../../context/authenticationContext'

function UserNavbarActionsDropdown() {
const navigate = useNavigate()
const dropdownRef = useRef(null)
const {auth} = useContext(AuthenticationContext)
  const options = [
    {
      name: (
        <button className="change-password-button" onClick = {() => navigate("/change-password")}>
          <img alt="change-password" src={LockOpen} />
          <span>Cambiar Contraseña</span>
        </button>
      ),
      value: "change-password",
    },
    { name: <CloseSession />, value: "close-session" },
  ];

  return (
    auth.token?
    <section className = "user-navbar-actions-dropdown-container">
        <img alt="user-icon" src={UserIcon} onClick={() => dropdownRef.current.show()}/>
        <Dropdown
          ref = {dropdownRef}
          options={options}
          optionLabel="name"
          placeholder={""}
          className="user-navbar-actions-dropdown"
        />
    </section>
    :null
  );
}

export default UserNavbarActionsDropdown;
