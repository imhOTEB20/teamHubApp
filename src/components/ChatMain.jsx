import PropTypes from 'prop-types';

import '../styles/Chat.css';
import ChatEscribirMensaje from "./ChatEscribirMensaje";
import ChatMensaje from "./ChatMensaje";
import ChatTitulo from "./ChatTitulo";
import { useEffect, useState } from 'react';
import Error404Main from './Error404Main';
import Loading from './Loading';
import useMessages from '../hooks/useMessages';
import ChatEstadoMensaje from './ChatEstadoMensaje';

import errorImg from '../assets/img/error.png';
import sinMensajes from  '../assets/img/no-chatear.png'
import loadingImg from '../assets/animations/girar.gif';

const AllMessages = ({ isError, messages }) => {
    localStorage.removeItem('storedUsers');

    if (!isError) {
        if(messages) {
            if (Object.keys(messages).length !== 0)
                return (
                    <section className='chat'>
                        {Object.entries(messages)
                            .map(([clave, valor]) => (
                                <ChatMensaje key={clave} message={valor}/>
                            ))}
                    </section>
                    );
            else {
                return (
                    <section className='chat'>
                        <ChatEstadoMensaje img={sinMensajes} txt='Sin mensajes' detail='Aun no dejaron mensajes en este canal, ¡¡¡se el primero!!!'/>
                    </section>
                );
            }
        } else {
            return (
                <section className='chat'>
                    <ChatEstadoMensaje img={loadingImg} txt='CARGANDO' detail='Se esta caragando la bandeja de mensajes.'/>
                </section>
            );
        }
    } else {
        return (
            <section className='chat'>
                <ChatEstadoMensaje img={errorImg} txt='Se produjo un error' detail='No se pudieron cargar los mensajes del canal, recarga la pagina!!!.'/>
            </section>
        );
    }
};


const ChatMain = ({ channelData }) => {
    const {messagesData, newMessagesData, isLoadMessagesError, isLoadingMessages, loadNewMessages} = useMessages(channelData.id);
    const [messages, setMessages] = useState(null);
    
    useEffect(() => {
        if(messagesData && !isLoadMessagesError && !isLoadingMessages) {
            const prevList = { ...(messages || {}), ...messagesData};
            setMessages(prevList);
        }
    }, [messagesData, isLoadMessagesError, isLoadingMessages]);

    useEffect(() => {
        if(newMessagesData && !isLoadMessagesError && !isLoadingMessages) {
            const prevList = { ...(messages || {}), ...newMessagesData};
            setMessages(prevList);
        }
    }, [newMessagesData, isLoadMessagesError, isLoadingMessages]);

    return (
        <main>
            <ChatTitulo channelName={channelData ? channelData.name : "CARGANDO"}></ChatTitulo>
            <AllMessages isError={isLoadMessagesError} messages={messages}/>
            <ChatEscribirMensaje channelData={channelData} loadNewMessages={loadNewMessages}/>
        </main>
    );
}

ChatMain.propTypes = {
    channelData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.oneOf([null]),
        ]),
        server: PropTypes.number.isRequired,
        creator: PropTypes.number.isRequired,
    })
};

AllMessages.propTypes = {
    isError: PropTypes.bool.isRequired,
    messagesData: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                created_at: PropTypes.string.isRequired,
                updated_at: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                author: PropTypes.number.isRequired,
                channel: PropTypes.number.isRequired,
            }),
        ),
        PropTypes.oneOf([null])]
    ),
}

export default ChatMain;
