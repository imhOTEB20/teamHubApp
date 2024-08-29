import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Chat.css';

import unknownUserImg from '../assets/img/usuario.png';
import useAuth from '../hooks/useAuth';

const ButtonRemoveMessage = ( { authorData } ) => {
    const { profileData } = useAuth();
    
    if (authorData !== null) {
        return (
            <>
            {profileData.user__id === authorData.user__id ? (<button type="button" className="btn-mensaje btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
            ><i className="fa-solid fa-trash-can"></i></button>) : null}
            </>
        );
    }
}

const ChatMensaje = ({ message }) => {

    const [trigger, setTrigger] = useState(false);
    const [authorData, setAuthorData] = useState(null);
    const { data, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_BASE_USER_API_URL}${message.author}/`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        },
        trigger
    );
    
    useEffect(() => {
        const storedUsers = localStorage.getItem('storedUsers');
        const loadedUsers = storedUsers ? { ...JSON.parse(storedUsers) } : {};
        
        if (loadedUsers[message.author]) {
            setAuthorData(loadedUsers[message.author]);
        } else {
            setTrigger(true);
        }
    }, [message]);

    useEffect(() => {
        if (data && !isError && !isLoading) {
            const storedUsers = localStorage.getItem('storedUsers');
            const loadedUsers = storedUsers ? { ...JSON.parse(storedUsers) } : {};
            loadedUsers[data.user__id] = data;
            localStorage.setItem('storedUsers', JSON.stringify(loadedUsers));
            setAuthorData(data);
        }
    }, [data, isError, isLoading]);

    return (
        <article className="mensaje">
            <div className="mensaje-header">
                <div className="usuario-mensaje">
                    {/* <img src={userData.image || unknownUserImg} alt="usuario"/> */}
                    <h3>{authorData ? `${authorData.first_name} ${authorData.last_name}` : 'Cargando...'}</h3>
                </div>
                <div className="btns-mensaje">
                    {/* <button type="button" className="btn-mensaje btn btn-personalized-1 fw-bold my-1 mx-0 mx-sm-1 my-md-0"
                    id="boton-editar-canal"
                    data-bs-toggle="modal"
                    data-bs-target={`#editarMesajeModal${idMensaje}`}><i className="fa-solid fa-pen-to-square"></i></button>
                    <ChatModalEditarMensaje idMensaje={idMensaje}/> */}
                    <ButtonRemoveMessage authorData={authorData}/>
                </div>
            </div>
            <p>
                {message.content}
            </p>
        </article>
    );
}

export default ChatMensaje;
