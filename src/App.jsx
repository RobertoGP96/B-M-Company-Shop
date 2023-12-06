import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Page404 from './pages/Page404'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import {QueryFiltersContextProvider} from './context/filtersContext.jsx'


function App() {
  return (
    <Router>
      <PrimeReactProvider>
      <QueryFiltersContextProvider>
        <Routes>
          <Route path = "/products" element = {<Products/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "*" element = {<Page404/>}/>
        </Routes>
      </QueryFiltersContextProvider>
      </PrimeReactProvider>
    </Router>
  )
}

export default App
