import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const NombreCanal = ({ variable, manejadorCambio }) => {
    return (
        <>
            <label htmlFor="nombreCanal" className="form-label fw-bolder">Nombre</label>
            <input type="text"
                className="form-control bg-input"
                id="nombreCanal"
                value={variable}
                onChange={manejadorCambio}
                placeholder="Ingrese nombre"
                minLength="4"
                maxLength="100"
                name="Nombre"
                required />
        </>
    );
};

const DescripcionCanal = ({ variable, manejadorCambio }) => {
    return (
        <div className="form-floating">
        <textarea
            value={variable}
            onChange={manejadorCambio}
            className="form-control bg-input"
            placeholder="Ingrese descripción"
            id="descripcion"
            style={{ height: '100px' }}>
        </textarea>
        <label
            htmlFor="descripcion">
            Descripción
        </label>
        </div>
    );
};

const ModalCrearCanal = ({ addChannel, serverID }) => {
    const [nombreCanal, setNombreCanal] = useState("");
    const [descripcionCanal, setDescripcionCanal] = useState("");
    const [botonDesactivado, setBotonDesactivado] = useState(true);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const body = JSON.stringify ({
            server: serverID,
            name: nombreCanal,
            description: descripcionCanal
        });
        
        fetch(import.meta.env.VITE_CHANNELS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: body,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error("Error al intentar crear el canal.");
        })
        .then((data) => {
            addChannel();
        })
        .catch((e) => {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al crear el canal"
            });
        });
    };

    const validarNombreCanal = (valor) => {
        const exp_reg = /^[a-zA-Z0-9 ]{4,}$/;

        if (exp_reg.test(valor)) {
            setBotonDesactivado(false);
        } else {
            setBotonDesactivado(true);
        }
    };

    const manejarCambioNombreCanal = (e) => {
        const valor = e.target.value;
        setNombreCanal(valor);
        validarNombreCanal(valor);
    };

    const manejadorCambioDescripcionCanal = (e) => {
        const text = e.target.value;
        setDescripcionCanal(text);
    }

    const resetValues = () => {
        setNombreCanal("");
        setDescripcionCanal("");
        setBotonDesactivado(true);
    }
    
    return (
        <section className="modal fade" id="agregarCanalModal" tabIndex="-1" aria-labelledby="agregarCanalModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-color-principal">
                            <h5 className="modal-title text-white" id="agregarCanalModal">Agregar Canal</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={resetValues}></button>
                        </div>
                        <div className="modal-body bg-color-fondo">
                            <form onSubmit={manejarSubmit}>
                                <div className="mb-3">
                                    <NombreCanal variable={nombreCanal} manejadorCambio={manejarCambioNombreCanal} />
                                </div>
                                <div className="mb-3">
                                    <DescripcionCanal variable={descripcionCanal} manejadorCambio={manejadorCambioDescripcionCanal} />
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <button disabled={botonDesactivado} type="submit" className="btn btn-personalized-1 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Agregar">Agregar</button>
                                    <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Cancelar" onClick={resetValues}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </section>
    )
};

NombreCanal.propTypes = {
    variable: PropTypes.string.isRequired,
    manejadorCambio: PropTypes.func.isRequired
};

DescripcionCanal.propTypes = {
    variable: PropTypes.string.isRequired,
    manejadorCambio: PropTypes.func.isRequired
};

ModalCrearCanal.propTypes = {
    addChannel: PropTypes.func.isRequired,
    serverID: PropTypes.number.isRequired,
};

export default ModalCrearCanal
