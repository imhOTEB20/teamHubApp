import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/Chat.css';

const ChatEscribirMensaje = ( {channelData, loadNewMessages} ) => {
    const [content, setContent] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(import.meta.env.VITE_MESSAGES_API_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ channel: channelData.id, content: content})
            }
        )
        .then((response) => {
            if (!response.ok) {
                throw new Error ("Error al crear el mensaje.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            loadNewMessages();
            setContent('');
        })
        .catch((e) => {
            console.log(e);
        })
    };

    const handleChangeContent = (e) => {
        const text = e.target.value;
        setContent(text);
    };

    return (
        <section className="contenedor-chat">
            <form onSubmit={handleSubmit}>
                <i className="fa-solid fa-keyboard"></i>
                <input value={content} onChange={handleChangeContent} className="escribir-mensaje" type="text"/>
                <button className="btn-enviar" type="submit">Enviar</button>
            </form>
        </section>
    );
}

export default ChatEscribirMensaje;
