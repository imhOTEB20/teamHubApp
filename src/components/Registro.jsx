const Registro = () =>{
    return(
    <section className="modal fade" id="registrarseModal" tabIndex="-1" aria-labelledby="registrarseModal"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header bg-color-principal">
                <h5 className="modal-title text-white" id="registrarseModal">
                Registarse
                </h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body bg-color-fondo">
                <form id="form-registro">
                <div className="mb-3">
                    <label for="emailRegistro" className="form-label fw-bolder">Email</label>
                    <input type="email" className="form-control bg-input" id="emailRegistro" aria-describedby="emailHelp"
                    placeholder="Ingrese su email" minlength="8" maxlength="20" name="Email" autocomplete="username"
                    required />
                    <div id="emailErrorRegistro"></div>
                </div>
                <div className="mb-3">
                    <label for="nombreRegistro" className="form-label fw-bolder">Nombre</label>
                    <input type="text" className="form-control bg-input" id="nombreRegistro" placeholder="Ingrese su nombre"
                    minlength="3" maxlength="25" name="Nombre" required />
                    <div id="nombreErrorRegistro"></div>
                </div>
                <div className="mb-3">
                    <label for="apellidoRegistro" className="form-label fw-bolder">Apellido</label>
                    <input type="text" className="form-control bg-input" id="apellidoRegistro" placeholder="Ingrese su apellido"
                    minlength="3" maxlength="25" name="Apellido" required />
                    <div id="apellidoErrorRegistro"></div>
                </div>
                <div className="mb-3">
                    <label for="telefonoRegistro" className="form-label fw-bolder">Teléfono</label>
                    <input type="tel" className="form-control bg-input" id="telefonoRegistro" placeholder="Ingresa tu teléfono"
                    maxlength="10" pattern="\d{10}" name="Teléfono" required />
                    <div id="telefonoErrorRegistro"></div>
                </div>
                <div className="mb-3">
                    <label for="fechaNacimientoRegistro" className="form-label fw-bolder">Fecha de Nacimiento</label>
                    <input type="date" className="form-control bg-input" id="fechaNacimientoRegistro"
                    placeholder="Ingrese su Fecha de Nacimiento" min="1900-01-01" name="Fecha de nacimiento" required />
                    <div id="fechaNacimientoErrorRegistro"></div>
                </div>
                <div className="mb-3">
                    <label for="passwordRegistro" className="form-label fw-bolder">Contraseña</label>
                    <input type="password" className="form-control bg-input" id="passwordRegistro"
                    placeholder="Ingrese su contraseña" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Debe contener al menos un número , una letra mayúscula una minúscula, y al menos 8 caracteres"
                    maxlength="20" minlength="8" autocomplete="new-password" name="Contraseña" />
                    <div id="passwordErrorRegistro"></div>
                </div>
                <div className="mb-3">
                    <label for="passwordRegistroRepetir" className="form-label fw-bolder">Repetir contraseña</label>
                    <input type="password" className="form-control bg-input" id="passwordRegistroRepetir"
                    placeholder="Repita su contraseña" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    title="Debe contener al menos un número , una letra mayúscula una minúscula, y al menos 8 caracteres"
                    maxlength="20" minlength="8" name="Contraseña repetir" autocomplete="new-password" required />
                    <div id="passwordRepetirErrorRegistro"></div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button type="submit" id="botonRegistrarse" className="btn btn-personalized-1 mx-1 fw-bold"
                    aria-label="Registrarse">
                    Registrarse
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
}

export default Registro;