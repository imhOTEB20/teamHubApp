import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import PropTypes from 'prop-types';

const NombreServidor = ({ variable, manejadorCambio }) => {
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
                maxLength="100"
                name="Nombre"
                required />
        </>
    );
}

const ModalCrearServidor = () => {
    const [nombreServidor, setNombreServidor] = useState("");
    const [descripcionServidor, setDescripcionServidor] = useState("");
    const [icon, setIcon] = useState(null);
    const [botonDesactivado, setBotonDesactivado] = useState(true);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const newFormData = new FormData();
        if (icon) newFormData.append('icon', icon);
        newFormData.append('name', nombreServidor);
        newFormData.append('description', descripcionServidor);
        
        fetch(import.meta.env.VITE_SERVER_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: newFormData,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error("Error al intentar crear el servidor.");
        })
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        });
    };


    const validarNombreServidor = (valor) => {
        const exp_reg = /^[a-zA-Z0-9 ]{4,}$/;

        if (exp_reg.test(valor)) {
            setBotonDesactivado(false);
        } else {
            setBotonDesactivado(true);
        }
    };

    const manejarCambioNombreServidor = (e) => {
        const valor = e.target.value;
        setNombreServidor(valor);
        validarNombreServidor(valor);
    };

    const manejadorCambioDescripcionServidor = (e) => {
        const text = e.target.value;
        setDescripcionServidor(text);
    }

    const manejarCambioImagen = (e) => {
        const file = e.target.files[0] || null;
        setIcon(file);
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
                        <form onSubmit={manejarSubmit}>
                            <div className="mb-3">
                                <label htmlFor="fotoServidor" className="form-label fw-bolder">Subir foto</label>
                                <input className="form-control bg-input" type="file" id="fotoServidor" onChange={manejarCambioImagen}/>
                            </div>
                            <div className="mb-3">
                                <NombreServidor variable={nombreServidor} manejadorCambio={manejarCambioNombreServidor} />
                                <div id="nombreErrorServidor"></div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control bg-input" value={descripcionServidor} onChange={manejadorCambioDescripcionServidor} placeholder="Ingrese descripción" id="descripcion" style={{ height: '100px' }}></textarea>
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

NombreServidor.propTypes = {
    variable: PropTypes.string.isRequired,
    manejadorCambio: PropTypes.func.isRequired
};

export default ModalCrearServidor;
