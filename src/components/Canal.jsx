import Swal from 'sweetalert2';
import radioGarka from '../assets/img/cdt.jpg'
import ModalEditarCanal from "./ModalEditarCanal";
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DeleteChannelButton = ({ serverOwner, channelData, onDelete }) => {
    const { profileData } = useAuth();
    const [ deleteChannel, setDeleteChannel ] = useState(false);
    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_CHANNELS_API_URL}${channelData.id}/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        deleteChannel
    );

    useEffect(() => {
        if(!isError && !isLoading) {
            onDelete();
            Swal.fire({
                icon: "success",
                title: "¡Éxito!",
                text: "Se elimino el canal",
                showConfirmButton: false,
                background: "#eaeef4",
                timer: 1500
            });
        } else if (isError && !isLoading) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Se produjo un error al intentar eliminar el canal!",
            });
        }
    }, [isError, isLoading]);

    const handleDeletation = () => {
        Swal.fire({
            title: "Salir del canal",
            text: "¿Estás seguro de salir canal?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, salir",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                setDeleteChannel(true);
            }
        });
    }

    if (profileData.user__id === channelData.creator || profileData.user__id === serverOwner) {
        return (
            <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={handleDeletation}><i className="fa-solid fa-trash"></i> Eliminar</button>
        );
    }
    else return null;
};

const EditChannelButton = ({ serverOwner, channelData, onEdit }) => {
    const { profileData } = useAuth();

    

    if (profileData.user__id === channelData.creator || profileData.user__id === serverOwner) {
        return (
            <>
            <button type="button" className="btn-canal btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
              id="boton-editar-canal"
              data-bs-toggle="modal"
              data-bs-target={`#editarCanalModal${channelData.id}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
            <ModalEditarCanal channelData={channelData} onEdit={onEdit}/>
            </>
        );
    } else return null;
};

const EnterChannelButton = ({ channelID }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/canales/${channelID}/`)
    }
    return (
        <a className="btn-canal btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" onClick={handleClick}>Ir al canal <i className="fa-solid fa-comments"></i></a>
    );
}

const Canal = ({ serverOwner, channelData, onDelete, onEdit }) =>{
    const alertEliminarCanal = () =>{
        Swal.fire({
            title: "Eliminar Canal",
            text: "¿Estás seguro de eliminar canal?",
            icon: "warning",
            showCancelButton: true,
            background: "#eaeef4",
            confirmButtonColor: "#144d4d",
            confirmButtonText: "Si, eliminar",
            cancelButtonColor: "#A60505",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "Canal eliminado correctamente",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    return(
      <article className="card-canal" data-aos="fade-up">
        <div className="descripcion-canal">
            <h2>{channelData.name}</h2>
            <p>{channelData.description}</p>
            <DeleteChannelButton serverOwner={serverOwner} channelData={channelData} onDelete={onDelete}/>
        </div>
        <div className="botones-canales">
          <EditChannelButton serverOwner={serverOwner} channelData={channelData} onEdit={onEdit}/>
          <EnterChannelButton channelID={channelData.id}/>
        </div>
      </article>
    );
}

export default Canal;