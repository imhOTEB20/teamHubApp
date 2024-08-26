import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const ModalEditarServidor = ({ serverData, onEdit }) => {
    const [nombreServidor, setNombreServidor] = useState(serverData.name);
    const [descripcionServidor, setDescripcionServidor] = useState(serverData.description);
    const [icon, setIcon] = useState(null);
    const [botonDesactivado, setBotonDesactivado] = useState(true);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const newFormData = new FormData();
        if (icon) newFormData.append('icon', icon);
        newFormData.append('name', nombreServidor);
        if (descripcionServidor != serverData.description) newFormData.append('description', descripcionServidor);
        fetch(`${import.meta.env.VITE_SERVER_API_URL}${serverData.id}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: newFormData,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw Error("Error al intentar editar el servidor.");
        })
        .then((data) => {
            onEdit(data);
            const storedServers = JSON.parse(localStorage.getItem('myServers'));
            storedServers[data.id] = data;
            localStorage.setItem('myServers', JSON.stringify(storedServers));
        })
        .catch((e) => {
            console.log(e);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al editar el servidor"
            });
        });
    };

    useEffect(() => {
        if(icon != null || nombreServidor != serverData.name || descripcionServidor != serverData.description) {
            if(nombreServidor != "") {
                setBotonDesactivado(false);
            } else {
                setBotonDesactivado(true);
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "el nombre del servidor no puede estar vacio",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        }
    }, [nombreServidor, descripcionServidor, icon]);

    const manejarCambioNombreServidor = (e) => {
        const valor = e.target.value;
        setNombreServidor(valor);
    };

    const manejadorCambioDescripcionServidor = (e) => {
        const text = e.target.value;
        setDescripcionServidor(text);
    }

    const manejarCambioImagen = (e) => {
        const file = e.target.files[0] || null;
        setIcon(file);
    };

    const resetValues = () => {
        setNombreServidor(serverData.name);
        setDescripcionServidor(serverData.description);
        setIcon(null);
        setBotonDesactivado(true);
    }

    return (
        <div className="modal fade" id={`editarServidorModal${serverData.id}`} tabIndex="-1" aria-labelledby={`editarServidorModalLabel${serverData.id}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-color-principal">
                        <h5 className="modal-title text-white" id={`editarServidorModalLabel${serverData.id}`}>Editar Servidor</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={resetValues}></button>
                    </div>
                    <div className="modal-body bg-color-fondo">
                        <form onSubmit={manejarSubmit}>
                            <div className="mb-3">
                                <label htmlFor={`editarFotoServidor${serverData.id}`} className="form-label fw-bolder">Subir foto</label>
                                <input className="form-control bg-input" type="file" id={`editarFotoServidor${serverData.id}`} onChange={manejarCambioImagen} />
                                <div id={`editarFotoErrorServidor${serverData.id}`}></div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`editarNombreServidor${serverData.id}`} className="form-label fw-bolder">Nombre</label>
                                <input type="text" className="form-control bg-input" value={nombreServidor} onChange={manejarCambioNombreServidor} id={`editarNombreServidor${serverData.id}`} placeholder="Ingrese nombre"
                                    minLength="4" maxLength="64" name="Nombre" required />
                                <div id={`editarNombreErrorServidor${serverData.id}`}></div>
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea className="form-control bg-input" placeholder="Ingrese descripción" id={`descripcion${serverData.id}`} style={{ height: '100px' }} value={descripcionServidor} onChange={manejadorCambioDescripcionServidor}></textarea>
                                    <label htmlFor={`descripcion${serverData.id}`} >Descripción</label>
                                </div>
                                <div id={`editarDescripcionErrorServidor${serverData.id}`}></div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button disabled={botonDesactivado} type="submit" className="btn btn-personalized-1 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Agregar">Guardar cambios</button>
                                <button type="reset" className="btn btn-personalized-3 mx-1 fw-bold" data-bs-dismiss="modal" aria-label="Close" onClick={resetValues}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

ModalEditarServidor.propTypes = {
    serverData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null])
        ]),
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null])
        ]),
        owner: PropTypes.number.isRequired,
        members: PropTypes.array.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired
};

export default ModalEditarServidor;