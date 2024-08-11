import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import ModalEditarServidor from './ModalEditarServidor';
import useFetch from '../hooks/useFetch';

const DeleteServerButton = ({ idServidor, owner, onDelete }) => {
    const { userID } = useAuth();
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
    
    if (owner === userID) {
        return (
            <button className="btn-servidor btn btn-personalized-3 fw-bold" onClick={alertEliminarServidor}><i className="fa-solid fa-trash"></i> Eliminar</button>
        );
    }
} 
const Servidor = ({idServidor, dataServer, onDelete}) => {
    const { userID } = useAuth();
    const icon = dataServer.icon;
    const serverName = dataServer.name;
    const members = dataServer.members.length + (userID === dataServer.owner ? 1 : 0);

    //falta implementar la cantidad de canales en el servidor

    

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
                Swal.fire({
                    icon: "success",
                    title: "¡Éxito!",
                    text: "Abandonaste el servidor correctamente",
                    showConfirmButton: false,
                    background: "#eaeef4",
                    timer: 1500
                });
            }
        });
    }

    return(
        <article className="card-servidor" data-aos="fade-up">
            <img src={icon} alt="logo-server"/>
            <div className="descripcion-servidor">
                <h2>{serverName}</h2>
                <p> {members} <a href="/miembros">mostrar <i className="fa-solid fa-eye"></i></a></p>
                <p>falta implementar <a href="/canales">mostrar <i className="fa-solid fa-comments"></i></a></p>
                <DeleteServerButton idServidor={idServidor} owner={dataServer.owner} onDelete={onDelete}/>
            </div>
            <div className="botones-servidor">
                <a className="btn-servidor btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0" href="chat.html">Ingresar <i className="fa-solid fa-comments"></i></a>
                <button type="button" className="btn-servidor btn btn-personalized-2 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    id="boton-editar-servidor"
                    data-bs-toggle="modal"
                    data-bs-target={`#editarServidorModal${idServidor}`}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                <ModalEditarServidor idModal={idServidor} />
                <button className='btn-servidor btn btn-personalized-3 fw-bold my-1 mx-0 mx-sm-1 my-md-0' onClick={salirDelServidor}><i className="fa-solid fa-right-from-bracket"></i> Salir</button>
            </div>
            <div className="me-encanta-lokita">
                <label className="label-me-encanta"><i className="fa-regular fa-heart"></i></label>
            </div>
        </article>
    );
}

export default Servidor;