import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import useFetch from '../hooks/useFetch';

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

const ModalCrearServidor = ({ agregarServidor }) => {
    const [nombreServidor, setNombreServidor] = useState("");
    const [descripcionServidor, setDescripcionServidor] = useState("");
    const [icon, setIcon] = useState(null);
    const [botonDesactivado, setBotonDesactivado] = useState(true);
    const [serverCreated, setServerCreated] = useState({id:null});
    const [joinServer, setJoinServer] = useState(false);
    const { data: memberData, isError, isLoading } = useFetch(
        import.meta.env.VITE_MEMBERS_API_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ server: serverCreated.id }),
        },
        joinServer,
    );

    useEffect(() => {
        if (memberData && !isError && !isLoading) {
            agregarServidor(serverCreated);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Servidor creado",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (isError && !isLoading) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Se creo el servidor, pero no pudiste unirte al mismo."
            });
        }
    },[memberData, isError]);

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
            setServerCreated(data);
            setJoinServer(true);
        })
        .catch((e) => {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al crear el servidor"
            });
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
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control bg-input" value={descripcionServidor} onChange={manejadorCambioDescripcionServidor} placeholder="Ingrese descripción" id="descripcion" style={{ height: '100px' }}></textarea>
                                    <label htmlFor="descripcion">Descripción</label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button disabled={botonDesactivado} type="submit" data-bs-dismiss="modal" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Agregar">Agregar</button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Cancelar">Cancelar</button>
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

ModalCrearServidor.propTypes = {
    agregarServidor: PropTypes.func.isRequired
}

export default ModalCrearServidor;
