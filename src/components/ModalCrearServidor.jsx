import { useState } from 'react';
import PropTypes from 'prop-types';

const NombreServidor = ( {variable, manejadorCambio }) => {
    return (
        <>
        <label htmlFor="nombreServidor" className="form-label fw-bolder">Nombre</label>
        <input type="text"
        className="form-control bg-input"
        id="nombreServidor"
        value={variable}
        onChange={manejadorCambio}
        placeholder="Ingrese nombre"
        minLength="4"
        maxLength="25"
        name="Nombre"
        required />
        </>
    );
}

const ModalCrearServidor = () => {
    const [varibleInput, setVariableInput] = useState("");
    const [botonDesactivado, setBotonDesactivado] = useState(true);

    const validarNombreServidor = (valor) => {
        const exp_reg = /^[a-zA-Z\d]{4,}$/;

        if (exp_reg.test(valor)) {
            setBotonDesactivado(false);
        } else {
            setBotonDesactivado(true);
        }
    };
    const manejarCambioInput = (e) => {
        const valor = e.target.value;
        setVariableInput(valor);
        validarNombreServidor(valor);
    };

    return (
        <section className="modal fade" id="agregarServidorModal" tabIndex="-1" aria-labelledby="agregarServidorModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id="agregarServidorModal">Agregar Servidor</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="fotoServidor" className="form-label fw-bolder">Subir foto</label>
                                <input className="form-control bg-input" type="file" id="fotoServidor" />
                            </div>
                            <div className="mb-3">
                                <NombreServidor variable={varibleInput} manejadorCambio={validarNombreServidor}/>
                                <div id="nombreErrorServidor"></div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control bg-input" placeholder="Ingrese descripción" id="descripcion" style={{ height: '100px' }}></textarea>
                                    <label htmlFor="descripcion">Descripción</label>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bolder w-100">Chat general</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="chatRadioOptions" id="chatRadio1" value="adm" />
                                    <label className="form-check-label" htmlFor="chatRadio1"><i className="fa-solid fa-users-rectangle"></i> Adm.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="chatRadioOptions" id="chatRadio2" value="adm-y-moderadores" />
                                    <label className="form-check-label" htmlFor="chatRadio2"><i className="fa-solid fa-users-viewfinder"></i> Adm. y Moderadores</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="chatRadioOptions" id="chatRadio3" value="todos" />
                                    <label className="form-check-label" htmlFor="chatRadio3"><i className="fa-solid fa-users"></i> Todos</label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button disabled={botonDesactivado} type="submit" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Agregar">Agregar</button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" aria-label="Cancelar">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

NombreServidor.protoTypes = {
    variable: PropTypes.string.isRequired,
    manejadorCambio: PropTypes.func.isRequired
}
export default ModalCrearServidor;
