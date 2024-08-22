import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

import useFetch from "../hooks/useFetch";

const ModalEditarCanal = ({ channelData, onEdit}) => {
    const [channelName, setChannelName] = useState(channelData.name);
    const [channelDescription, setChannelDescription] = useState(channelData.description);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [editChannel, setEditChannel] = useState(false);
    const options = useRef({});
    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_CHANNELS_API_URL}${channelData.id}/`,
        options.current,
        editChannel
    );

    useEffect(() => {
        if (data && !isError && !isLoading) {
            onEdit(data);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Se edito el canal",
                showConfirmButton: false,
                background: "#eaeef4",
                timer: 1500
            });
        } else if (isError && !isLoading) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al intentar editar el canal"
            });
        }
    },[data, isError, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = channelDescription !== channelData.description ? channelDescription : null;
        const body = description ? {name: channelName, description:description} : {name: channelName};
        options.current = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        }
        setEditChannel(true);
    };

    useEffect(() => {
        if(channelDescription != channelData.description) {
            if(channelName != "") {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "el nombre del canal no puede estar vacio",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    }, [channelDescription]);

    const handleNameChange = (e) => {
        const valor = e.target.value;
        setChannelName(valor);
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        setChannelDescription(text);
    }

    const resetValues = () => {
        setChannelName(channelData.name);
        setChannelDescription(channelData.description);
        setButtonDisabled(true);
    }

    return (
        <div className="modal fade" id={`editarCanalModal${channelData.id}`} tabIndex="-1" aria-labelledby={`editarCanalModalLabel${channelData.id}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id={`editarCanalModalLabel${channelData.id}`}>Editar Canal</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor={`editarNombreCanal${channelData.id}`} className="form-label fw-bolder">Nombre</label>
                                <input value={channelName} onChange={handleNameChange} type="text" className="form-control bg-input" id={`editarNombreCanal${channelData.id}`} placeholder="Ingrese nombre"
                                    minLength="3" maxLength="25" name="Nombre" required />
                                <div id={`editarNombreErrorCanal${channelData.id}`}></div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea value={channelDescription} onChange={handleDescriptionChange} className="form-control bg-input" placeholder="Ingrese descripción" id={`descripcion${channelData.id}`} style={{ height: '100px' }}></textarea>
                                    <label htmlFor={`descripcion${channelData.id}`}>Descripción</label>
                                </div>
                                <div id={`editarDescripcionErrorCanal${channelData.id}`}></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button disabled={buttonDisabled} type="submit" className="btn btn-personalized-1 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Agregar">Guardar cambios</button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Close" onClick={resetValues}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalEditarCanal.propTypes = {
    channelData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        server: PropTypes.number.isRequired,
        creator: PropTypes.number.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default ModalEditarCanal
