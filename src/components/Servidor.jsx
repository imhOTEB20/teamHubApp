import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import ModalEditarServidor from './ModalEditarServidor';
import useFetch from '../hooks/useFetch';

import noPicture from '../assets/img/no_picture.png';

const EnterServerButton = ({serverData}) => {
    const { profileData } = useAuth();
    const [triggerJoinServer, setTriggerJoinServer] = useState(false);
    const { data, isError, isLoading } = useFetch(
        import.meta.env.VITE_MEMBERS_API_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({server: serverData.id})
        },
        triggerJoinServer
    );
    const navigate = useNavigate(); 

    const handleEnterButton = () => {
        navigate(`/servidores/${serverData.id}`);
    };

    const hadleJoinButton = () => {
        Swal.fire({
            title: `¿Unirse?`,
            text: `Quieres unirte al servidor ${serverData.name}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "SI, unirse"
        }).then((result) => {
            if (result.isConfirmed) {
                setTriggerJoinServer(true);
            }
        });
    };

    useEffect(() => {
        if(data && !isError && !isLoading) {
            const storedServers = JSON.parse(localStorage.getItem('myServers'));
            serverData.members.push(profileData.user__id);
            storedServers[data.server] = serverData;
            localStorage.setItem('myServers', JSON.stringify(storedServers));
            Swal.fire({
                title: "¡Te uniste!",
                text: `Eres miembro de ${serverData.name}`,
                icon: "success"
            });
            navigate(`/servidores/${serverData.id}`);
        }
    },[data, isError, isLoading]);

    if(serverData.members.includes(profileData.user__id)) {
        return (
            <button
                className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                onClick={handleEnterButton}
            >   Ingresar
                <i className="fa-solid fa-comments"></i>
            </button>
        );
    } else {
        return (
            <button
                className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                onClick={hadleJoinButton}
            >   Unirse
                <i className="fa-solid fa-comments"></i>
            </button>
        );
    }

};

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
            const storedServers = JSON.parse(localStorage.getItem('myServers'));
            delete storedServers[idServidor];
            localStorage.setItem('myServers', JSON.stringify(storedServers));
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
    
    if (owner === userID) {
        return (
            <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarServidor}><i className="fa-solid fa-trash"></i> Eliminar</button>
        );
    } else return null;
}

const ExitServerButton = ( { serverData, onExit } ) => {
    const { profileData } = useAuth();
    const idServidor = serverData.id;
    
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
    const { isError: isErrorDelete, isLoading: isLoadingDelete } = useFetch(
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
            if(data.count !== 0){
                setIdMember(data.results[0].id);
            }
        }
    },[data]);

    useEffect(() => {
        if (!isErrorDelete && !isLoadingDelete) {
            onExit(idServidor);
            const storedServers = JSON.parse(localStorage.getItem('myServers'));
            delete storedServers[idServidor];
            localStorage.setItem('myServers', JSON.stringify(storedServers));
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

    if (serverData.members.includes(userID) && serverData.owner !== userID) {
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

const Servidor = ({ serverData, onDelete, onExit, onEdit }) => {
    
    const icon = serverData.icon || noPicture;
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
                <DeleteServerButton idServidor={serverData.id} owner={serverData.owner} onDelete={onDelete}/>
            </div>
            <div className="botones-servidor">
                <EnterServerButton serverData={serverData}/>
                <EditServerButton serverData={serverData} onEdit={onEdit}/>
                <ExitServerButton serverData={serverData} onExit={onExit}/>
            </div>
        </article>
    );
}

DeleteServerButton.propTypes = {
    idServidor: PropTypes.number.isRequired,
    owner: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

ExitServerButton.propTypes = {
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
    onExit: PropTypes.func.isRequired,
};

EditServerButton.propTypes = {
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
    onEdit: PropTypes.func.isRequired,
};

Servidor.propTypes = {
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
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,};
export default Servidor;