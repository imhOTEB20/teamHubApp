import { Logo } from './Logo.jsx'
import '../styles/Header.css'

function MainHeader() {
    return (
        <header>
            <nav className="menu_container">
                <Logo />
                <ul className="menu_links">
                    <li className="menu_item">
                        <a href="" className="menu_link">Bienvenido</a>
                    </li>
                    <li className="menu_item">
                        <a href="#Nosotros" className="menu_link">Nosotros</a>
                    </li>
                    <li className="menu_item menu_item_show">
                        <a href="#Sistema" className="menu_link menu_arrow">A cerca de</a>
                    </li>
                    <li className="menu_item menu_item_show">
                        <a href="#Desarrolladores" className="menu_link menu_arrow">Desarrolladores</a>
                    </li>
                    <li className="menu_item">
                        <a href="" className="menu_link">Iniciar Sesion</a>
                    </li>
                </ul>

                <div className='menu_hamburguer'>
                    <i className='las la-bars'></i>
                </div>
            </nav>
        </header>
    );
}

export default MainHeader;