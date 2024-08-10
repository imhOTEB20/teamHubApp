const ModalEditarPerfil = () =>{
    return(
        <section className="modal fade" id="editarPerfilModal" tabIndex="-1" aria-labelledby="editarPerfilModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id="editarPerfilModal">
                            Editar Perfil
                        </h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form id="form-editar-perfil">
                            <div className="mb-3">
                                <label htmlFor="editarEmailRegistro" className="form-label fw-bolder">Email</label>
                                <input type="email" className="form-control bg-input" id="editarEmailRegistro" aria-describedby="emailHelp"
                                    placeholder="Ingrese su email" minLength="8" maxLength="20" name="Email" autoComplete="username"
                                    required />
                                <div id="editarEmailErrorRegistro"></div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editarNombreRegistro" className="form-label fw-bolder">Nombre</label>
                                <input type="text" className="form-control bg-input" id="editarNombreRegistro" placeholder="Ingrese su nombre"
                                    minLength="3" maxLength="25" name="Nombre" required />
                                <div id="editarNombreErrorRegistro"></div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editarApellidoRegistro" className="form-label fw-bolder">Apellido</label>
                                <input type="text" className="form-control bg-input" id="editarApellidoRegistro" placeholder="Ingrese su apellido"
                                    minLength="3" maxLength="25" name="Apellido" required />
                                <div id="editarApellidoErrorRegistro"></div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editarTelefonoRegistro" className="form-label fw-bolder">Teléfono</label>
                                <input type="tel" className="form-control bg-input" id="editarTelefonoRegistro" placeholder="Ingresa tu teléfono"
                                    maxLength="10" pattern="\d{10}" name="Teléfono" required />
                                <div id="editarTelefonoErrorRegistro"></div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editarFechaNacimientoRegistro" className="form-label fw-bolder">Fecha de Nacimiento</label>
                                <input type="date" className="form-control bg-input" id="editarFechaNacimientoRegistro"
                                    placeholder="Ingrese su Fecha de Nacimiento" min="1900-01-01" name="Fecha de nacimiento" required />
                                <div id="editarFechaNacimientoErrorRegistro"></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" id="botonEditar" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Registrarse">
                                    Guardar cambios
                                </button>
                                <button type="button" className="btn btn-personalized-3 mx-1 fw-bold"
                                data-bs-dismiss="modal" aria-label="Close">
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

export default  ModalEditarPerfil;