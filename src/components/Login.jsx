import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import useValidateLogin from '../hooks/useValidateLogin';
import useAuth from '../hooks/useAuth';

const UsernameInput = ({ value, handleUsernameInput }) => (
    <input
        type="text"
        className="form-control bg-input"
        id="username-iniciar-sesion"
        placeholder="Ingrese su nombre de usuario"
        name="Username"
        autoComplete="username"
        value={value}
        onChange={handleUsernameInput}
        required
    />
);


const PasswordInput = ({ value, handlePasswordInput }) => (
    <input
        type="password"
        className="form-control bg-input"
        id="password-iniciar-sesion"
        placeholder="Ingrese su contraseña"
        value={value}
        onChange={handlePasswordInput}
        name="Contraseña"
        autoComplete="current-password"
        required
    />
);

const Login = () => {
    const { login } = useAuth();

    const validateUsername = (value) => value.length != 0;
    const validatePassword = (value) => value.length != 0;

    const { username, password, isValid, setUsername, setPassword } = useValidateLogin(validateUsername, validatePassword);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password}),
            }
            fetch(
                import.meta.env.VITE_USER_AUTH_API_URL,
                { ...options }
            ).then((response) => {
                if(response.ok) {
                    return response.json();
                } else throw Error("Se produjo un error al intentar loguearse.");
            }).then((data) => {
                login(data.token);
                navigate("/bienvenida");
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Credenciales Invalidas",
                    text: "Username o Password incorrectos"
                });
            })
        }
    };

    return (
        <section className="modal fade" id="iniciarSesionModal" tabIndex="-1" aria-labelledby="iniciarSesionModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id="iniciarSesionModal">Iniciar Sesión</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form id="form-iniciar-sesion" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username-iniciar-sesion" className="form-label fw-bolder">Username</label>
                                <UsernameInput value={username} handleUsernameInput={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password-iniciar-sesion" className="form-label fw-bolder">Contraseña</label>
                                <PasswordInput value={password} handlePasswordInput={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <div className="form-text">
                                    <a className="link-dark link-offset-2 link-underline link-underline-opacity-0" href="#">
                                        Olvidé mi contraseña
                                    </a>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" disabled={!isValid} className="btn btn-personalized-1 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Ingresar">
                                    Ingresar
                                </button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Cancelar" >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

UsernameInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleUsernameInput: PropTypes.func.isRequired
}

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    handlePasswordInput: PropTypes.func.isRequired
}

export default Login;
