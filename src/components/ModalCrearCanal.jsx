import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import useFetch from '../hooks/useFetch';

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
}

const ModalCrearCanal = () => {
    const [nombreCanal, setNombreCanal] = useState("");
    const [descripcionCanal, setDescripcionCanal] = useState("");
    const [icon, setIcon] = useState(null);
    const [botonDesactivado, setBotonDesactivado] = useState(true);
    const [channelCreated, setChannelCreated] = useState({id:null});
    const [joinServer, setJoinServer] = useState(false);
    const { data: memberData, isError, isLoading } = useFetch(
        import.meta.env.VITE_MEMBERS_API_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ server: channelCreated.id }),
        },
        joinServer,
    );

    useEffect(() => {
        if (memberData && !isError && !isLoading) {
            agregarServidor(channelCreated);
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
        newFormData.append('name', nombreCanal);
        newFormData.append('description', descripcionCanal);
        
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
            setChannelCreated(data);
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

    const manejarCambioImagen = (e) => {
        const file = e.target.files[0] || null;
        setIcon(file);
    };
    
    return (
        <section className="modal fade" id="agregarCanalModal" tabIndex="-1" aria-labelledby="agregarCanalModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-color-principal">
                            <h5 className="modal-title text-white" id="agregarCanalModal">Agregar Canal</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-color-fondo">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="nombreCanal" className="form-label fw-bolder">Nombre</label>
                                    <input type="text" className="form-control bg-input" id="nombreCanal" placeholder="Ingrese nombre"
                                        minLength="3" maxLength="25" name="Nombre" required />
                                    <div id="nombreErrorServidor"></div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <textarea className="form-control bg-input" placeholder="Ingrese descripción" id="descripcion" style={{ height: '100px' }}></textarea>
                                        <label htmlFor="descripcion">Descripción</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <button type="submit" className="btn btn-personalized-1 mx-1 fw-bold" aria-label="Agregar">Agregar</button>
                                    <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" aria-label="Cancelar">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default ModalCrearCanal
