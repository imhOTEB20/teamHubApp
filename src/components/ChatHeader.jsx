import React from 'react';
import '../styles/Chat.css';
import ChatOpcionesUsuario from './ChatOpcionesUsuario';
import ChatDatosUsuario from './ChatDatosUsuario';
import ChatBuscador from './ChatBuscador';
import ChatCanalGeneral from './ChatCanalGeneral';
import ChatCanal from './ChatCanal';
import ChatFooter from './ChatFooter';

const ChatHeader = () => {
    return (
        <header className='header-chat'>
            <ChatDatosUsuario/>
            <ChatOpcionesUsuario/>
            <ChatBuscador/>
            <section className="canales-chat">
                <ChatCanalGeneral/>
                <ChatCanal/>
                <ChatCanal/>
                <ChatCanal/>
                <ChatCanal/>
                <ChatCanal/>
                <ChatCanal/>
                <ChatCanal/>
            </section>
            <ChatFooter/>
        </header>
    )
}

export default ChatHeader;

