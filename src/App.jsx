import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Page404 from './pages/Page404'

function App() {
  return (
    <Router>
        <Routes>
          <Route path = "/products" element = {<Products/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "*" element = {<Page404/>}/>
        </Routes>
    </Router>
  )
}

export default App
