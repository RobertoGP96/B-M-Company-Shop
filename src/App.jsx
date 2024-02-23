import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Contact from './pages/Contact'
import Remesas from './pages/Remesas'
import Store from './pages/Store'
import ProductsManagement from './pages/ProductsManagement'
import Home from './pages/Home'
import ManagementMenu from './pages/ManagementMenu.jsx'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {CartContextProvider} from './context/cartContext.jsx'
import {QueryFiltersContextProvider} from './context/filtersContext.jsx'
import {AuthenticationContextProvider} from './context/authenticationContext.jsx'
import NavBar from './components/NavBar/index.jsx'
import Footer  from './components/Footer/index.jsx'
import ManagementOferts from './pages/ManagementOferts.jsx'
import ManagementSecurity from './pages/ManagementSecurity.jsx'
import ManagementContact from './pages/ManagementContact.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Envios from './pages/Envios.jsx'
import Bye from './pages/Bye.jsx'
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <PrimeReactProvider>
        <AuthenticationContextProvider>
          <CartContextProvider>
            <QueryFiltersContextProvider>
              <section >
                <header><NavBar /></header>
                <section className="main-section-route">
                  <Routes>
                    <Route path = "/store" element = {<Store/>}/>
                    <Route path = "/contactus" element = {<Contact/>}/>
                    <Route path = "/remesas" element = {<Remesas/>}/>
                    <Route path = "/envios" element = {<Envios/>}/>
                    <Route path = "/management-menu" element = {<ProtectedRoute><ManagementMenu/></ProtectedRoute>}/>
                    <Route path = "/management/products" element = {<ProtectedRoute><ProductsManagement/></ProtectedRoute>}/>
                    <Route path = "/management/oferts" element = {<ProtectedRoute><ManagementOferts/></ProtectedRoute>}/>
                    <Route path = "/management/security" element = {<ProtectedRoute><ManagementSecurity/></ProtectedRoute>}/>
                    <Route path = "/management/contact" element = {<ProtectedRoute><ManagementContact/></ProtectedRoute>}/>
                    <Route path = "/login" element = {<Login/>}/>
                    <Route path = "/change-password" element = {<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
                    <Route path = "/envios" element = {<Envios/>}/>
                    <Route path = "/bye" element = {<Bye/>}/>
                    <Route path = "/" element = {<Home/>}/>
                    <Route path = "*" element = {<Products/>}/>
                  </Routes>
                </section>
                <footer><Footer/></footer>
              </section>
            </QueryFiltersContextProvider>
          </CartContextProvider>
        </AuthenticationContextProvider>
      </PrimeReactProvider>
    </Router>
  )
}

export default App
