import PropTypes from 'prop-types';

import '../styles/Chat.css';
import ChatEscribirMensaje from "./ChatEscribirMensaje";
import ChatMensaje from "./ChatMensaje";
import ChatTitulo from "./ChatTitulo";
import { useEffect } from 'react';
import Error404Main from './Error404Main';
import Loading from './Loading';
import useMessages from '../hooks/useMessages';

const AllMessages = ({ isError, messagesData }) => {
    localStorage.removeItem('storedUsers');
    if(!isError) {
        if(messagesData) {
            return (
                <section className="chat">
                    {
                        messagesData.slice().reverse().map(message => (
                            <ChatMensaje key={message.id} messageData={message}/>
                        ))
                    }
                </section>
            );
        } else
            return (
                <Loading title='Cargando mensajes'></Loading>
            );
    } else 
        return (
            <Error404Main title='Error al cargar los mensajes'></Error404Main>
        );
};


const ChatMain = ({ channelData }) => {
    const {messagesData, isLoadMessagesError, isLoadingMessages, loadNewMessages, loadOldMessages} = useMessages(channelData.id);
    
    
    useEffect(() => {
        if(messagesData && !isLoadMessagesError && !isLoadingMessages) {
            console.log(messagesData)
        }
    }, [messagesData, isLoadMessagesError, isLoadingMessages]);
    return (
        <main>
            <ChatTitulo channelName={channelData ? channelData.name : "CARGANDO"}></ChatTitulo>
            <AllMessages isError={isLoadMessagesError} messagesData={messagesData}/>
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
