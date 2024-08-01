import Login from "./Login";
import PropTypes from 'prop-types'

const Header = (props) => {
return (
    <header className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-color-principal p-md-2 p-lg-3">
            <div className="container-fluid">
            <a className="navbar-brand fw-bold">
                <i className="fa-solid fa-fire-flame-curved"></i> {props.nombre}
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navBarMovies"
                aria-controls="navBarMovies"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navBarMovies">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold">
                <li className="nav-item mx-2">
                    <a
                    className="nav-link active"
                    aria-current="page"
                    href="./index.html"
                    >
                    Inicio
                    </a>
                </li>
                <li className="nav-item mx-2">
                    <a className="nav-link" href="./pages/contacto.html">
                    Contacto
                    </a>
                </li>
                <li className="nav-item mx-2">
                    <a className="nav-link" href="pages/acercaDeNosotros.html">
                    Acerca de Nosotros
                    </a>
                </li>

                <li className="nav-item dropdown mx-2" id="opciones-usuario">
                    <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <i className="fa-solid fa-user"></i>
                    <span id="nombre-usuario"> Mia Khalifa </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark bg-color-secundario mb-2 mb-lg-0">
                    <li>
                        <a
                        className="dropdown-item text-light fw-bold"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#editarPerfilModal"
                        >
                        <i className="fa-solid fa-user-pen"></i> Editar perfil
                        </a>
                    </li>
                    <li>
                        <a
                        className="dropdown-item text-light fw-bold"
                        id="btnAdministracion"
                        href="pages/administracion.html"
                        >
                        <i className="fa-solid fa-user-tie"></i> Administrar
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider bg-light" />
                    </li>
                    <li>
                        <a
                        className="dropdown-item text-light fw-bold"
                        id="btnCerrarSesion"
                        href="#"
                        >
                        <i className="fa-solid fa-door-open"></i> Salir
                        </a>
                    </li>
                    </ul>
                </li>
                <li className="nav-item mx-2 mb-2 mb-lg-0">
                    <button
                    type="button"
                    className="btn btn-personalized-1 fw-bold"
                    id="boton-iniciar-sesion"
                    data-bs-toggle="modal"
                    data-bs-target="#iniciarSesionModal"
                    >
                    Iniciar Sesión
                    </button>
                </li>
                <li className="nav-item mx-2 mb-2 mb-lg-0">
                    <button
                    className="btn btn-personalized-1 fw-bold"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#suscripcionModal"
                    >
                    Suscripción
                    </button>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </header>
    );
}

Header.propTypes = {
    nombre: PropTypes.string.isRequired,
};
export default Header;
