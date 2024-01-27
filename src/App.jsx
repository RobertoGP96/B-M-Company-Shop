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
import {QueryFiltersContextProvider} from './context/filtersContext.jsx'
import NavBar from './components/NavBar/index.jsx'
import Footer  from './components/Footer/index.jsx'
import 'primeicons/primeicons.css';
import MagnamentOferts from './pages/MagnamentOferts.jsx'
import MagnamentSecurity from './pages/MagnamentSecurity.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <Router>
      <section  title='main-section'>
        <header><NavBar /></header>
        <section className="main-section-route">
          <PrimeReactProvider>
            <QueryFiltersContextProvider>
              <Routes>
                <Route path = "/store" element = {<Store/>}/>
                <Route path = "/contactus" element = {<Contact/>}/>
                <Route path = "/remesas" element = {<Remesas/>}/>
                <Route path = "/magnament-menu" element = {<MagnamentMenu/>}/>
                <Route path = "/magnament/products" element = {<ProductsManagment/>}/>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "*" element = {<Page404/>}/>
                <Route path = "/magnament-oferts" element = {<MagnamentOferts/>}/>
                <Route path = "/magnament-security" element = {<MagnamentSecurity/>}/>
                <Route path = "/login" element = {<Login/>}/>
              </Routes>
            </QueryFiltersContextProvider>
          </PrimeReactProvider>
        </section>
        <footer><Footer/></footer>
      </section>
 
    </Router>
  )
}

export default App
