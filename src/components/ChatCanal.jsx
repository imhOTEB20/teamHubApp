import '../styles/Chat.css';
import radioGarka from '../assets/img/cdt.jpg'

const ChatCanal = () => {
    return (
        <article className="canal-chat">
            <img className="icono" src={radioGarka} alt=""/><p className="texto">Tremendo CDT</p><span className="notificacion">4</span>
        </article>
    );
}

export default ChatCanal;
