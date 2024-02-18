import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Contact from './pages/Contact'
import Remesas from './pages/Remesas'
import Store from './pages/Store'
import ProductsManagment from './pages/ProductsManagment'
import Home from './pages/Home'
import Page404 from './pages/Page404'
import MagnamentMenu from './pages/MagnamentMenu.jsx'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {CartContextProvider} from './context/cartContext.jsx'
import {QueryFiltersContextProvider} from './context/filtersContext.jsx'
import {AuthenticationContextProvider} from './context/authenticationContext.jsx'
import NavBar from './components/NavBar/index.jsx'
import Footer  from './components/Footer/index.jsx'
import MagnamentOferts from './pages/MagnamentOferts.jsx'
import MagnamentSecurity from './pages/MagnamentSecurity.jsx'
import ManagmentContact from './pages/ManagmentContact.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './pages/Products.jsx'
import Login from './pages/Login.jsx'
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
                    <Route path = "/magnament-menu" element = {<ProtectedRoute><MagnamentMenu/></ProtectedRoute>}/>
                    <Route path = "/magnament/products" element = {<ProtectedRoute><ProductsManagment/></ProtectedRoute>}/>
                    <Route path = "/magnament-oferts" element = {<ProtectedRoute><MagnamentOferts/></ProtectedRoute>}/>
                    <Route path = "/magnament-security" element = {<ProtectedRoute><MagnamentSecurity/></ProtectedRoute>}/>
                    <Route path = "/managment/contact" element = {<ProtectedRoute><ManagmentContact/></ProtectedRoute>}/>
                    <Route path = "/login" element = {<Login/>}/>
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
