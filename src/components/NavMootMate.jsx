import PropTypes from 'prop-types';

import ComponentIfLogged from "./ComponentIfLogged";
import useAuth from '../hooks/useAuth';

const ProfileOptionsItem = ({ closeProfile }) => {
    const { profileData } = useAuth();
    const firstName = JSON.parse(profileData).first_name;
    const lastName = JSON.parse(profileData).last_name;
    return (
        <li className="nav-item dropdown mx-2" id="opciones-usuario">
            <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >
                <i className="fa-solid fa-user"></i>
                <span id="nombre-usuario"> {`${firstName} ${lastName}`} </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark bg-color-secundario mb-2 mb-lg-0">
                <li>
                    <a href="/bienvenida"
                    className="dropdown-item text-light fw-bold"
                    >
                        <i className="fa-solid fa-message"></i> Tus servidores
                    </a>
                </li>
                <li>
                    <button
                    className="dropdown-item text-light fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#editarPerfilModal"
                    >
                        <i className="fa-solid fa-user-pen"></i> Editar perfil
                    </button>
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
                    <button
                    className="dropdown-item text-light fw-bold"
                    id="btnCerrarSesion"
                    onClick={closeProfile}
                    >
                        <i className="fa-solid fa-door-open"></i> Salir
                    </button>
                </li>
            </ul>
        </li>
    ); 
};

const LoginItem = () => {
    return (
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
    );
};

const NavMootMate = (props) => {
    const cerrarSesion = () =>{
        Swal.fire({
            title: "Cerrar Sesión",
            text: "¿Estás seguro de cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, cerrar",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "¡Hasta luego!",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-color-principal p-md-2 p-lg-3">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="/">
                        <i className="fa-brands fa-mastodon"></i> {props.nombre}
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
                            <ComponentIfLogged
                            childrenIfLogged=
                                { 
                                <ProfileOptionsItem closeProfile={cerrarSesion}/>
                                }
                            childrenIfNotLogged=
                                {
                                <>
                                <li className="nav-item mx-2">
                                    <a className="nav-link" href="/#Descripcion">
                                    Acerca de Nosotros
                                    </a>
                                </li>
                                <li className="nav-item mx-2">
                                    <a className="nav-link" href="/#Funciones">
                                    Funciones
                                    </a>
                                </li>
                                <LoginItem />
                                </>
                                }
                            >
                            </ComponentIfLogged>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

ProfileOptionsItem.propTypes = {
    closeProfile: PropTypes.func.isRequired
};

export default NavMootMate;
