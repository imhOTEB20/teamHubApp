import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import useAuth from '../hooks/useAuth';
import ModalEditarServidor from './ModalEditarServidor';
import useFetch from '../hooks/useFetch';

const DeleteServerButton = ({ idServidor, owner, onDelete }) => {
    const { profileData } = useAuth();
    
    const userID = profileData.user__id;
    const [deletedServer, setDeletedServer] = useState(false);

    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_SERVER_API_URL}${idServidor}/`,
        {
            method: 'DELETE',
            headers: {
                accept: "application/json",
                Authorization: `Token ${localStorage.getItem('token')}`
            },
        },
        deletedServer,
    );

    const alertEliminarServidor = () =>{
        Swal.fire({
            title: "Eliminar Servidor",
            text: "¿Estás seguro de eliminar servidor?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, eliminar",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            setDeletedServer(true);
        });
    };

    useEffect(() => {
        if(!isError && !isLoading) {
            console.log("nunca pase");
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: `Servidor eliminado correctamente`,
                showConfirmButton: false,
                background: "#eaeef4",
                timer: 1500
            });
            onDelete(idServidor);
        } else if (isError && !isLoading) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al intentar eliminar el servidor!",
              });
        }
    }, [data, isError, isLoading]);
    
    console.log(`owner:${owner} - userID:${userID}`);
    if (owner === userID) {
        return (
            <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarServidor}><i className="fa-solid fa-trash"></i> Eliminar</button>
        );
    } else return null;
}

const ExitServerButton = ( { idServidor, owner, onExit } ) => {
    const { profileData } = useAuth();
    
    const userID = profileData.user__id;
    const [exitServer, setExitServer] = useState(false);
    const [idMember, setIdMember] = useState(null);
    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_MEMBERS_API_URL}?user=${userID}&server=${idServidor}`,
        {
            method: "GET",
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
    );
    const {data: responseDelete, isError: isErrorDelete, isLoading: isLoadingDelete } = useFetch(
        `${import.meta.env.VITE_MEMBERS_API_URL}${idMember}/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        exitServer,
    );

    useEffect(() => {
        if(data && !isError && !isLoading) {
            console.log(data.results[0]);
            setIdMember(data.results[0].id);
        }
    },[data]);

    useEffect(() => {
        if (!isErrorDelete && !isLoadingDelete) {
            onExit(idServidor);
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Abandonaste el servidor correctamente",
                showConfirmButton: false,
                background: "#eaeef4",
                timer: 1500
            });
        }
        else if (isErrorDelete && !isLoadingDelete) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al intentar abandonar el servidor!",
            });
        }
    },[isErrorDelete, isLoadingDelete]);

    const salirDelServidor = () =>{
        Swal.fire({
            title: "Salir Servidor",
            text: "¿Estás seguro de salir servidor?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, salir",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                setExitServer(true);
            }
        });
    };

    if (owner !== userID) {
        return (
            <button className='btn-servidor btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0' onClick={salirDelServidor}><i className="fa-solid fa-right-from-bracket"></i> Salir</button>
        );
    } else return null;
}
const EditServerButton = ({ serverData, onEdit }) => {
    const { profileData } = useAuth();

    if (serverData.owner === profileData.user__id) {
        return (
            <>
            <button
                type="button"
                className="btn-servidor btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                id="boton-editar-servidor"
                data-bs-toggle="modal"
                data-bs-target={`#editarServidorModal${serverData.id}`}>
                    <i className="fa-solid fa-pen-to-square">
                    </i> 
                Editar
            </button>
            <ModalEditarServidor serverData={serverData} onEdit={onEdit}/>
            </>
        );
    } else return null;
}

const Servidor = ({ idServidor, serverData, onDelete, onEdit }) => {
    
    const icon = serverData.icon;
    const serverName = serverData.name;
    const members = serverData.members.length===0 ? serverData.members.length : 1;

    //falta implementar la cantidad de canales en el servidor

    return(
        <article className="card-servidor" data-aos="fade-up">
            <img src={icon} alt="logo-server"/>
            <div className="descripcion-servidor">
                <h2>{serverName}</h2>
                <p> {members} <a href="/miembros">mostrar <i className="fa-solid fa-eye"></i></a></p>
                <p>falta implementar </p>
                <DeleteServerButton idServidor={idServidor} owner={serverData.owner} onDelete={onDelete}/>
            </div>
            <div className="botones-servidor">
                <a className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ingresar <i className="fa-solid fa-comments"></i></a>
                <EditServerButton serverData={serverData} onEdit={onEdit}/>
                <ExitServerButton idServidor={idServidor} owner={serverData.owner} onExit={onDelete}/>
            </div>
        </article>
    );
}

DeleteServerButton.propTypes = {
    idServidor: PropTypes.string.isRequired,
    owner: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ExitServerButton.propTypes = {
    idServidor: PropTypes.string.isRequired,
    owner: PropTypes.number.isRequired,
    onExit: PropTypes.func.isRequired,
};

EditServerButton.propTypes = {
    serverData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        owner: PropTypes.number.isRequired,
        members: PropTypes.array.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
};

Servidor.propTypes = {
    idServidor: PropTypes.string.isRequired,
    serverData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        owner: PropTypes.number.isRequired,
        members: PropTypes.array.isRequired
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,};
export default Servidor;