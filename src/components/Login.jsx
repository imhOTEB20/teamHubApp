import React from 'react';
import PropTypes from 'prop-types';
import useValidateLogin from '../hooks/useValidateLogin';

const EmailInput = ({ value, handleEmailInput }) => (
    <input
        type="email"
        className="form-control bg-input"
        id="email-iniciar-sesion"
        aria-describedby="emailHelp"
        placeholder="Ingrese su email"
        minLength="5"
        maxLength="254"
        name="Email"
        autoComplete="username"
        value={value}
        onChange={handleEmailInput}
        required
    />
);

const PasswordInput = ({ value, handlePasswordInput }) => (
    <input
        type="password"
        className="form-control bg-input"
        id="password-iniciar-sesion"
        placeholder="Ingrese su contraseña"
        maxLength="16"
        minLength="8"
        title="Debe contener al menos un número, una letra mayúscula, una letra minúscula, y tener entre 6 y 16 caracteres"
        value={value}
        onChange={handlePasswordInput}
        name="Contraseña"
        autoComplete="current-password"
        required
    />
);

const Login = () => {
    const validateEmail = (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
    const validatePassword = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);

    const { email, password, isValid, setEmail, setPassword } = useValidateLogin(validateEmail, validatePassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            // Lógica para manejar el login
            // llamar a una API para autenticar al usuario
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
                                <label htmlFor="email-iniciar-sesion" className="form-label fw-bolder">Email</label>
                                <EmailInput value={email} handleEmailInput={(e) => setEmail(e.target.value)} />
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
                                <button type="submit" disabled={!isValid} className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Ingresar">
                                    Ingresar
                                </button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" aria-label="Cancelar">
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

EmailInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleEmailInput: PropTypes.func.isRequired
}

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    handlePasswordInput: PropTypes.func.isRequired
}

export default Login;
