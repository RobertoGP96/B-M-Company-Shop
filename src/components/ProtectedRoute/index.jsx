import { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../context/authenticationContext";
import { Link } from "react-router-dom";
import "./index.css";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthenticationContext);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if (auth.token) {
      setShowChildren(true);
    }
  }, []);

  return showChildren ? (
    children
  ) : (
    <section className="protected-route-page">
      <article>
        <header>Debes estar autenticad@ para accedes a esta página</header>
        <div>
          <Link to="/login">Iniciar Sesion</Link>
        </div>
      </article>
    </section>
  );
}

export default ProtectedRoute;
