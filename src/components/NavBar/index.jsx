import './index.css'
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { Menu } from 'primereact/menu';
import 'primeicons/primeicons.css';


const items = [
    {
        label: 'Inicio',
        url:"/"
    },
    {
        label: 'Tienda',
        url:"/tienda"

    },
    {
        label: 'Productos',
        url:"/products"
    },
    {
        label: 'Contacto',
        url:"/contact-us"
    }

];


function NavBar() {
    const navigate = useNavigate()
    const responsive = useWindowSize("min",800)
    const [visible, setVisible] = useState(false);
  
    return ( 
        <nav className = "navbar">
             { responsive? 
                
                <ul className="nav-BarConteiner">
                    <li className="navBar-itemConteiner-companyName" >
                    <div className="companyName-conteiner">
                            <a className="companyName"href="/"><span >B & M Company</span></a>
                        </div>
                    </li>
                    <li> 
                        <div className="navBar-itemConteiner">
                            <a className="navBar-item" href="/"><span className="icon"><i className="pi pi-home"></i></span><span className="title">Inicio</span>
                            </a>
                        </div>
                        
                    </li>
                    <li>
                        <div className="navBar-itemConteiner">
                                <a className="navBar-item" href="/store"><span className="icon"><i className="pi pi-shopping-bag"></i></span> <span
                                className="title">Tienda</span></a>
                        </div>
                    </li>
                    <li>
                        <div className="navBar-itemConteiner">
                            <a className="navBar-item" href="/products"><span className="icon"><i className="pi pi-shopping-cart"></i></span> <span
                                className="title">Productos</span></a>
                        </div>        
                    </li>
                    <li>
                        <div className="navBar-itemConteiner">
                            <a className="navBar-item" href="/contactus"><span className="icon"><i className="pi pi-user"></i></span> <span
                                className="title">Contacto</span></a>
                        </div>        
                    </li>
                </ul>
                : <>
                    <ul className="nav-BarConteiner-Responsive">
                    <li>
                        <button className="navBar-MenuButton" onClick={()=>{setVisible(true)}}>
                           <span className="icon"><i className="pi pi-bars"></i></span>      
                        </button>        
                    </li>
                        <li className="navBar-itemConteiner-companyName" >
                        <div className="companyName-conteiner">
                                <a className="companyName"href="/home"><span >B & M Company</span></a>
                            </div>
                        </li>
                    </ul>
                    <Sidebar className='sideBar' visible={visible} onHide={()=>setVisible(false)} 

                    >
                        <h2 style={{display:"inline",position:"absolute",top:"0"}}>Menu</h2>
                        <Menu model={items} style={{border:"none",width:"100%"}} />
                    </Sidebar>
                </>
            }
        </nav>
     );
}

export default NavBar;